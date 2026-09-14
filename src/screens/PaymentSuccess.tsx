import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '../components/icons';

export default function PaymentSuccess() {
  const navigate = useNavigate();
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
