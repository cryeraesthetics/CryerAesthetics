import BackLink from '../components/BackLink';
import { SERVICES, BOOKING_URL } from '../lib/data';

export default function BookNow() {
  return (
    <div className="screen-pad">
      <BackLink to="/" label="Home" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Book Now</h2>
      <p className="muted" style={{ fontSize: 12.5, lineHeight: 1.5, margin: '0 0 16px' }}>
        Appointments are scheduled on our booking site, where you can see real availability and reserve instantly.
      </p>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8 }}>Services offered</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {SERVICES.map((svc) => (
          <div key={svc.id} style={{ padding: '11px 13px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-divider)', background: 'var(--color-bg)', fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>
            {svc.label}
          </div>
        ))}
      </div>

      <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ width: '100%', textDecoration: 'none', boxSizing: 'border-box', textAlign: 'center' }}>
        Book on GlossGenius
      </a>
      <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.5, margin: '10px 0 0', textAlign: 'center' }}>
        Opens cryeraestheticsskincare.glossgenius.com in a new tab.
      </p>
    </div>
  );
}
