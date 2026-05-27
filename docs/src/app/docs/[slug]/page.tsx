"use client";

import { use } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar";
import CodeBlock from "../../../components/CodeBlock";
import TryItPanel from "../../../components/TryItPanel";
import Link from "next/link";
import { getToolBySlug, tools } from "../../../lib/tools-data";

export default function ToolDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-surface)", paddingTop: "120px", textAlign: "center" }}>
        <Navbar />
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>Tool Not Found</h1>
        <p style={{ color: "var(--color-on-surface-variant)", marginBottom: "24px" }}>The tool &quot;{slug}&quot; does not exist.</p>
        <Link href="/docs" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Back to Docs</Link>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <Navbar />
      <div style={{ display: "flex", paddingTop: "72px" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: "900px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", fontSize: "13px" }}>
            <Link href="/docs" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Docs</Link>
            <span style={{ color: "var(--color-outline)" }}>/</span>
            <span style={{ color: "var(--color-on-surface-variant)" }}>{tool.category}</span>
            <span style={{ color: "var(--color-outline)" }}>/</span>
            <span style={{ color: "var(--color-on-surface)", fontWeight: 500 }}>{tool.name}</span>
          </div>

          <div style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "6px",
            background: "var(--color-secondary-container)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-primary)",
            marginBottom: "12px",
          }}>
            {tool.category}
          </div>

          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px", letterSpacing: "-0.03em" }}>{tool.name}</h1>
          <p style={{ fontSize: "15px", color: "var(--color-on-surface-variant)", lineHeight: 1.7, marginBottom: "32px" }}>
            {tool.description}
          </p>

          <div style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ fontSize: "13px", color: "var(--color-outline)", fontFamily: "var(--font-mono)" }}>$</span>
            <code style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--color-primary)", fontWeight: 500 }}>npm i toolmetry</code>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>Functions</h2>
          <div style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "32px",
            border: "1px solid var(--color-outline-variant)",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--color-secondary-container)" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "var(--color-primary)" }}>Function</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "var(--color-primary)" }}>Params</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "var(--color-primary)" }}>Returns</th>
                </tr>
              </thead>
              <tbody>
                {tool.functions.map((fn, i) => (
                  <tr key={i} style={{ borderBottom: i < tool.functions.length - 1 ? "1px solid var(--color-outline-variant)" : "none" }}>
                    <td style={{ padding: "10px 14px", fontSize: "13px", fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--color-primary)" }}>{fn.name}</td>
                    <td style={{ padding: "10px 14px", fontSize: "12px", color: "var(--color-on-surface-variant)" }}>
                      {fn.params.map(p => (
                        <span key={p.name} style={{ marginRight: "6px" }}>
                          {p.required ? <b>{p.name}</b> : <span>{p.name}?</span>}
                          <span style={{ color: "var(--color-outline)", marginLeft: "2px" }}>:{p.type}</span>
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: "12px", color: "var(--color-on-surface-variant)", fontFamily: "var(--font-mono)" }}>{fn.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>Examples</h2>
          {tool.examples.map((ex, i) => (
            <div key={i} style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--color-on-surface-variant)" }}>{ex.title}</h3>
              <CodeBlock code={ex.code} language="javascript" />
            </div>
          ))}

          <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>Try It Live</h2>
          <TryItPanel toolName={tool.slug} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
