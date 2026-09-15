import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '../components/icons';
import { useMemberData } from '../context/MemberDataContext';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { isMember, refreshSubscription } = useMemberData();
  const [confirmed, setConfirmed] = useState(isMember);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (confirmed) return;
    if (tries >= 10) return; // stop after ~15s; webhook may just be slow
    const t = setTimeout(async () => {
      const plan = await refreshSubscription();
      if (plan) setConfirmed(true);
      else setTries((n) => n + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [confirmed, tries, refreshSubscription]);

  if (!confirmed) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--color-text)', marginBottom: 6 }}>Confirming your payment…</div>
        <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 18px' }}>
          {tries < 10 ? "This usually takes a few seconds." : "Taking longer than usual — check your email for a Stripe receipt. If you were charged, refresh this page shortly."}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-accent-2-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
        <CheckIcon size={20} />
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--color-text)', marginBottom: 6 }}>You're a Pro member!</div>
      <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 18px' }}>The full skin guide and your skin profile are unlocked.</p>
      <button className="btn btn-primary btn-block" onClick={() => navigate('/')} style={{ width: '100%' }}>Explore the app</button>
    </div>
  );
}
