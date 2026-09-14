import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import markLogo from '../assets/cryer-aesthetics-mark.png';

export default function Signup() {
  const { signUp, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 20 }}>Check your email</h2>
        <p className="muted" style={{ fontSize: 13, maxWidth: 300, margin: '0 auto 16px' }}>
          We sent a confirmation link to {email}. Confirm it, then sign in.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/login', { state: location.state })}>Go to sign in</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
      <img src={markLogo} alt="" style={{ height: 56, width: 'auto' }} />
      <h2 style={{ fontSize: 22, margin: 0 }}>Create your account</h2>
      {!configured && (
        <p className="muted" style={{ fontSize: 12.5, maxWidth: 280 }}>
          The backend isn't configured yet — see SETUP.md to connect Supabase before accounts can be created.
        </p>
      )}
      <div style={{ width: '100%', maxWidth: 320, textAlign: 'left' }}>
        <div className="field" style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        </div>
        <div className="field" style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        {error && <p style={{ color: 'var(--color-accent-700)', fontSize: 12.5, margin: '0 0 8px' }}>{error}</p>}
        <button className="btn btn-primary btn-block" disabled={!email || password.length < 6 || loading} onClick={submit} style={{ width: '100%' }}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </div>
      <p className="muted" style={{ fontSize: 12.5 }}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login', { state: location.state }); }}>Sign in</a>
      </p>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ fontSize: 12.5 }}>‹ Back to the app</a>
    </div>
  );
}
