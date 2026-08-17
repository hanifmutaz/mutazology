"use client";

import { createBrowserClient } from "@supabase/ssr";

// ---------------------------------------------------------------------------
// Browser Supabase client (anon key only, RLS-guarded). Used by the admin
// login form and client-side interactions. Returns null if not configured.
// ---------------------------------------------------------------------------

export function getBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}
