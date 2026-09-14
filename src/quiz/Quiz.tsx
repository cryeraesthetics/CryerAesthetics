import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import logo from '../assets/cryer-aesthetics-logo-2-alpha.png';
import { STEPS, computeResults, type QuizAnswers } from './data';

const EMPTY_ANSWERS: QuizAnswers = { skinType: null, concerns: [], goals: [], products: [], allergies: [], medical: [] };
const BOOKING_URL = 'https://cryeraestheticsskincare.glossgenius.com/';

type Screen = 'welcome' | 'question' | 'results';

export default function Quiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<QuizAnswers>({ ...EMPTY_ANSWERS });
  const [allergyNotes, setAllergyNotes] = useState('');

  const step = STEPS[stepIndex];

  const restart = () => {
    setScreen('welcome'); setStepIndex(0); setAnswers({ ...EMPTY_ANSWERS }); setAllergyNotes('');
  };

  const goBack = () => {
    if (stepIndex === 0) { setScreen('welcome'); return; }
    setStepIndex((i) => i - 1);
  };

  const toggleOption = (id: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      if (!step.multi) {
        (next as any)[step.key] = id;
        return next;
      }
      const cur = prev[step.key] as string[];
      let updated: string[];
      if (step.noneId && id === step.noneId) {
        updated = cur.includes(id) ? [] : [id];
      } else {
        updated = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur.filter((x) => x !== step.noneId), id];
      }
      (next as any)[step.key] = updated;
      return next;
    });
  };

  const answered = step.multi ? (answers[step.key] as string[]).length > 0 : !!answers[step.key];

  const goNext = () => {
    if (!answered) return;
    if (stepIndex === STEPS.length - 1) { setScreen('results'); return; }
    setStepIndex((i) => i + 1);
  };

  if (screen === 'welcome') {
    return (
      <AppFrame>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 22, textAlign: 'center', background: '#fff3e9', minHeight: '100dvh' }}>
          <img src={logo} alt="Cryer Aesthetics logo" style={{ width: 240, maxWidth: '80%', objectFit: 'contain' }} />
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', maxWidth: 280, margin: 0 }}>
            A few quick questions about your skin, and we'll put together personalised product and treatment recommendations just for you.
          </p>
          <div className="field" style={{ width: '100%', maxWidth: 280, textAlign: 'left' }}>
            <label>Your first name</label>
            <input className="input" type="text" placeholder="e.g. Danielle" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setScreen('question')} style={{ maxWidth: 280, width: '100%' }}>Start my consultation</button>
          <div className="muted" style={{ fontSize: 11.5 }}>Takes about 2 minutes</div>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ fontSize: 12.5, fontWeight: 600 }}>‹ Back to the app</a>
        </div>
      </AppFrame>
    );
  }

  if (screen === 'question') {
    const progressPct = Math.round(((stepIndex + 1) / STEPS.length) * 100);
    return (
      <AppFrame>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', animation: 'slideIn .25s ease' }}>
          <div style={{ padding: '18px 22px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-accent-700)', letterSpacing: '.03em', textTransform: 'uppercase' }}>Step {stepIndex + 1} of {STEPS.length}</span>
              <a href="#" onClick={(e) => { e.preventDefault(); goBack(); }} style={{ fontSize: 12.5, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', textDecoration: 'none' }}>{stepIndex === 0 ? 'Cancel' : 'Back'}</a>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: 'var(--color-neutral-200)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 999, background: 'var(--color-accent)', width: `${progressPct}%`, transition: 'width .3s ease' }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 22px' }}>
            <h2 style={{ fontSize: 22, margin: '6px 0 2px', lineHeight: 1.2 }}>{step.title}</h2>
            <p className="muted" style={{ fontSize: 13.5, margin: '0 0 16px' }}>{step.subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {step.options.map((opt) => {
                const selected = step.multi ? (answers[step.key] as string[]).includes(opt.id) : answers[step.key] === opt.id;
                const dotRadius = step.multi ? '6px' : '50%';
                return (
                  <div
                    key={opt.id}
                    className="chip"
                    onClick={() => toggleOption(opt.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius-lg)', border: `1.5px solid ${selected ? 'var(--color-accent)' : 'var(--color-divider)'}`, background: selected ? 'var(--color-accent-100)' : 'var(--color-bg)' }}
                  >
                    <div style={{ width: 22, height: 22, flex: 'none', borderRadius: dotRadius, border: `1.5px solid ${selected ? 'var(--color-accent)' : 'var(--color-neutral-400)'}`, background: selected ? 'var(--color-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selected && <div style={{ width: 9, height: 9, borderRadius: dotRadius, background: 'var(--color-bg)' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--color-text)' }}>{opt.label}</div>
                      {opt.desc && <div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{opt.desc}</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {step.allergyNotes && (
              <div className="field" style={{ marginTop: 16 }}>
                <label>Anything else we should know? (optional)</label>
                <textarea className="input" rows={3} placeholder="e.g. reacted to a fragranced cream once" value={allergyNotes} onChange={(e) => setAllergyNotes(e.target.value)} />
              </div>
            )}
          </div>

          <div style={{ padding: '14px 22px 22px', borderTop: '1px solid var(--color-divider)', background: 'var(--color-bg)' }}>
            <button className="btn btn-primary btn-block" disabled={!answered} onClick={goNext} style={{ width: '100%', opacity: answered ? 1 : 0.5 }}>
              {stepIndex === STEPS.length - 1 ? 'See my results' : 'Next'}
            </button>
          </div>
        </div>
      </AppFrame>
    );
  }

  const results = computeResults(answers);
  return (
    <AppFrame>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', animation: 'slideIn .25s ease' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '26px 22px 22px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-accent-2-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-accent-2)' }} />
          </div>
          <h2 style={{ fontSize: 24, margin: '0 0 4px', lineHeight: 1.15 }}>{name ? `Thanks, ${name} — here's your plan` : "Here's your plan"}</h2>
          <p className="muted" style={{ fontSize: 13.5, margin: '0 0 20px', lineHeight: 1.5 }}>Based on your answers, here's where we'd start.</p>

          <div className="card elev-sm" style={{ padding: 16, marginBottom: 14 }}>
            <div className="card-kicker">Recommended treatment</div>
            <div className="card-title" style={{ fontSize: 18 }}>{results.treatment.name}</div>
            <div className="card-body" style={{ fontSize: 13 }}>{results.treatment.desc}</div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-700)', textTransform: 'uppercase', letterSpacing: '.03em', margin: '18px 0 8px' }}>Suggested for your routine</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {results.products.map((p) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)' }}>
                <div style={{ width: 34, height: 34, flex: 'none', borderRadius: '50%', background: 'var(--color-accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-accent)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text)' }}>{p.name}</div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{p.reason}</div>
                </div>
              </div>
            ))}
          </div>

          {results.isPregnant && (
            <div className="tag tag-accent-2" style={{ display: 'block', padding: '10px 12px', fontSize: 12, lineHeight: 1.5, whiteSpace: 'normal', borderRadius: 'var(--radius-lg)', marginBottom: 14 }}>
              Since you noted pregnancy/breastfeeding, we've kept every suggestion pregnancy-safe and left out retinoids and stronger acids — your consultant will tailor this further in person.
            </div>
          )}

          <div className="hr" style={{ margin: '16px 0' }} />
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.6 }}>This is a starting point, not a diagnosis. Your consultant will confirm everything at your appointment.</div>
        </div>
        <div style={{ padding: '14px 22px 22px', borderTop: '1px solid var(--color-divider)', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ width: '100%', textDecoration: 'none', boxSizing: 'border-box', textAlign: 'center' }}>Book my consultation</a>
          <button className="btn btn-ghost btn-block" onClick={restart} style={{ width: '100%' }}>Retake the quiz</button>
          <a className="btn btn-ghost btn-block" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ width: '100%', textDecoration: 'none', boxSizing: 'border-box', textAlign: 'center' }}>‹ Back to the app</a>
        </div>
      </div>
    </AppFrame>
  );
}
