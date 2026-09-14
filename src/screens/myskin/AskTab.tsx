import { useEffect, useState } from 'react';
import { useMemberData } from '../../context/MemberDataContext';
import { useAuth } from '../../context/AuthContext';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { mockAskAnswer } from '../../lib/askMock';
import { ASK_SUGGESTIONS, CONCERNS, SKIN_TYPES } from '../../lib/data';

interface Msg { id: string; role: 'user' | 'assistant'; text: string }

export default function AskTab() {
  const { user } = useAuth();
  const { profile, customProducts, photoItems } = useMemberData();
  const [thread, setThread] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !supabaseConfigured) return;
    supabase.from('ask_messages').select('*').eq('user_id', user.id).order('created_at', { ascending: true })
      .then(({ data }) => setThread((data ?? []).map((m) => ({ id: m.id, role: m.role, text: m.text }))));
  }, [user]);

  const persist = async (role: 'user' | 'assistant', text: string) => {
    if (user && supabaseConfigured) {
      await supabase.from('ask_messages').insert({ user_id: user.id, role, text });
    }
  };

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setThread((prev) => [...prev, { id: 'q' + Date.now(), role: 'user', text: q }]);
    setInput('');
    setLoading(true);
    await persist('user', q);
    const skinTypeName = SKIN_TYPES.find((t) => t.id === profile.skinType)?.name ?? '';
    const answer = mockAskAnswer(q, {
      skinTypeName,
      concernLabels: CONCERNS.filter((c) => profile.concerns.includes(c.id)).map((c) => c.label).concat(profile.customConcerns),
      shelfNames: customProducts.map((p) => p.name).concat(photoItems.filter((p) => p.name).map((p) => p.name)),
      notes: profile.notes,
    });
    await new Promise((r) => setTimeout(r, 500));
    setThread((prev) => [...prev, { id: 'a' + Date.now(), role: 'assistant', text: answer }]);
    await persist('assistant', answer);
    setLoading(false);
  };

  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 6 }}>Ask about your skin</div>
      <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.5, margin: '0 0 10px' }}>
        Answers use your skin type, concerns and products. Guidance, not a diagnosis — for anything that needs to be seen in person, book a consultation.
      </p>
      {thread.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
          {ASK_SUGGESTIONS.map((s) => (
            <div key={s} onClick={() => ask(s)} style={{ cursor: 'pointer', padding: '9px 12px', borderRadius: 999, border: '1.5px solid var(--color-divider)', background: 'var(--color-bg)', fontSize: 11.5, color: 'var(--color-text)' }}>
              {s}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
        {thread.map((m) => (
          <div key={m.id} style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: m.role === 'user' ? 'var(--color-accent-100)' : 'var(--color-neutral-100)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginBottom: 4 }}>
              {m.role === 'user' ? 'You asked' : 'Answer'}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>{m.text}</div>
          </div>
        ))}
      </div>
      {loading && <div style={{ fontSize: 12, color: 'var(--color-accent-700)', fontWeight: 600, marginBottom: 10 }}>Thinking about your profile…</div>}
      <textarea
        className="input" rows={3} placeholder="Ask anything about your skin or routine" value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', marginBottom: 8 }}
      />
      <button className="btn btn-primary btn-block" disabled={loading || !input.trim()} onClick={() => ask(input)} style={{ width: '100%', opacity: loading || !input.trim() ? 0.5 : 1, marginBottom: 20 }}>Ask</button>
    </>
  );
}
