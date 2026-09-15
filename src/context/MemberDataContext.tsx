import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { uploadMedia } from '../lib/media';
import { mockReadLabel } from '../lib/labelMock';

export interface ProfileState {
  name: string;
  skinType: string | null;
  concerns: string[];
  customConcerns: string[];
  notes: string;
  amTime: string;
  pmTime: string;
  remindAm: boolean;
  remindPm: boolean;
  pushOn: boolean;
}

const DEFAULT_PROFILE: ProfileState = {
  name: '', skinType: null, concerns: [], customConcerns: [], notes: '',
  amTime: '07:30', pmTime: '21:30', remindAm: false, remindPm: false, pushOn: false,
};

export interface ShelfCustomItem { id: string; name: string }
export interface ShelfPhotoItem { id: string; name: string; photoUrl: string | null; reading: boolean; failed: boolean }
export interface DiaryEntry {
  id: string;
  date: string;
  note: string;
  symptoms: { dryness: number; redness: number; breakouts: number; oiliness: number };
  photoUrl: string | null;
}

interface MemberDataValue {
  ready: boolean;
  profile: ProfileState;
  subscriptionPlan: 'monthly' | 'annual' | null;
  isMember: boolean;
  isPro: boolean;
  previewAsMember: boolean;
  setPreviewAsMember: (v: boolean) => void;
  setProfileFields: (patch: Partial<ProfileState>) => void;
  toggleConcern: (id: string) => void;
  addCustomConcern: (v: string) => void;
  removeCustomConcern: (v: string) => void;
  shelfPresetIds: string[];
  toggleShelfPreset: (id: string) => void;
  customProducts: ShelfCustomItem[];
  addCustomProduct: (name: string) => void;
  removeCustomProduct: (id: string) => void;
  photoItems: ShelfPhotoItem[];
  addPhotoProduct: (file: File) => Promise<void>;
  renamePhotoProduct: (id: string, name: string) => void;
  removePhotoProduct: (id: string) => void;
  activateSubscription: (plan: 'monthly' | 'annual') => Promise<void>;
  refreshSubscription: () => Promise<'monthly' | 'annual' | null>;
  diary: DiaryEntry[];
  addDiaryEntry: (entry: { note: string; symptoms: DiaryEntry['symptoms']; photoUrl: string | null }) => Promise<void>;
  updateDiaryEntry: (id: string, patch: Partial<Pick<DiaryEntry, 'date' | 'note' | 'symptoms'>>) => void;
  deleteDiaryEntry: (id: string) => void;
  uploadUserMedia: (folder: string, file: File) => Promise<string>;
  locationState: 'off' | 'pending' | 'denied' | 'on';
  requestLocation: () => void;
}

const MemberDataContext = createContext<MemberDataValue | null>(null);

