import { useMemberData } from '../../context/MemberDataContext';
import { ENV } from '../../lib/data';

export default function TodayTab() {
  const { locationState, requestLocation } = useMemberData();

  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>
        Today in {locationState === 'on' ? ENV.place : 'your area'}
      </div>

      {locationState !== 'on' && (
        <div style={{ padding: '16px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Turn on location</div>
          <p className="muted-70" style={{ fontSize: 12, lineHeight: 1.55, margin: '0 0 12px' }}>UV, humidity and air quality are local readings, so this section needs your location. Nothing is stored beyond your device.</p>
          <button className="btn btn-primary btn-block" onClick={requestLocation} style={{ width: '100%' }}>Allow location</button>
          {locationState === 'denied' && (
            <div style={{ fontSize: 11.5, lineHeight: 1.5, color: 'var(--color-accent-700)', marginTop: 9 }}>Location is blocked for this app. Enable it in your phone's settings, then tap Allow again.</div>
          )}
          {locationState === 'pending' && (
            <div className="muted" style={{ fontSize: 11.5, marginTop: 9 }}>Checking your location…</div>
          )}
        </div>
      )}

      {locationState === 'on' && (
        <>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>Sample data</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
            {ENV.metrics.map((em) => (
              <div key={em.id} style={{ padding: '11px 8px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, color: 'var(--color-text)' }}>{em.value}</div>
                <div className="muted" style={{ fontSize: 10.5, marginTop: 1 }}>{em.label}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-accent-700)', marginTop: 2 }}>{em.rating}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)', marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>What this means for your routine</div>
            <p style={{ fontSize: 12, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', margin: 0 }}>{ENV.impact}</p>
          </div>
          <p style={{ fontSize: 10.5, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 52%, transparent)', margin: '-12px 0 20px' }}>
            These readings are sample values. Live UV, humidity and air quality for your area switch on once the weather service is connected.
          </p>
        </>
      )}
    </>
  );
}
