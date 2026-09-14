import { useNavigate } from 'react-router-dom';
import { useMemberData } from '../context/MemberDataContext';
import { useAuth } from '../context/AuthContext';

export default function More() {
  const navigate = useNavigate();
  const { isMember, isPro } = useMemberData();
  const { user, signOut } = useAuth();
  const tierLabel = isPro ? 'Pro' : isMember ? 'Basic' : 'Free';

  const links = [
    { id: 'profile', label: isMember ? 'My Skin Profile' : 'My Skin Profile — Pro', to: '/me' },
    { id: 'about', label: 'About Cryer Aesthetics', to: '/more/about' },
    { id: 'contact', label: 'Email Us', to: '/more/contact' },
    { id: 'reviews', label: 'Client Reviews', to: '/more/reviews' },
    { id: 'tips', label: 'Tips & Guides', to: '/more/tips' },
    { id: 'book', label: 'Book Now', to: '/book-now' },
    { id: 'bookLink', label: 'My Books', to: '/more/books' },
    { id: 'subscribe', label: isMember ? `Membership — ${tierLabel}` : 'Membership — Subscribe', to: '/subscribe' },
  ];

  return (
    <div className="screen-pad-tabbed">
      <h2 style={{ fontSize: 21, margin: '6px 0 16px' }}>More</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((m) => (
          <button
            key={m.id}
            className="chip"
            onClick={() => navigate(m.to)}
            style={{ padding: '13px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', width: '100%', textAlign: 'left' }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{m.label}</span>
            <span>›</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 18 }}>
        {user ? (
          <button className="btn btn-secondary btn-block" onClick={() => signOut()} style={{ width: '100%' }}>Sign out</button>
        ) : (
          <button className="btn btn-secondary btn-block" onClick={() => navigate('/login')} style={{ width: '100%' }}>Sign in / Create account</button>
        )}
      </div>
    </div>
  );
}
