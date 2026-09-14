import { useState } from 'react';
import { useRoutineFlags } from '../../lib/useRoutineFlags';

export default function CheckTab() {
  const flags = useRoutineFlags();
  const [scanCount, setScanCount] = useState(0);

  const badgeFor = (level: string) => (level === 'avoid' ? "Don't layer" : level === 'gap' ? 'Missing step' : 'Use with care');
  const bgFor = (level: string) => (level === 'avoid' ? 'var(--color-accent-100)' : 'var(--color-neutral-100)');
  const accentFor = (level: string) => (level === 'avoid' ? 'var(--color-accent-700)' : 'var(--color-accent-2-700)');

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', whiteSpace: 'nowrap' }}>Routine check</div>
        <span className="muted" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{scanCount === 0 ? 'Scanned your full profile' : `Re-scanned ${scanCount}x this session`}</span>
      </div>
      <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.5, margin: '0 0 9px' }}>
        Reads your skin type, tracked concerns and every product you've listed. Guidance, not a diagnosis — anything painful, spreading or not settling should be seen in person.
      </p>
      {flags.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
          {flags.map((fl) => (
            <div key={fl.id} style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: bgFor(fl.level) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)' }}>{fl.title}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap', color: accentFor(fl.level) }}>{badgeFor(fl.level)}</span>
              </div>
              <div className="muted" style={{ fontSize: 11, marginBottom: 5 }}>{fl.products}</div>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', margin: '0 0 5px' }}>{fl.why}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: accentFor(fl.level) }}>Fix: {fl.fix}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', fontSize: 12.5, fontWeight: 600, color: 'var(--color-accent-2-700)', marginBottom: 10 }}>
          Nothing you've listed conflicts in the same session.
        </div>
      )}
      <button className="btn btn-secondary btn-block" onClick={() => setScanCount((c) => c + 1)} style={{ width: '100%', marginBottom: 20 }}>Re-scan my routine</button>
    </>
  );
}
