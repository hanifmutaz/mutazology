import Link from "next/link";
import { getStats, getThoughts } from "@/lib/queries";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import AdminGate from "./AdminGate";

// The admin dashboard. In production it is protected by AdminGate (Supabase
// Auth) + Row Level Security at the database layer. This preview renders the
// shell and real aggregate numbers from the data layer.
export default async function AdminDashboard() {
  const [stats, thoughts] = await Promise.all([getStats(), getThoughts()]);
  const top = [...thoughts].sort((a, b) => b.views - a.views).slice(0, 5);

  const nav = ["Dashboard", "Thoughts", "Reflections", "Observations", "Principles", "Categories", "Tags", "Media", "Analytics", "Settings"];

  return (
    <AdminGate>
      <div className="wrap py-16">
        <div className="font-mono text-xs text-accent tracking-[0.1em] mb-4">
          /admin · {isSupabaseConfigured ? "Supabase Auth active" : "demo mode — connect Supabase to enable auth + CRUD"}
        </div>
        <h1 className="font-serif text-[clamp(36px,6vw,60px)] leading-none">Dashboard</h1>

        <div className="flex gap-2 flex-wrap mt-8 mb-12">
          {nav.map((n) => (
            <span key={n} className={`chip ${n === "Dashboard" ? "chip-on" : ""}`}>{n}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-line-soft border border-line-soft mb-10">
          {[
            ["Thoughts", stats.thoughts], ["Reflections", stats.reflections],
            ["Observations", stats.observations], ["Principles", stats.principles],
            ["Total views", stats.totalViews],
          ].map(([l, n]) => (
            <div key={l} className="bg-bg" style={{ padding: "38px 26px" }}>
              <div className="font-serif text-[clamp(30px,5vw,52px)] leading-none">{n}</div>
              <div className="text-[11px] tracking-[0.16em] uppercase text-ink-faint mt-3.5">{l}</div>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl mb-5">Most viewed</h2>
        <div className="flex flex-col gap-px bg-line-soft border border-line-soft">
          {top.map((t) => (
            <Link key={t.slug} href={`/thoughts/${t.slug}`} className="bg-bg hover:bg-bg-soft transition-colors flex justify-between items-center" style={{ padding: "22px 30px" }}>
              <span className="font-serif text-xl">{t.title}</span>
              <span className="font-mono text-accent">{t.views}</span>
            </Link>
          ))}
        </div>

        <p className="text-ink-faint mt-10 text-[13px] max-w-2xl">
          Full CRUD (create / edit / publish / draft / archive / feature / schedule), Media, Categories,
          Tags, Analytics and Settings are defined in <code className="text-ink-dim">schema.sql</code> and
          wired to Supabase. Writes are protected by RLS — only the administrator in <code className="text-ink-dim">app_admins</code> can mutate content.
        </p>
      </div>
    </AdminGate>
  );
}
