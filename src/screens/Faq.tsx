import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_FAQS } from '../lib/data';

export default function Faq() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="screen-pad-tabbed">
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>FAQ</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>How the app, your membership and your appointments work. Everything in the app is guidance, not a diagnosis. Tap a question to open it.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {APP_FAQS.map((fq) => (
          <div key={fq.id} className="card elev-sm" style={{ padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => setOpenId(openId === fq.id ? null : fq.id)}
              style={{ cursor: 'pointer', padding: '13px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <div style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{fq.q}</div>
              <span style={{ fontSize: 15, color: 'var(--color-accent-700)', lineHeight: 1.2, flex: 'none' }}>{openId === fq.id ? '–' : '+'}</span>
            </button>
            {openId === fq.id && (
              <div style={{ padding: '0 14px 14px', fontSize: 12, lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{fq.a}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '13px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 3 }}>Still stuck?</div>
        <p className="muted-70" style={{ fontSize: 12, lineHeight: 1.5, margin: '0 0 10px' }}>Email us and we'll get back to you.</p>
        <button className="btn btn-secondary btn-block" onClick={() => navigate('/more/contact')} style={{ width: '100%' }}>Email Cryer Aesthetics</button>
      </div>
    </div>
  );
}
