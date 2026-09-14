import { supabase, supabaseConfigured } from './supabase';

// Uploads a File to the shared public `media` bucket under the signed-in
// user's own folder (see storage RLS policies in the migration) and
// returns its public URL. Falls back to a local object URL when Supabase
// isn't configured, so photo pickers still work in an unconfigured preview.
export async function uploadMedia(userId: string, folder: string, file: File): Promise<string> {
  if (!supabaseConfigured) {
    return URL.createObjectURL(file);
  }
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}
