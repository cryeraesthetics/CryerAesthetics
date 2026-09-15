// Stripe calls this whenever a subscription is created, renewed, changed, or
// canceled. This is the source of truth for membership status — never trust
// the browser's redirect back from checkout alone, since that URL could be
// visited without actually paying.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const PRICE_TO_PLAN = {
  [process.env.STRIPE_PRICE_MONTHLY]: 'monthly',
  [process.env.STRIPE_PRICE_ANNUAL]: 'annual',
};

function planFromSubscription(subscription) {
  const priceId = subscription.items?.data?.[0]?.price?.id;
  return PRICE_TO_PLAN[priceId] || subscription.metadata?.plan || 'monthly';
}

function statusFromStripeStatus(stripeStatus) {
  return stripeStatus === 'active' || stripeStatus === 'trialing' ? 'active' : 'canceled';
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let stripeEvent;
  try {
    const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
    stripeEvent = stripe.webhooks.constructEvent(rawBody, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const userId = session.client_reference_id || session.metadata?.userId;
        const plan = session.metadata?.plan || 'monthly';
        if (userId) {
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            plan,
            status: 'active',
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object;
        await supabase.from('subscriptions').update({
          plan: planFromSubscription(subscription),
          status: statusFromStripeStatus(subscription.status),
          updated_at: new Date().toISOString(),
        }).eq('stripe_subscription_id', subscription.id);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        await supabase.from('subscriptions').update({
          status: 'canceled',
          updated_at: new Date().toISOString(),
        }).eq('stripe_subscription_id', subscription.id);
        break;
      }
      default:
        break;
    }
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error('stripe-webhook handling error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Webhook handler failed' }) };
  }
};
