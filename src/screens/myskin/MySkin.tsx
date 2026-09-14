import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberData } from '../../context/MemberDataContext';
import { LockIcon } from '../../components/icons';
import ProfileTab from './ProfileTab';
import TodayTab from './TodayTab';
import ShelfTab from './ShelfTab';
import CheckTab from './CheckTab';
import AskTab from './AskTab';
import MoreTab from './MoreTab';

type TabId = 'profile' | 'today' | 'shelf' | 'check' | 'ask' | 'more';
const TABS: { id: TabId; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'today', label: 'Today' },
  { id: 'shelf', label: 'My shelf' },
  { id: 'check', label: 'Routine check' },
  { id: 'ask', label: 'Ask' },
  { id: 'more', label: 'More' },
];

export default function MySkin() {
  const navigate = useNavigate();
  const { isMember, isPro } = useMemberData();
  const [tab, setTab] = useState<TabId>('profile');

  return (
    <div className="screen-pad-tabbed">
      <h2 style={{ fontSize: 21, margin: '12px 0 3px' }}>My Skin</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>Your profile, conditions and progress in one place. Everything here is guidance, not a diagnosis.</p>

      {isMember && !isPro && (
        <button
          className="chip"
          onClick={() => navigate('/subscribe')}
          style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)', marginBottom: 16, border: 'none', width: '100%', textAlign: 'left' }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent-700)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Annual Pro</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--color-text)', marginTop: 4 }}>Your skin profile, diary, routine check and local conditions are part of Annual Pro. Upgrade for $59.99 a year. ›</div>
        </button>
      )}

      {isPro && (
        <>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
            <div
              onClick={() => navigate('/me/diary')}
              style={{ cursor: 'pointer', flex: 'none', padding: '7px 14px', borderRadius: 999, border: '1.5px solid var(--color-divider)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}
            >
              Skin diary
            </div>
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    cursor: 'pointer', flex: 'none', padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                    border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-divider)'}`,
                    background: active ? 'var(--color-accent)' : 'var(--color-bg)',
                    color: active ? 'var(--color-neutral-100)' : 'var(--color-text)',
                  }}
                >
                  {t.label}
                </div>
              );
            })}
          </div>

          {tab === 'profile' && <ProfileTab />}
          {tab === 'today' && <TodayTab />}
          {tab === 'shelf' && <ShelfTab />}
          {tab === 'check' && <CheckTab />}
          {tab === 'ask' && <AskTab />}
          {tab === 'more' && <MoreTab />}
        </>
      )}

      {!isMember && (
        <div style={{ padding: '22px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
            <LockIcon size={16} />
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Your profile unlocks with Pro</div>
          <p className="muted-70" style={{ fontSize: 12.5, margin: '0 0 14px', lineHeight: 1.5 }}>Track skin concerns and products, log progress photos, get local UV and humidity guidance, routine reminders and automated layering checks.</p>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/subscribe')} style={{ width: '100%' }}>Unlock with Pro</button>
        </div>
      )}
    </div>
  );
}
