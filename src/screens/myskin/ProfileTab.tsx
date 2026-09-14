import { useState } from 'react';
import { useMemberData } from '../../context/MemberDataContext';
import { CONCERNS, SKIN_TYPES } from '../../lib/data';

export default function ProfileTab() {
  const { profile, setProfileFields, toggleConcern, addCustomConcern, removeCustomConcern } = useMemberData();
  const [concernInput, setConcernInput] = useState('');

  const profileType = SKIN_TYPES.find((t) => t.id === profile.skinType) || null;
  const concernSummary = profile.concerns.length
    ? CONCERNS.filter((c) => profile.concerns.includes(c.id)).map((c) => c.label).join(' · ')
    : 'No concerns selected yet';

  const submitConcern = () => {
    addCustomConcern(concernInput);
    setConcernInput('');
  };

  return (
    <div style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-2-100)', marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Skin profile</div>
      <div className="field" style={{ margin: '8px 0 10px' }}>
        <input className="input" type="text" placeholder="Your name" value={profile.name} onChange={(e) => setProfileFields({ name: e.target.value })} style={{ width: '100%', boxSizing: 'border-box' }} />
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-text)', margin: '4px 0 2px' }}>{profileType ? profileType.name + ' skin' : 'Skin type not set'}</div>
      <div className="muted" style={{ fontSize: 12, lineHeight: 1.45 }}>{profileType ? profileType.tagline : 'Pick a type below, or take the skin quiz on Home.'}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {SKIN_TYPES.map((t) => {
          const active = profile.skinType === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setProfileFields({ skinType: t.id })}
              style={{
                cursor: 'pointer', padding: '5px 11px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap',
                border: `1.5px solid ${active ? 'var(--color-accent-2-700)' : 'var(--color-divider)'}`,
                background: active ? 'var(--color-accent-2-700)' : 'var(--color-bg)',
                color: active ? 'var(--color-neutral-100)' : 'var(--color-text)',
              }}
            >
              {t.name}
            </div>
          );
        })}
      </div>
      <div style={{ height: 1, background: 'color-mix(in srgb, var(--color-text) 12%, transparent)', margin: '12px 0' }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 6 }}>Concerns tracked</div>
      <div style={{ fontSize: 12, color: 'var(--color-text)', lineHeight: 1.45, marginBottom: 9 }}>{concernSummary}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {CONCERNS.map((c) => {
          const active = profile.concerns.includes(c.id);
          return (
            <div
              key={c.id}
              onClick={() => toggleConcern(c.id)}
              style={{
                cursor: 'pointer', padding: '5px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap',
                border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-divider)'}`,
                background: active ? 'var(--color-accent-100)' : 'var(--color-bg)',
              }}
            >
              {active ? '✓' : '+'} {c.label}
            </div>
          );
        })}
        {profile.customConcerns.map((v) => (
          <div
            key={v}
            onClick={() => removeCustomConcern(v)}
            style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: 999, border: '1.5px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: 11.5, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}
          >
            {v} ×
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 7, marginTop: 9 }}>
        <input
          className="input" type="text" placeholder="Add your own concern" value={concernInput}
          onChange={(e) => setConcernInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitConcern(); } }}
          style={{ flex: 1, minWidth: 0 }}
        />
        <button className="btn btn-secondary" onClick={submitConcern} style={{ flex: 'none' }}>Add</button>
      </div>
      <div style={{ height: 1, background: 'color-mix(in srgb, var(--color-text) 12%, transparent)', margin: '14px 0' }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 6 }}>Notes for my esthetician</div>
      <textarea
        className="input" rows={3} placeholder="Reactions, medications, anything you want noted before your next visit"
        value={profile.notes} onChange={(e) => setProfileFields({ notes: e.target.value })}
        style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
      />
    </div>
  );
}
