import BackLink from '../components/BackLink';
import aboutImg from '../assets/cryer-aesthetics-about-trim.png';

export default function About() {
  return (
    <div className="screen-pad">
      <BackLink to="/more" label="More" />
      <div style={{ width: '100%', borderRadius: 'var(--radius-lg)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 18px', boxSizing: 'border-box' }}>
        <img src={aboutImg} alt="Cryer Aesthetics Skincare" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <h2 style={{ fontSize: 21, margin: '14px 0 8px' }}>About Cryer Aesthetics</h2>
      <p className="muted-70" style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
        Cryer Aesthetics is a skincare consultancy built on one idea: healthy skin starts with understanding your skin. Every consultation blends careful listening with proven regimens, so recommendations fit your life — not a generic routine.
      </p>
      <p className="muted-70" style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>
        This app is an extension of that promise — a place to learn your skin type, keep your regimen on track, and stay connected between visits.
      </p>
    </div>
  );
}
