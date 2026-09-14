import { useState } from 'react';
import BackLink from '../../components/BackLink';
import { TUTORIALS } from '../../lib/data';

export default function Tutorials() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="screen-pad">
      <BackLink to="/me" label="My Skin" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Application Guides</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>Step by step, with the amounts, the timing and the mistakes to avoid. Tap a guide to open it.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {TUTORIALS.map((tv) => {
          const open = openId === tv.id;
          return (
            <div key={tv.id} className="card elev-sm" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenId(open ? null : tv.id)}
                style={{ cursor: 'pointer', padding: '13px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text)' }}>{tv.title}</div>
                  <div className="muted" style={{ fontSize: 11.5, lineHeight: 1.45, marginTop: 2 }}>{tv.summary}</div>
                </div>
                <span style={{ fontSize: 15, color: 'var(--color-accent-700)', lineHeight: 1.2 }}>{open ? '–' : '+'}</span>
              </button>
              {open && (
                <div style={{ padding: '0 14px 15px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px 12px', marginBottom: 14, padding: '11px 12px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>Amount</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.45, color: 'var(--color-text)' }}>{tv.amount}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>When</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.45, color: 'var(--color-text)' }}>{tv.timing}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>How often</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.45, color: 'var(--color-text)' }}>{tv.frequency}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {tv.steps.map((text, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{ flex: 'none', width: 21, height: 21, borderRadius: '50%', background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--color-text)' }}>{text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>Avoid</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {tv.avoid.map((av) => (
                        <div key={av} style={{ fontSize: 11.5, lineHeight: 1.5, color: 'var(--color-accent-900)' }}>— {av}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
