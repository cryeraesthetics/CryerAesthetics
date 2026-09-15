import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SKIN_TYPES } from '../lib/data';
import { useMemberData } from '../context/MemberDataContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import BackLink from '../components/BackLink';
import { LockIcon } from '../components/icons';
import { useNavigate } from 'react-router-dom';

export default function SkinGuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMember } = useMemberData();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const skinType = SKIN_TYPES.find((t) => t.id === id);

  if (!skinType) return <div className="screen-pad"><BackLink to="/guide" label="Skin Guide" /><p>Skin type not found.</p></div>;

  return (
    <div className="screen-pad-tabbed">
      <BackLink to="/guide" label="Skin Guide" />
      <ImagePlaceholder label={`${skinType.name} skin`} src={skinType.image} fit="contain" radius={16} style={{ width: '100%', height: 150 }} />
      <h2 style={{ fontSize: 22, margin: '14px 0 2px' }}>{skinType.name} Skin</h2>
      <p className="muted" style={{ fontSize: 13, margin: '0 0 16px' }}>{skinType.tagline}</p>

      {isMember ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <div className="card elev-sm" style={{ padding: 12 }}>
              <div className="card-kicker">AM Routine</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                {skinType.am.map((step) => <div key={step} style={{ fontSize: 12, color: 'var(--color-text)' }}>{step}</div>)}
              </div>
            </div>
            <div className="card elev-sm" style={{ padding: 12 }}>
              <div className="card-kicker">PM Routine</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                {skinType.pm.map((step) => <div key={step} style={{ fontSize: 12, color: 'var(--color-text)' }}>{step}</div>)}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent-2-700)', marginBottom: 6 }}>Do</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skinType.dos.map((d) => <div key={d} style={{ fontSize: 12, color: 'var(--color-text)', lineHeight: 1.4 }}>✓ {d}</div>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent-700)', marginBottom: 6 }}>Don't</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skinType.donts.map((d) => <div key={d} style={{ fontSize: 12, color: 'var(--color-text)', lineHeight: 1.4 }}>✕ {d}</div>)}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>FAQs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {skinType.faqs.map((f) => (
              <div key={f.q} style={{ border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <button
                  className="chip"
                  onClick={() => setOpenFaq(openFaq === f.q ? null : f.q)}
                  style={{ padding: '11px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-neutral-100)', border: 'none', width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{f.q}</span>
                  <span>{openFaq === f.q ? '−' : '+'}</span>
                </button>
                {openFaq === f.q && (
                  <div style={{ padding: '11px 13px', fontSize: 12.5, color: 'color-mix(in srgb, var(--color-text) 68%, transparent)', lineHeight: 1.5 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '22px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
            <LockIcon size={16} />
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Full regimen locked</div>
          <p className="muted-70" style={{ fontSize: 12.5, margin: '0 0 14px', lineHeight: 1.5 }}>Subscribe to Cryer Aesthetics Pro to see the AM/PM regimen, do's & don'ts and FAQs for {skinType.name} skin.</p>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/subscribe')} style={{ width: '100%' }}>Unlock with Pro</button>
        </div>
      )}
    </div>
  );
}
