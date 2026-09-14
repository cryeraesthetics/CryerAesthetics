import BackLink from '../../components/BackLink';
import { KITS } from '../../lib/data';

export default function Kits() {
  return (
    <div className="screen-pad">
      <BackLink to="/me" label="My Skin" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Seasonal Transition Kits</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>Three swaps that carry your routine into the next season.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {KITS.map((kt) => (
          <div key={kt.id} className="card elev-sm" style={{ padding: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--color-text)' }}>{kt.season}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent-2-700)', flex: 'none', whiteSpace: 'nowrap' }}>{kt.when}</span>
            </div>
            <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.5, margin: '5px 0 9px' }}>{kt.why}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {kt.items.map((it) => <div key={it} style={{ fontSize: 12, color: 'var(--color-text)' }}>• {it}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
