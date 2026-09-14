import BackLink from '../../components/BackLink';
import { LAYER_ORDER } from '../../lib/data';
import { useRoutineFlags } from '../../lib/useRoutineFlags';

export default function Layering() {
  const flags = useRoutineFlags();
  const bgFor = (level: string) => (level === 'avoid' ? 'var(--color-accent-100)' : 'var(--color-neutral-100)');
  const accentFor = (level: string) => (level === 'avoid' ? 'var(--color-accent-700)' : 'var(--color-accent-2-700)');
  const badgeFor = (level: string) => (level === 'avoid' ? "Don't layer" : level === 'gap' ? 'Missing step' : 'Use with care');

  return (
    <div className="screen-pad">
      <BackLink to="/me" label="My Skin" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Layering Guide</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>Thin to thick, water before oil, one treatment active per session.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22 }}>
        {LAYER_ORDER.map((lo) => (
          <div key={lo.step} style={{ display: 'flex', gap: 11, alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--color-accent-2-100)', color: 'var(--color-accent-2-700)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{lo.step}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)' }}>{lo.label}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>{lo.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>Safety warnings for your shelf</div>
      {flags.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {flags.map((fl) => (
            <div key={fl.id} style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: bgFor(fl.level) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)' }}>{fl.title}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap', color: accentFor(fl.level) }}>{badgeFor(fl.level)}</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', margin: '0 0 5px' }}>{fl.why}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: accentFor(fl.level) }}>Fix: {fl.fix}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', fontSize: 12.5, fontWeight: 600, color: 'var(--color-accent-2-700)' }}>
          Nothing on your shelf conflicts. Hyaluronic acid, niacinamide and mineral SPF layer safely with everything.
        </div>
      )}
    </div>
  );
}
