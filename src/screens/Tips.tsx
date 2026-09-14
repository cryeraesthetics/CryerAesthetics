import BackLink from '../components/BackLink';
import { NEW_TIPS, JOURNEY_TIPS } from '../lib/data';

export default function Tips() {
  return (
    <div className="screen-pad">
      <BackLink to="/more" label="More" />
      <h2 style={{ fontSize: 21, margin: '6px 0 16px' }}>Tips & Guides</h2>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>New to skincare</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {NEW_TIPS.map((t) => (
          <div key={t.title} style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{t.title}</div>
            <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', marginTop: 2, lineHeight: 1.45 }}>{t.body}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>Already on your journey</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {JOURNEY_TIPS.map((t) => (
          <div key={t.title} style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{t.title}</div>
            <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', marginTop: 2, lineHeight: 1.45 }}>{t.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