export function MemberDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<ProfileState>(DEFAULT_PROFILE);
  const [subscriptionPlan, setSubscriptionPlan] = useState<'monthly' | 'annual' | null>(null);
  const [shelfPresetIds, setShelfPresetIds] = useState<string[]>([]);
  const [customProducts, setCustomProducts] = useState<ShelfCustomItem[]>([]);
  const [photoItems, setPhotoItems] = useState<ShelfPhotoItem[]>([]);
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [previewAsMember, setPreviewAsMember] = useState(false);
  const [locationState, setLocationState] = useState<'off' | 'pending' | 'denied' | 'on'>('off');

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) { setLocationState('denied'); return; }
    setLocationState('pending');
    navigator.geolocation.getCurrentPosition(
      () => setLocationState('on'),
      () => setLocationState('denied'),
      { timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user || !supabaseConfigured) {
        setProfile(DEFAULT_PROFILE);
        setSubscriptionPlan(null);
        setShelfPresetIds([]);
        setCustomProducts([]);
        setPhotoItems([]);
        setDiary([]);
        setReady(true);
        return;
      }
      setReady(false);
      const [profileRes, subRes, shelfRes, diaryRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('shelf_items').select('*').eq('user_id', user.id),
        supabase.from('diary_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);
      if (cancelled) return;

      if (profileRes.data) {
        const p = profileRes.data;
        setProfile({
          name: p.name ?? '', skinType: p.skin_type ?? null, concerns: p.concerns ?? [],
          customConcerns: p.custom_concerns ?? [], notes: p.notes ?? '',
          amTime: p.am_time ?? '07:30', pmTime: p.pm_time ?? '21:30',
          remindAm: !!p.remind_am, remindPm: !!p.remind_pm, pushOn: !!p.push_on,
        });
      } else {
        await supabase.from('profiles').insert({ user_id: user.id });
        setProfile(DEFAULT_PROFILE);
      }

      setSubscriptionPlan(subRes.data?.status === 'active' ? subRes.data.plan : null);

      const shelfRows = shelfRes.data ?? [];
      setShelfPresetIds(shelfRows.filter((r) => r.kind === 'preset').map((r) => r.ref_id as string));
      setCustomProducts(shelfRows.filter((r) => r.kind === 'custom').map((r) => ({ id: r.id, name: r.name })));
      setPhotoItems(
        shelfRows.filter((r) => r.kind === 'photo').map((r) => ({ id: r.id, name: r.name, photoUrl: r.photo_url, reading: !!r.reading, failed: false })),
      );

      setDiary(
        (diaryRes.data ?? []).map((r) => ({
          id: r.id, date: r.entry_date, note: r.note,
          symptoms: r.symptoms ?? { dryness: 0, redness: 0, breakouts: 0, oiliness: 0 },
          photoUrl: r.photo_url,
        })),
      );
      setReady(true);
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  const persistProfile = useCallback((next: ProfileState) => {
    if (!user || !supabaseConfigured) return;
    supabase.from('profiles').upsert({
      user_id: user.id, name: next.name, skin_type: next.skinType, concerns: next.concerns,
      custom_concerns: next.customConcerns, notes: next.notes, am_time: next.amTime, pm_time: next.pmTime,
      remind_am: next.remindAm, remind_pm: next.remindPm, push_on: next.pushOn, updated_at: new Date().toISOString(),
    }).then(({ error }) => { if (error) console.warn('profile save failed', error.message); });
  }, [user]);

  const setProfileFields = useCallback((patch: Partial<ProfileState>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      persistProfile(next);
      return next;
    });
  }, [persistProfile]);

  const toggleConcern = useCallback((id: string) => {
    setProfile((prev) => {
      const has = prev.concerns.includes(id);
      const next = { ...prev, concerns: has ? prev.concerns.filter((c) => c !== id) : [...prev.concerns, id] };
      persistProfile(next);
      return next;
    });
  }, [persistProfile]);

  const addCustomConcern = useCallback((v: string) => {
    const value = v.trim();
    if (!value) return;
    setProfile((prev) => {
      if (prev.customConcerns.includes(value)) return prev;
      const next = { ...prev, customConcerns: [...prev.customConcerns, value] };
      persistProfile(next);
      return next;
    });
  }, [persistProfile]);

  const removeCustomConcern = useCallback((v: string) => {
    setProfile((prev) => {
      const next = { ...prev, customConcerns: prev.customConcerns.filter((c) => c !== v) };
      persistProfile(next);
      return next;
    });
  }, [persistProfile]);

  const toggleShelfPreset = useCallback((id: string) => {
    setShelfPresetIds((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      if (user && supabaseConfigured) {
        if (has) {
          supabase.from('shelf_items').delete().eq('user_id', user.id).eq('kind', 'preset').eq('ref_id', id).then();
        } else {
          supabase.from('shelf_items').insert({ user_id: user.id, kind: 'preset', ref_id: id, name: id }).then();
        }
      }
      return next;
    });
  }, [user]);

  const addCustomProduct = useCallback((name: string) => {
    const value = name.trim();
    if (!value) return;
    if (!user || !supabaseConfigured) {
      setCustomProducts((prev) => [...prev, { id: 'local-' + Date.now(), name: value }]);
      return;
    }
    supabase.from('shelf_items').insert({ user_id: user.id, kind: 'custom', name: value }).select().single()
      .then(({ data, error }) => {
        if (error || !data) { console.warn('add product failed', error?.message); return; }
        setCustomProducts((prev) => [...prev, { id: data.id, name: data.name }]);
      });
  }, [user]);

  const removeCustomProduct = useCallback((id: string) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
    if (user && supabaseConfigured) supabase.from('shelf_items').delete().eq('id', id).then();
  }, [user]);

  const addPhotoProduct = useCallback(async (file: File) => {
    const tempId = 'temp-' + Date.now();
    setPhotoItems((prev) => [...prev, { id: tempId, name: '', photoUrl: null, reading: true, failed: false }]);
    try {
      const photoUrl = user ? await uploadMedia(user.id, 'shelf', file) : URL.createObjectURL(file);
      const { name, failed } = await mockReadLabel();
      if (user && supabaseConfigured) {
        const { data } = await supabase.from('shelf_items').insert({
          user_id: user.id, kind: 'photo', name, photo_url: photoUrl, reading: false,
        }).select().single();
        setPhotoItems((prev) => prev.map((p) => (p.id === tempId ? { id: data?.id ?? tempId, name, photoUrl, reading: false, failed } : p)));
      } else {
        setPhotoItems((prev) => prev.map((p) => (p.id === tempId ? { ...p, name, photoUrl, reading: false, failed } : p)));
      }
    } catch (err) {
      setPhotoItems((prev) => prev.map((p) => (p.id === tempId ? { ...p, reading: false, failed: true } : p)));
    }
  }, [user]);

  const renamePhotoProduct = useCallback((id: string, name: string) => {
    setPhotoItems((prev) => prev.map((p) => (p.id === id ? { ...p, name, failed: false } : p)));
    if (user && supabaseConfigured) supabase.from('shelf_items').update({ name }).eq('id', id).then();
  }, [user]);

  const removePhotoProduct = useCallback((id: string) => {
    setPhotoItems((prev) => prev.filter((p) => p.id !== id));
    if (user && supabaseConfigured) supabase.from('shelf_items').delete().eq('id', id).then();
  }, [user]);

  const activateSubscription = useCallback(async (plan: 'monthly' | 'annual') => {
    setSubscriptionPlan(plan);
    if (user && supabaseConfigured) {
      await supabase.from('subscriptions').upsert({
        user_id: user.id, plan, status: 'active', updated_at: new Date().toISOString(),
      });
    }
  }, [user]);

  const refreshSubscription = useCallback(async () => {
    if (!user || !supabaseConfigured) return subscriptionPlan;
    const { data } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle();
    const plan = data?.status === 'active' ? (data.plan as 'monthly' | 'annual') : null;
    setSubscriptionPlan(plan);
    return plan;
  }, [user, subscriptionPlan]);

  const addDiaryEntry = useCallback(async (entry: { note: string; symptoms: DiaryEntry['symptoms']; photoUrl: string | null }) => {
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (user && supabaseConfigured) {
      const { data } = await supabase.from('diary_entries').insert({
        user_id: user.id, entry_date: date, note: entry.note || 'No notes for this entry.',
        symptoms: entry.symptoms, photo_url: entry.photoUrl,
      }).select().single();
      if (data) {
        setDiary((prev) => [{ id: data.id, date: data.entry_date, note: data.note, symptoms: data.symptoms, photoUrl: data.photo_url }, ...prev]);
      }
    } else {
      setDiary((prev) => [{ id: 'local-' + Date.now(), date, note: entry.note || 'No notes for this entry.', symptoms: entry.symptoms, photoUrl: entry.photoUrl }, ...prev]);
    }
  }, [user]);

  const updateDiaryEntry = useCallback((id: string, patch: Partial<Pick<DiaryEntry, 'date' | 'note' | 'symptoms'>>) => {
    setDiary((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    if (user && supabaseConfigured) {
      const dbPatch: Record<string, unknown> = {};
      if (patch.date !== undefined) dbPatch.entry_date = patch.date;
      if (patch.note !== undefined) dbPatch.note = patch.note;
      if (patch.symptoms !== undefined) dbPatch.symptoms = patch.symptoms;
      supabase.from('diary_entries').update(dbPatch).eq('id', id).then();
    }
  }, [user]);

  const deleteDiaryEntry = useCallback((id: string) => {
    setDiary((prev) => prev.filter((e) => e.id !== id));
    if (user && supabaseConfigured) supabase.from('diary_entries').delete().eq('id', id).then();
  }, [user]);

  const uploadUserMedia = useCallback(async (folder: string, file: File) => {
    if (!user) return URL.createObjectURL(file);
    return uploadMedia(user.id, folder, file);
  }, [user]);

  const isMember = previewAsMember || subscriptionPlan !== null;
  const isPro = previewAsMember || subscriptionPlan === 'annual';

  const value = useMemo<MemberDataValue>(() => ({
    ready, profile, subscriptionPlan, isMember, isPro, previewAsMember, setPreviewAsMember,
    setProfileFields, toggleConcern, addCustomConcern, removeCustomConcern,
    shelfPresetIds, toggleShelfPreset, customProducts, addCustomProduct, removeCustomProduct,
    photoItems, addPhotoProduct, renamePhotoProduct, removePhotoProduct,
    activateSubscription, refreshSubscription, diary, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry, uploadUserMedia,
    locationState, requestLocation,
  }), [ready, profile, subscriptionPlan, isMember, isPro, previewAsMember, setProfileFields, toggleConcern,
    addCustomConcern, removeCustomConcern, shelfPresetIds, toggleShelfPreset, customProducts, addCustomProduct,
    removeCustomProduct, photoItems, addPhotoProduct, renamePhotoProduct, removePhotoProduct,
    activateSubscription, refreshSubscription, diary, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry, uploadUserMedia,
    locationState, requestLocation]);

  return <MemberDataContext.Provider value={value}>{children}</MemberDataContext.Provider>;
}

export function useMemberData() {
  const ctx = useContext(MemberDataContext);
  if (!ctx) throw new Error('useMemberData must be used within MemberDataProvider');
  return ctx;
}
