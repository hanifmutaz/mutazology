"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/client";

// Client-side auth gate for the admin area. When Supabase is configured it
// requires an authenticated session (and the RLS `is_admin()` check governs
// every write server-side). When Supabase is NOT configured it renders the
// dashboard in read-only demo mode so the route still works after first deploy.
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const supabase = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setReady(true);
    });
  }, [supabase]);

  // Demo mode: no Supabase → show dashboard with a banner.
  if (!supabase) {
    return (
      <>
        <div className="bg-accent/10 border-b border-accent-dim text-accent text-xs text-center py-2 tracking-[0.08em]">
          Demo mode · connect Supabase (env vars) to enable authentication and content editing.
        </div>
        {children}
      </>
    );
  }

  if (!ready) {
    return <div className="wrap py-32 text-center font-serif italic text-ink-faint">Checking session…</div>;
  }

  if (!authed) {
    const signIn = async () => {
      setErr("");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
      else setAuthed(true);
    };
    return (
      <div className="wrap min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="font-serif text-3xl tracking-[0.14em] text-center mb-2"><b>MUTAZ</b>OLOGY</div>
          <div className="font-serif italic text-ink-faint text-center mb-10">the archivist enters.</div>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-line px-4 py-3 outline-none text-ink focus:border-ink-faint" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signIn()}
              className="bg-transparent border border-line px-4 py-3 outline-none text-ink focus:border-ink-faint" />
            {err && <p className="text-[#c98a8a] text-xs">{err}</p>}
            <button onClick={signIn} className="btn btn-solid justify-center mt-2">Enter</button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
