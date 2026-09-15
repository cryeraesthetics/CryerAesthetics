import { useNavigate } from 'react-router-dom';
import { SKIN_TYPES } from '../lib/data';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function SkinGuideList() {
  const navigate = useNavigate();
  return (
    <div className="screen-pad-tabbed">
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Skin Guide</h2>
      <p className="muted" style={{ fontSize: 13, margin: '0 0 16px' }}>Regimens, do's & don'ts and FAQs for every skin type. Guidance, not a diagnosis.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SKIN_TYPES.map((s) => (
          <button
            key={s.id}
            className="chip"
            onClick={() => navigate(`/guide/${s.id}`)}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', border: 'none', width: '100%', textAlign: 'left' }}
          >
            <ImagePlaceholder label={`${s.name} skin`} src={s.image} fit="cover" radius={12} style={{ width: 64, height: 64, flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>{s.name}</div>
              <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)', marginTop: 2 }}>{s.tagline}</div>
            </div>
            <span>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
