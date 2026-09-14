import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

// When Supabase hasn't been configured yet (no .env set up), we still want
// the app to render so the UI/UX can be reviewed — every call site checks
// `supabaseConfigured` before touching the network and falls back to local
// component state instead of throwing.
export const supabase = supabaseConfigured
  ? createClient(url as string, anonKey as string)
  : (null as unknown as ReturnType<typeof createClient>);
