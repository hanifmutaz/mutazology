import { ImageResponse } from "next/og";

export const runtime = "edge";

// ---------------------------------------------------------------------------
// Dynamic Open Graph image. Called from generateMetadata on each content page.
//   /api/og?title=...&excerpt=...&kind=Thought
// Produces a 1200×630 dark editorial card: MUTAZOLOGY · title · excerpt · Mutaz
// ---------------------------------------------------------------------------
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "MUTAZOLOGY").slice(0, 120);
  const excerpt = (searchParams.get("excerpt") ?? "").slice(0, 160);
  const kind = searchParams.get("kind") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: "#0a0a0b", color: "#ece9e2",
          padding: "72px", fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#ece9e2" }}>MUTAZOLOGY</div>
          <div style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#c9a86a" }}>{kind}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>{title}</div>
          {excerpt && (
            <div style={{ fontSize: 28, color: "#a3a09a", marginTop: 28, maxWidth: 920, lineHeight: 1.4 }}>{excerpt}</div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, fontStyle: "italic", color: "#6b6862" }}>the study of a mind in progress.</div>
          <div style={{ fontSize: 22, color: "#c9a86a" }}>— Mutaz</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
