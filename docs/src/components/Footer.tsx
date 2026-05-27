import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-surface-container)",
      borderTop: "1px solid var(--color-outline-variant)",
      padding: "48px 24px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #0C2E76, #6b8cff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "14px",
              }}>
                T
              </div>
              <span style={{ fontWeight: 600, color: "var(--color-on-surface)" }}>
                Toolmetry Developer Web
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", lineHeight: 1.6 }}>
              Comprehensive developer tools library for JavaScript & TypeScript. 18+ utilities, zero dependencies.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: "var(--color-on-surface)", marginBottom: "16px", fontSize: "14px" }}>Documentation</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/docs" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>All Tools</Link>
              <Link href="/docs/base64" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Base64</Link>
              <Link href="/docs/hash" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Hash Generator</Link>
              <Link href="/docs/encrypt" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>AES-256</Link>
              <Link href="/docs/jwt" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>JWT Decoder</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: "var(--color-on-surface)", marginBottom: "16px", fontSize: "14px" }}>Resources</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/playground" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Playground</Link>
              <a href="https://www.npmjs.com/package/toolmetry" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>npm Package</a>
              <a href="https://github.com/toolmetryai/toolmetry-npm" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>GitHub</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: "var(--color-on-surface)", marginBottom: "16px", fontSize: "14px" }}>ToolmetryAI</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="https://toolmetryai.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Main Website</a>
              <a href="https://toolmetry.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Platform</a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid var(--color-outline-variant)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "var(--color-on-surface-variant)" }}>
            © 2025 ToolmetryAI. All rights reserved.
          </p>
          <p style={{ fontSize: "13px", color: "var(--color-on-surface-variant)" }}>
            toolmetry v3.1.0 • MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
