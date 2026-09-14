import { useState } from 'react';
import BackLink from '../components/BackLink';
import { CONTACT_EMAIL } from '../lib/data';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function Contact() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const send = async () => {
    if (supabaseConfigured) {
      await supabase.from('contact_messages').insert({ user_id: user?.id ?? null, name, email, message });
    }
    setSent(true);
  };

  return (
    <div className="screen-pad">
      <BackLink to="/more" label="More" />
      <h2 style={{ fontSize: 21, margin: '6px 0 4px' }}>Email Us</h2>
      <p className="muted" style={{ fontSize: 13, margin: '0 0 16px' }}>Questions about a treatment or your skin? Reach out directly.</p>
      <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', marginBottom: 16, fontSize: 13, fontWeight: 600, color: 'var(--color-accent-2-700)' }}>{CONTACT_EMAIL}</div>

      {sent ? (
        <div style={{ padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', textAlign: 'center', fontSize: 13.5, fontWeight: 600, color: 'var(--color-accent-2-700)' }}>
          Thanks — we'll reply within 1 business day.
        </div>
      ) : (
        <>
          <div className="field" style={{ marginBottom: 10 }}>
            <label>Name</label>
            <input className="input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input className="input" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 14 }}>
            <label>Message</label>
            <textarea className="input" rows={4} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-block" onClick={send} style={{ width: '100%' }}>Send message</button>
        </>
      )}
    </div>
  );
}
