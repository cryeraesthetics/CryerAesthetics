import { useState } from 'react';
import BackLink from '../../components/BackLink';
import PhotoUpload from '../../components/PhotoUpload';
import { useMemberData } from '../../context/MemberDataContext';
import { useAuth } from '../../context/AuthContext';
import { SYMPTOMS } from '../../lib/data';

const EMPTY_SYMPTOMS = { dryness: 0, redness: 0, breakouts: 0, oiliness: 0 };

function DotScale({ value, onSelect, size = 20 }: { value: number; onSelect: (v: number) => void; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: size < 18 ? 5 : 6 }}>
      {[0, 1, 2, 3, 4].map((v) => (
        <div
          key={v}
          onClick={() => onSelect(v)}
          style={{ width: size, height: size, borderRadius: '50%', cursor: 'pointer', background: v <= value ? 'var(--color-accent-2-700)' : 'var(--color-divider)' }}
        />
      ))}
    </div>
  );
}

export default function Diary() {
  const { user } = useAuth();
  const { diary, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry, uploadUserMedia } = useMemberData();
  const [note, setNote] = useState('');
  const [symptoms, setSymptoms] = useState({ ...EMPTY_SYMPTOMS });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = async () => {
    await addDiaryEntry({ note, symptoms, photoUrl });
    setNote(''); setSymptoms({ ...EMPTY_SYMPTOMS }); setPhotoUrl(null);
  };

  const onUploadNew = async (file: File) => {
    const url = user ? await uploadUserMedia('diary', file) : URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  return (
    <div className="screen-pad">
      <BackLink to="/me" label="My Skin" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Skin Diary</h2>
      <p className="muted" style={{ fontSize: 12.5, margin: '0 0 16px' }}>{diary.length} entries logged. Same light, same angle, once a week works best.</p>

      <div style={{ padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', marginBottom: 20 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 9 }}>New entry</div>
        <PhotoUpload label="Drop today's progress photo" radius={14} style={{ width: '100%', height: 150 }} photoUrl={photoUrl} onFile={onUploadNew} />
        <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {SYMPTOMS.map((sy) => (
            <div key={sy.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{sy.label}</span>
              <DotScale value={symptoms[sy.id]} onSelect={(v) => setSymptoms((s) => ({ ...s, [sy.id]: v }))} />
            </div>
          ))}
        </div>
        <div className="field" style={{ margin: '12px 0 10px' }}>
          <label>Notes</label>
          <textarea className="input" rows={3} placeholder="How does your skin feel today?" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button className="btn btn-primary btn-block" onClick={save} style={{ width: '100%' }}>Save entry</button>
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 8 }}>Timeline</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {diary.length === 0 && (
          <div style={{ padding: '18px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 3 }}>No entries yet</div>
            <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>Save your first entry above to start your timeline.</div>
          </div>
        )}
        {diary.map((en) => {
          const editing = editingId === en.id;
          const summary = SYMPTOMS.map((sy) => `${sy.label} ${en.symptoms[sy.id] || 0}/4`).join(' · ');
          return (
            <div key={en.id} className="card elev-sm" style={{ padding: 12, display: 'flex', gap: 12 }}>
              {en.photoUrl ? (
                <div style={{ width: 74, height: 92, flex: 'none', borderRadius: 12, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url("${en.photoUrl}")` }} />
              ) : (
                <div className="image-slot" style={{ width: 74, height: 92, borderRadius: 12, flex: 'none' }}>Progress photo</div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  {!editing && <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)' }}>{en.date}</div>}
                  <span onClick={() => setEditingId(editing ? null : en.id)} style={{ cursor: 'pointer', fontSize: 11, fontWeight: 700, color: 'var(--color-accent-700)', flex: 'none' }}>{editing ? 'Done' : 'Edit'}</span>
                </div>
                {!editing && (
                  <>
                    <div className="muted" style={{ fontSize: 10.5, margin: '2px 0 5px' }}>{summary}</div>
                    <p style={{ fontSize: 11.5, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', margin: 0 }}>{en.note}</p>
                  </>
                )}
                {editing && (
                  <>
                    <input
                      className="input" type="text" placeholder="Date" value={en.date}
                      onChange={(e) => updateDiaryEntry(en.id, { date: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px', fontSize: 12, margin: '4px 0 8px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                      {SYMPTOMS.map((sy) => (
                        <div key={sy.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="muted" style={{ fontSize: 11, width: 64, flex: 'none' }}>{sy.label}</span>
                          <DotScale
                            size={15}
                            value={en.symptoms[sy.id] || 0}
                            onSelect={(v) => updateDiaryEntry(en.id, { symptoms: { ...en.symptoms, [sy.id]: v } })}
                          />
                        </div>
                      ))}
                    </div>
                    <textarea
                      className="input" rows={3} placeholder="How did your skin feel?" value={en.note}
                      onChange={(e) => updateDiaryEntry(en.id, { note: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontSize: 12 }}
                    />
                    <div onClick={() => deleteDiaryEntry(en.id)} style={{ cursor: 'pointer', fontSize: 11, fontWeight: 700, color: 'var(--color-accent-700)', marginTop: 8 }}>Delete this entry</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
