import Link from "next/link";

// Root not-found (outside the (site) group). Kept minimal and on-brand.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0b", color: "#ece9e2", fontFamily: "Georgia, serif", display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 120, color: "#1e1e21", lineHeight: 1 }}>404</div>
        <div style={{ fontStyle: "italic", fontSize: 22, color: "#a3a09a" }}>This page does not exist yet.</div>
        <Link href="/" style={{ color: "#c9a86a", letterSpacing: 2, textTransform: "uppercase", fontSize: 12 }}>← Return to the archive</Link>
      </body>
    </html>
  );
}
