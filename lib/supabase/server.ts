import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Server-side Supabase client.
//  - Anon client for public reads (RLS-guarded).
//  - Service-role client for privileged writes / view counters. NEVER import
//    this into a Client Component or expose the key to the browser.
// ---------------------------------------------------------------------------

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True only when the public credentials are present. */
export const isSupabaseConfigured = Boolean(url && anon);

export function getServerClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function getServiceClient(): SupabaseClient | null {
  if (!url || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}
