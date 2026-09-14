import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMemberData } from '../context/MemberDataContext';
import { useRoutineFlags } from '../lib/useRoutineFlags';
import { SKIN_TYPES, NEW_TIPS, JOURNEY_TIPS, ENV, CONCERNS } from '../lib/data';
import markLogo from '../assets/cryer-aesthetics-mark.png';
import bookCover from '../assets/book-motivated-student.png';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isMember, isPro, profile, locationState, diary } = useMemberData();
  const flags = useRoutineFlags();

  const tierLabel = isPro ? 'Pro' : isMember ? 'Basic' : 'Free';
  const profileType = SKIN_TYPES.find((t) => t.id === profile.skinType) || null;
  const concernSummary = profile.concerns.length
    ? CONCERNS.filter((c) => profile.concerns.includes(c.id)).map((c) => c.label).join(' · ')
    : 'No concerns selected yet';

  return (
    <div className="screen-pad-tabbed">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src={markLogo} alt="" style={{ height: 42, width: 'auto', objectFit: 'contain', display: 'block' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, lineHeight: 1.1, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>Cryer Aesthetics</div>
            <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', marginTop: 2 }}>Skincare</div>
          </div>
        </div>
        <div className={`tag ${isMember ? 'tag-accent-2' : 'tag-outline'}`} style={{ flex: 'none' }}>{tierLabel}</div>
      </div>

      {!isMember && (
        <div className="chip" onClick={() => navigate('/subscribe')} style={{ padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-700)', color: 'var(--color-neutral-100)', marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Unlock full access</div>
          <div style={{ fontSize: 12.5, marginTop: 3, opacity: 0.9, lineHeight: 1.45 }}>Subscribe to Cryer Aesthetics Pro for the full skin guide, your skin profile and more.</div>
          <div style={{ fontSize: 12.5, marginTop: 8, fontWeight: 600, textDecoration: 'underline' }}>See plans →</div>
        </div>
      )}

      {isPro && (
        <div className="chip" onClick={() => navigate('/me')} style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', whiteSpace: 'nowrap' }}>My skin profile</div>
            <span style={{ fontSize: 12, color: 'var(--color-accent-2-700)', whiteSpace: 'nowrap' }}>Open ›</span>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, color: 'var(--color-text)', margin: '4px 0 2px' }}>{profileType ? profileType.name + ' skin' : 'Skin type not set'}</div>
          <div style={{ fontSize: 11.5, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', lineHeight: 1.45 }}>{concernSummary}</div>
          {locationState === 'on' ? (
            <>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginTop: 10 }}>Sample data</div>
              <div style={{ display: 'flex', gap: 7, marginTop: 5 }}>
                {ENV.metrics.map((em) => (
                  <div key={em.id} style={{ flex: 1, padding: '8px 6px', borderRadius: 12, background: 'var(--color-bg)', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{em.value}</div>
                    <div style={{ fontSize: 9.5, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 1 }}>{em.label}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 11.5, color: 'var(--color-accent-700)', fontWeight: 600, marginTop: 10 }}>Turn on location for today's conditions ›</div>
          )}
          <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)', marginTop: 8 }}>{flags.length} routine warning(s) · {diary.length} diary entries</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
        <button className="chip" onClick={() => navigate('/book-now')} style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center', border: 'none' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)' }}>Book Now</div>
          <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 2 }}>Reserve a visit</div>
        </button>
        <a href="/quiz" className="chip" style={{ textDecoration: 'none', padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center', display: 'block' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)' }}>Take the Skin Quiz</div>
          <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 2 }}>2-minute match</div>
        </a>
        <button className="chip" onClick={() => navigate('/faq')} style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center', border: 'none' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)' }}>FAQ</div>
          <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 2 }}>Common questions</div>
        </button>
        <button className="chip" onClick={() => navigate('/guide')} style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center', border: 'none' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)' }}>Skin Guide</div>
          <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 2 }}>All 5 skin types</div>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', whiteSpace: 'nowrap' }}>Tips & guides</div>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/more/tips'); }} style={{ fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>See all</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {[NEW_TIPS[0], JOURNEY_TIPS[0]].map((t) => (
          <div key={t.title} style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{t.title}</div>
            <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', marginTop: 2 }}>{t.body}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 10 }}>From Cryer Aesthetics</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {[
          { label: 'About Cryer Aesthetics', to: '/more/about' },
          { label: 'Email Us', to: '/more/contact' },
          { label: 'Client Reviews', to: '/more/reviews' },
        ].map((item) => (
          <button key={item.to} className="chip" onClick={() => navigate(item.to)} style={{ padding: '13px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', width: '100%', textAlign: 'left' }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{item.label}</span><span>›</span>
          </button>
        ))}
      </div>

      <button className="chip" onClick={() => navigate('/more/books')} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)', border: 'none', width: '100%', textAlign: 'left' }}>
        <img src={bookCover} alt="The Motivated Student: I Believe in Me" style={{ width: 44, height: 60, flex: 'none', borderRadius: 10, objectFit: 'cover', display: 'block' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', fontWeight: 600 }}>My Books</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)', marginTop: 1 }}>I Believe in Me</div>
        </div>
        <span>›</span>
      </button>
      {!user && (
        <p className="muted" style={{ fontSize: 11, textAlign: 'center', marginTop: 16 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign in</a> to save your profile and membership across devices.
        </p>
      )}
    </div>
  );
}
