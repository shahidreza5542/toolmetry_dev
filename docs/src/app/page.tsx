import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { tools } from "../lib/tools-data";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <Navbar />

      <section style={{
        padding: "120px 24px 80px",
        textAlign: "center",
        background: "linear-gradient(180deg, #0C2E76 0%, #1e3a8a 40%, var(--color-surface) 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#fff",
            marginBottom: "28px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            v3.1.0 — ESM + CJS Dual Module • Zero Dependencies • 18 Utilities
          </div>

          <h1 style={{ fontSize: "52px", fontWeight: 800, lineHeight: 1.1, marginBottom: "24px", color: "#fff", letterSpacing: "-0.03em" }}>
            Build Faster with{" "}
            <span style={{ background: "linear-gradient(135deg, #6b8cff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Toolmetry
            </span>
          </h1>

          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 36px" }}>
            A comprehensive developer tools library for JavaScript & TypeScript.
            18+ utilities — Base64, hashing, JWT, UUID, AES-256, random generation, and more.
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "14px 24px",
            marginBottom: "36px",
          }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>$</span>
            <code style={{ color: "#a6e3a1", fontSize: "15px", fontFamily: "var(--font-mono)", fontWeight: 500 }}>npm i toolmetry</code>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/docs" style={{
              padding: "12px 28px",
              borderRadius: "10px",
              background: "#fff",
              color: "#0C2E76",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}>
              Read Docs
            </Link>
            <Link href="/playground" style={{
              padding: "12px 28px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              backdropFilter: "blur(8px)",
            }}>
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", textAlign: "center", letterSpacing: "-0.03em" }}>Quick Start</h2>
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: "13px", lineHeight: 1.8 }}>{`// CommonJS
const toolmetry = require('toolmetry');

// ES Modules (recommended)
import toolmetry from 'toolmetry';
import { base64Encode, uuidV4, hashGenerate } from 'toolmetry';

// Base64
const encoded = base64Encode('Hello!');
const decoded = toolmetry.base64Decode(encoded);

// UUID
const id = toolmetry.uuidV4();

// Hash (MD5, SHA-1, SHA-256, SHA-384, SHA-512)
const hash = toolmetry.hashGenerate('hello world');

// AES-256 Encrypt/Decrypt
const encrypted = toolmetry.aesEncrypt('Secret', 'password');
const decrypted = toolmetry.aesDecrypt(encrypted, 'password');

// Random Generator
const str = toolmetry.randomString(16);
const num = toolmetry.randomInt(1, 100);`}</pre>
        </div>
      </section>

      <section style={{ padding: "40px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "32px", textAlign: "center", letterSpacing: "-0.03em" }}>
          {tools.length} Developer Tools, One Package
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/docs/${tool.slug}`}
              style={{
                display: "block",
                padding: "20px",
                borderRadius: "12px",
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "6px",
                background: "var(--color-secondary-container)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-primary)",
                marginBottom: "10px",
              }}>
                {tool.category}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-on-surface)", marginBottom: "6px" }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--color-on-surface-variant)", lineHeight: 1.5 }}>
                {tool.description.slice(0, 90)}{tool.description.length > 90 ? "..." : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
