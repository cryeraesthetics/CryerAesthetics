import { useNavigate } from 'react-router-dom';
import { useMemberData } from '../../context/MemberDataContext';
import { useRoutineFlags } from '../../lib/useRoutineFlags';
import { buildSkinSummaryHtml, exportSkinSummary } from '../../lib/exportSummary';
import { prettyTime } from '../../lib/time';

export default function MoreTab() {
  const navigate = useNavigate();
  const { profile, setProfileFields, shelfPresetIds, customProducts, photoItems, diary } = useMemberData();
  const flags = useRoutineFlags();

  const doExport = () => {
    const html = buildSkinSummaryHtml({ profile, shelfPresetIds, customProducts, photoItems, flags, diary });
    exportSkinSummary(html);
  };

  const reminders = [
    { id: 'push', label: 'Push notifications', sub: 'Allow Cryer Aesthetics to send alerts', on: profile.pushOn, onToggle: () => setProfileFields({ pushOn: !profile.pushOn }), hasTime: false },
    { id: 'am', label: 'AM routine reminder', sub: prettyTime(profile.amTime), on: profile.remindAm, onToggle: () => setProfileFields({ remindAm: !profile.remindAm }), hasTime: true, time: profile.amTime, onTime: (v: string) => setProfileFields({ amTime: v }) },
    { id: 'pm', label: 'PM routine reminder', sub: prettyTime(profile.pmTime), on: profile.remindPm, onToggle: () => setProfileFields({ remindPm: !profile.remindPm }), hasTime: true, time: profile.pmTime, onTime: (v: string) => setProfileFields({ pmTime: v }) },
  ];

  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 6 }}>Take it to your dermatologist</div>
      <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.5, margin: '0 0 9px' }}>
        One page with your skin type, concerns, products, flagged interactions and diary history — save it as a PDF or print it.
      </p>
      <button className="btn btn-secondary btn-block" onClick={doExport} style={{ width: '100%', marginBottom: 20 }}>Export my skin summary</button>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>Reminders</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {reminders.map((rm) => (
          <div key={rm.id} style={{ padding: '11px 13px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px 12px' }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text)' }}>{rm.label}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>{rm.sub}</div>
            </div>
            <div
              onClick={rm.onToggle}
              style={{ width: 46, height: 27, borderRadius: 999, background: rm.on ? 'var(--color-accent-2-700)' : 'var(--color-divider)', display: 'flex', alignItems: 'center', justifyContent: rm.on ? 'flex-end' : 'flex-start', padding: 3, boxSizing: 'border-box', cursor: 'pointer', flex: 'none' }}
            >
              <div style={{ width: 21, height: 21, borderRadius: '50%', background: '#fff' }} />
            </div>
            {rm.hasTime && (
              <div style={{ flex: '1 0 100%', display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', whiteSpace: 'nowrap' }}>Remind me at</span>
                <input className="input" type="time" value={rm.time} onChange={(e) => rm.onTime?.(e.target.value)} style={{ flex: 1, minWidth: 0, padding: '7px 11px', fontSize: 12.5 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Skin Diary & progress photos', to: '/me/diary' },
          { label: 'Ingredient layering guide', to: '/me/layering' },
          { label: 'Application guides', to: '/me/tutorials' },
          { label: 'Seasonal transition kits', to: '/me/kits' },
        ].map((item) => (
          <button
            key={item.to} className="chip" onClick={() => navigate(item.to)}
            style={{ padding: '13px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', width: '100%', textAlign: 'left' }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{item.label}</span><span>›</span>
          </button>
        ))}
      </div>
    </>
  );
}
