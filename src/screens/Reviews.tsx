import { useEffect, useMemo, useState } from 'react';
import BackLink from '../components/BackLink';
import { REPORT_REASONS } from '../lib/data';
import { useAuth } from '../context/AuthContext';
import { useMemberData } from '../context/MemberDataContext';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { uploadMedia } from '../lib/media';

interface ReviewRow {
  id: string;
  user_id: string | null;
  name: string;
  rating: number;
  tag: string;
  text: string;
  photo_url: string | null;
  verified: boolean;
  created_at: string;
}

type SortId = 'recent' | 'rating' | 'helpful';

export default function Reviews() {
  const { user } = useAuth();
  const { isMember, photoItems, profile } = useMemberData();

  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [myVotes, setMyVotes] = useState<Set<string>>(new Set());
  const [myReports, setMyReports] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [needsRating, setNeedsRating] = useState(false);
  const [posted, setPosted] = useState(false);
  const [sort, setSort] = useState<SortId>('recent');
  const [photosOnly, setPhotosOnly] = useState(false);
  const [reportingId, setReportingId] = useState<string | null>(null);

  const loadReviews = async () => {
    if (!supabaseConfigured) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    const rows = data ?? [];
    setReviews(rows);

    const ids = rows.map((r) => r.id);
    if (ids.length) {
      const { data: votes } = await supabase.from('review_helpful_votes').select('review_id,user_id').in('review_id', ids);
      const counts: Record<string, number> = {};
      const mine = new Set<string>();
      (votes ?? []).forEach((v) => {
        counts[v.review_id] = (counts[v.review_id] ?? 0) + 1;
        if (user && v.user_id === user.id) mine.add(v.review_id);
      });
      setHelpfulCounts(counts);
      setMyVotes(mine);

      if (user) {
        const { data: reports } = await supabase.from('review_reports').select('review_id').eq('user_id', user.id);
        setMyReports(new Set((reports ?? []).map((r) => r.review_id)));
      }
    }
    setLoading(false);
  };

  useEffect(() => { loadReviews(); }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const ownPhotos = useMemo(() => photoItems.map((p) => p.photoUrl).filter((u): u is string => !!u), [photoItems]);

  const submitReview = async () => {
    if (!rating) { setNeedsRating(true); return; }
    if (!user || !supabaseConfigured) {
      setPosted(true);
      return;
    }
    await supabase.from('reviews').insert({
      user_id: user.id,
      name: profile.name || 'You',
      rating,
      tag: 'Member review',
      text: text.trim(),
      photo_url: photo,
      verified: isMember,
    });
    setRating(0); setText(''); setPhoto(null); setPosted(true);
    loadReviews();
  };

  const onUploadPhoto = async (file: File) => {
    if (!user) { setPhoto(URL.createObjectURL(file)); return; }
    const url = await uploadMedia(user.id, 'reviews', file);
    setPhoto(url);
  };

  const toggleHelpful = async (id: string) => {
    if (!user || !supabaseConfigured) return;
    const voted = myVotes.has(id);
    setMyVotes((prev) => {
      const next = new Set(prev);
      voted ? next.delete(id) : next.add(id);
      return next;
    });
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + (voted ? -1 : 1) }));
    if (voted) {
      await supabase.from('review_helpful_votes').delete().eq('review_id', id).eq('user_id', user.id);
    } else {
      await supabase.from('review_helpful_votes').insert({ review_id: id, user_id: user.id });
    }
  };

  const submitReport = async (reviewId: string, reason: string) => {
    setReportingId(null);
    setMyReports((prev) => new Set(prev).add(reviewId));
    if (user && supabaseConfigured) {
      await supabase.from('review_reports').insert({ review_id: reviewId, user_id: user.id, reason });
    }
  };

  const rows = reviews
    .filter((r) => !photosOnly || !!r.photo_url)
    .slice()
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating || +new Date(b.created_at) - +new Date(a.created_at);
      if (sort === 'helpful') return (helpfulCounts[b.id] ?? 0) - (helpfulCounts[a.id] ?? 0) || +new Date(b.created_at) - +new Date(a.created_at);
      return +new Date(b.created_at) - +new Date(a.created_at);
    });

  const ratingLabel = ['Tap a star to rate', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating] || 'Tap a star to rate';

  return (
    <div className="screen-pad">
      <BackLink to="/more" label="More" />
      <h2 style={{ fontSize: 21, margin: '6px 0 3px' }}>Client Reviews</h2>
      <p style={{ fontSize: 11.5, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)', margin: '0 0 14px' }}>
        Individual results vary. Reviews are clients' own experiences, not medical advice or a promise of outcome.
      </p>

      <div className="card elev-sm" style={{ padding: 13, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Leave a review</div>
        {!user && <p className="muted" style={{ fontSize: 11.5, margin: '0 0 10px' }}>Sign in to post a review under your name.</p>}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginBottom: 5 }}>Your rating (required)</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} onClick={() => { setRating(n); setNeedsRating(false); }} style={{ cursor: 'pointer', fontSize: 26, lineHeight: 1, color: n <= rating ? 'var(--color-accent)' : 'var(--color-divider)' }}>★</span>
          ))}
        </div>
        <div className="muted" style={{ fontSize: 11.5, marginBottom: 10 }}>{ratingLabel}</div>

        <div className="field" style={{ marginBottom: 10 }}>
          <label>Your review (optional)</label>
          <textarea className="input" rows={3} placeholder="What was your experience?" value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }} />
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.03em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginBottom: 6 }}>Add a photo (optional)</div>
        {ownPhotos.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, marginBottom: 7 }}>
              {ownPhotos.map((url) => (
                <div
                  key={url}
                  onClick={() => setPhoto((prev) => (prev === url ? null : url))}
                  style={{
                    width: 54, height: 54, flex: 'none', borderRadius: 12, cursor: 'pointer',
                    backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url("${url}")`,
                    outline: photo === url ? '2.5px solid var(--color-accent)' : 'none', outlineOffset: 2,
                  }}
                />
              ))}
            </div>
            <div className="muted" style={{ fontSize: 10.5, marginBottom: 7 }}>Pick one of your own shelf photos, or upload a different one.</div>
          </>
        )}
        <label className="btn btn-secondary btn-block" style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center', cursor: 'pointer', marginBottom: 10 }}>
          {photo ? 'Photo attached — choose another' : 'Choose a photo from my phone'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) onUploadPhoto(f); }} />
        </label>

        <button className="btn btn-primary btn-block" disabled={!rating} onClick={submitReview} style={{ width: '100%', opacity: rating ? 1 : 0.5 }}>Post review</button>
        {needsRating && <div style={{ fontSize: 11, color: 'var(--color-accent-700)', textAlign: 'center', marginTop: 7 }}>Pick a star rating to post.</div>}
        {posted && <div style={{ fontSize: 11.5, color: 'var(--color-accent-2-700)', fontWeight: 600, textAlign: 'center', marginTop: 7 }}>Thanks — your review is posted.</div>}
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
        {([{ id: 'recent', label: 'Most recent' }, { id: 'rating', label: 'Highest rated' }, { id: 'helpful', label: 'Most helpful' }] as { id: SortId; label: string }[]).map((o) => (
          <div
            key={o.id}
            onClick={() => setSort(o.id)}
            style={{
              cursor: 'pointer', flex: 'none', padding: '6px 13px', borderRadius: 999, whiteSpace: 'nowrap', fontSize: 11.5, fontWeight: 700,
              border: `1.5px solid ${sort === o.id ? 'var(--color-accent)' : 'var(--color-divider)'}`,
              background: sort === o.id ? 'var(--color-accent)' : 'var(--color-bg)',
              color: sort === o.id ? 'var(--color-neutral-100)' : 'var(--color-text)',
            }}
          >
            {o.label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span className="muted" style={{ fontSize: 11.5 }}>{rows.length} {rows.length === 1 ? 'review' : 'reviews'}</span>
        <span
          onClick={() => setPhotosOnly((v) => !v)}
          style={{ cursor: 'pointer', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap', color: photosOnly ? 'var(--color-accent-700)' : 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}
        >
          {photosOnly ? '✓ With photos only' : 'With photos only'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!loading && rows.length === 0 && (
          <div style={{ padding: '18px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 3 }}>No reviews yet</div>
            <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>Be the first to rate your experience.</div>
          </div>
        )}
        {rows.map((r) => {
          const voted = myVotes.has(r.id);
          const reported = myReports.has(r.id);
          const reporting = reportingId === r.id;
          const stars = '★★★★★'.slice(0, r.rating) + '☆☆☆☆☆'.slice(0, 5 - r.rating);
          const date = new Date(r.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
          return (
            <div key={r.id} className="card elev-sm" style={{ padding: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text)' }}>{r.name}</span>
                <span style={{ fontSize: 12, color: 'var(--color-accent-2-700)', letterSpacing: 1, flex: 'none' }}>{stars}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, margin: '3px 0 7px' }}>
                <span className="muted" style={{ fontSize: 11.5 }}>{r.tag} · {date}</span>
                {r.verified && <span className="tag tag-accent-2" style={{ fontSize: 10 }}>Verified subscriber</span>}
              </div>
              {r.photo_url && (
                <div style={{ width: '100%', height: 150, borderRadius: 12, marginBottom: 9, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url("${r.photo_url}")` }} />
              )}
              <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--color-text)', margin: 0 }}>{r.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginTop: 9 }}>
                <span
                  onClick={() => toggleHelpful(r.id)}
                  style={{ cursor: 'pointer', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap', color: voted ? 'var(--color-accent-700)' : 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}
                >
                  Helpful ({helpfulCounts[r.id] ?? 0})
                </span>
                <span
                  onClick={() => setReportingId(reporting ? null : r.id)}
                  style={{ cursor: 'pointer', fontSize: 11, whiteSpace: 'nowrap', color: 'color-mix(in srgb, var(--color-text) 50%, transparent)' }}
                >
                  {reporting ? 'Cancel' : 'Report'}
                </span>
              </div>
              {reporting && (
                <div style={{ marginTop: 9, padding: '11px 12px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>Why are you reporting this?</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {REPORT_REASONS.map((rr) => (
                      <div key={rr.id} onClick={() => submitReport(r.id, rr.id)} style={{ cursor: 'pointer', padding: '8px 11px', borderRadius: 999, border: '1.5px solid var(--color-divider)', background: 'var(--color-bg)', fontSize: 11.5, color: 'var(--color-text)' }}>
                        {rr.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {reported && <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-accent-2-700)', fontWeight: 600 }}>Reported — we'll review it and remove anything that breaks the rules.</div>}
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 10.5, lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', margin: '14px 0 0' }}>
        Reviews that make medical claims, name prescription treatments as cures, or promise results are removed. Report anything that looks like medical advice and we'll take it down.
      </p>
    </div>
  );
}
