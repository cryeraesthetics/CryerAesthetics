import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { PLANS } from '../lib/data';
import { useCheckout } from '../context/CheckoutContext';
import { useAuth } from '../context/AuthContext';
import { LockIcon } from '../components/icons';

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedPlan } = useCheckout();
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToCheckout = async () => {
    if (!user) { navigate('/login', { state: { from: '/subscribe' } }); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan, userId: user.id, userEmail: user.email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout could not start');
      window.location.href = data.url;
    } catch (err) {
      setError('Checkout isn\'t available yet — please try again shortly.');
      setLoading(false);
    }
  };

  return (
    <div className="screen-pad">
      <BackLink to="/subscribe" label="Plans" />
      <h2 style={{ fontSize: 20, margin: '6px 0 4px' }}>Secure checkout</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <LockIcon size={13} />
        <span style={{ fontSize: 11.5, color: 'var(--color-accent-2-700)', fontWeight: 600 }}>Handled securely by Stripe • {plan.price}</span>
      </div>

      {!user && <p className="muted" style={{ fontSize: 12, margin: '0 0 12px' }}>You're not signed in — <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login', { state: { from: '/subscribe' } }); }}>sign in first</a> so your membership saves to your account.</p>}

      <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 20px' }}>
        You'll be taken to Stripe's secure payment page to enter your card details. Nothing is charged until you complete that step.
      </p>

      <button className="btn btn-primary btn-block" disabled={loading} onClick={goToCheckout} style={{ width: '100%', opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Redirecting…' : `Continue to payment — ${plan.price}`}
      </button>
      {error && <p style={{ fontSize: 12, color: 'var(--color-accent-700)', textAlign: 'center', margin: '10px 0 0' }}>{error}</p>}
    </div>
  );
}
