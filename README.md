# MUTAZOLOGY

### *the study of a mind in progress.*

A dark, editorial **personal philosophy archive** — thoughts, reflections, observations and principles, built so the old ideas are allowed to be wrong. Not a quote website. Someone's archive of thought.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres / Auth / Storage) · Framer Motion-ready · Vercel.

---

## ✨ Key idea: it deploys and works *immediately*

The data layer (`lib/queries.ts`) tries **Supabase first**, and transparently **falls back to bundled seed content** (`lib/data/seed.ts`) when no Supabase credentials are present. So:

- Push to GitHub → import to Vercel → **it's live with full content**, zero config.
- Add Supabase env vars later → it **switches to your live database** with no code change.

---

## 🚀 Deploy to Vercel (fastest path)

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "MUTAZOLOGY"
   git branch -M main
   git remote add origin https://github.com/<you>/mutazology.git
   git push -u origin main
   ```
2. **Import on Vercel** → New Project → pick the repo → framework auto-detects **Next.js** → **Deploy**.
   It builds and goes live on a `*.vercel.app` URL with the seed archive.
3. **Point your domain** (`mutazology.com`) at Vercel in Project → Settings → Domains.

That's it for a working site. Continue below to make it a real CMS.

---

## 🗄️ Connect Supabase (live database + admin)

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste and run `supabase/schema.sql`, then `supabase/seed.sql`.
3. **Auth** → enable Email provider → create your admin user (Add user).
4. Get your admin's UID (Auth → Users) and run:
   ```sql
   insert into app_admins (user_id) values ('<your-auth-user-uuid>');
   ```
5. Add these env vars in **Vercel → Settings → Environment Variables** (and `.env.local` for local dev):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # SERVER ONLY
   NEXT_PUBLIC_SITE_URL=https://mutazology.com
   ```
6. Redeploy. The site now reads from Postgres; `/admin` requires login.

> **Security:** `SUPABASE_SERVICE_ROLE_KEY` is never imported into a client component. Every write is governed by **Row Level Security** — only the UID in `app_admins` can mutate content. `anon` can only read `status = 'published'`.

---

## 🧑‍💻 Local development

```bash
npm install
cp .env.example .env.local     # optional — omit to run on seed content
npm run dev                    # http://localhost:3000
npm run build                  # production build
npm run typecheck              # tsc --noEmit
```

---

## 🗂️ Project structure

```
app/
  (site)/            public site — home, thoughts, reflections, observations,
                     principles, timeline, + reader routes, loading/error/404
  admin/             protected dashboard (AdminGate + Supabase Auth)
  api/og/            dynamic Open Graph image (edge)
  sitemap.ts robots.ts
components/          ui · content · reader · search · layout
lib/
  supabase/          server (anon + service-role) · client (browser)
  data/seed.ts       bundled fallback content
  queries.ts         data access (Supabase → seed fallback)
  utils.ts
types/               domain types (no `any`)
supabase/            schema.sql · seed.sql
```

---

## 🧭 Features

- **Thoughts / Reflections / Observations / Principles** — four content kinds, each with archive + detail routes and SEO-friendly slugs.
- **Timeline** — the archive read chronologically (year → month). The signature view.
- **Evolution** — linked thoughts showing how one idea changed over years.
- **Give Me a Thought** — an intentional random reveal (not a slot machine).
- **⌘K global search** — across title, body, category, mood, tags; distinguishes kinds.
- **Dynamic OG cards** — beautiful share previews per item (`/api/og`).
- **Admin** — dashboard + auth; full CRUD schema wired to Supabase.
- **A11y & perf** — semantic HTML, keyboard nav, focus states, `prefers-reduced-motion`, RSC by default, `next/font`, `next/image`.

---

## 🔧 Adding content once Supabase is connected

Insert rows into `thoughts` / `reflections` / `observations` / `principles`
(status `draft` → `published`), or extend `app/admin/[resource]` with the CRUD
editors — the schema, RLS and types are already in place. No source edits
needed to publish a new Thought.

---

## 🎨 Design tokens

Deep near-black `#0a0a0b` · warm off-white `#ece9e2` · sparing ivory-gold accent
`#c9a86a` · **Fraunces** (serif) + **Inter** (sans) + **JetBrains Mono**. Hairline
borders, subtle grain, restrained motion. The writing is the hero.

---

*"I am not documenting what I know. I am documenting what I am becoming."*
