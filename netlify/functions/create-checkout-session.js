// Creates a Stripe Checkout session for the chosen plan and returns its URL
// for the browser to redirect to. Card details never touch our own code —
// Stripe's hosted page handles that, which is what keeps this PCI-simple.
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  annual: process.env.STRIPE_PRICE_ANNUAL,
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { plan, userId, userEmail } = JSON.parse(event.body || '{}');
    const priceId = PRICE_IDS[plan];
    if (!priceId || !userId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid plan/userId' }) };
    }

    const origin = event.headers.origin || `https://${event.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId,
      customer_email: userEmail || undefined,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
      metadata: { userId, plan },
      subscription_data: { metadata: { userId, plan } },
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error('create-checkout-session error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not start checkout' }) };
  }
};
