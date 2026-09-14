import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { PLANS, BASIC_FEATURES, PRO_FEATURES } from '../lib/data';
import { useCheckout } from '../context/CheckoutContext';

export default function Subscribe() {
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan } = useCheckout();

  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];
  const features = selectedPlan === 'annual' ? PRO_FEATURES : BASIC_FEATURES;
  const heading = selectedPlan === 'annual' ? 'Annual Pro includes' : 'Monthly Basic includes';

  return (
    <div className="screen-pad">
      <BackLink to="/" label="Home" />
      <h2 style={{ fontSize: 21, margin: '6px 0 4px' }}>Cryer Aesthetics Pro</h2>
      <p className="muted" style={{ fontSize: 13, margin: '0 0 16px' }}>Full skin guide, your own skin profile, and member perks.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {PLANS.map((pl) => {
          const active = selectedPlan === pl.id;
          return (
            <button
              key={pl.id}
              className="chip"
              onClick={() => setSelectedPlan(pl.id)}
              style={{
                padding: '14px 16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-divider)'}`,
                background: active ? 'var(--color-accent-100)' : 'var(--color-neutral-100)',
                width: '100%', textAlign: 'left',
              }}
            >
              <div style={{ flex: 'none' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{pl.label}</div>
                <div className="muted" style={{ fontSize: 11.5, whiteSpace: 'nowrap' }}>{pl.sub}</div>
              </div>
              {pl.badge && <div className="tag tag-accent-2" style={{ flex: 'none', whiteSpace: 'nowrap' }}>{pl.badge}</div>}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginBottom: 2 }}>{heading}</div>
        {features.map((f) => (
          <div key={f} style={{ fontSize: 12.5, color: 'var(--color-text)' }}>✓ {f}</div>
        ))}
      </div>
      <button className="btn btn-primary btn-block" onClick={() => navigate('/payment')} style={{ width: '100%' }}>Continue — {plan.price}</button>
    </div>
  );
}
