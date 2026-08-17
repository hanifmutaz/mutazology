import { NextResponse, type NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Edge middleware. Adds baseline security headers site-wide. The admin area is
// additionally guarded client-side (AdminGate) and, decisively, by Supabase
// Row Level Security on every mutation. When you wire full SSR auth, refresh
// the Supabase session cookie here with @supabase/ssr.
// ---------------------------------------------------------------------------
export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/og).*)"],
};
