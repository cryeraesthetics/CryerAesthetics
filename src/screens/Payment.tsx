import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { PLANS } from '../lib/data';
import { useCheckout } from '../context/CheckoutContext';
import { useMemberData } from '../context/MemberDataContext';
import { useAuth } from '../context/AuthContext';
import { LockIcon } from '../components/icons';

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedPlan } = useCheckout();
  const { activateSubscription } = useMemberData();
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const filled = !!(cardName && cardNumber && cardExpiry && cardCvc);

  const submit = async () => {
    if (!filled) return;
    if (!user) { navigate('/login', { state: { from: '/payment' } }); return; }
    await activateSubscription(selectedPlan);
    navigate('/payment/success');
  };

  return (
    <div className="screen-pad">
      <BackLink to="/subscribe" label="Plans" />
      <h2 style={{ fontSize: 20, margin: '6px 0 4px' }}>Secure checkout</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <LockIcon size={13} />
        <span style={{ fontSize: 11.5, color: 'var(--color-accent-2-700)', fontWeight: 600 }}>256-bit encrypted • {plan.price}</span>
      </div>

      {!user && <p className="muted" style={{ fontSize: 12, margin: '0 0 12px' }}>You're not signed in — <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login', { state: { from: '/payment' } }); }}>sign in first</a> so your membership saves to your account.</p>}

      <div className="field" style={{ marginBottom: 10 }}><label>Name on card</label><input className="input" type="text" placeholder="Danielle Cryer" value={cardName} onChange={(e) => setCardName(e.target.value)} /></div>
      <div className="field" style={{ marginBottom: 10 }}><label>Card number</label><input className="input" type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div className="field"><label>Expiry</label><input className="input" type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} /></div>
        <div className="field"><label>CVC</label><input className="input" type="text" inputMode="numeric" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} /></div>
      </div>
      <button className="btn btn-primary btn-block" disabled={!filled} onClick={submit} style={{ width: '100%', opacity: filled ? 1 : 0.5 }}>Subscribe — {plan.price}</button>
      <p style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', textAlign: 'center', margin: '10px 0 0' }}>Prototype checkout — no real payment is processed.</p>
    </div>
  );
}
