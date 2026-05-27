"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { useState } from "react";
import { tools, categories } from "../../lib/tools-data";

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = tools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <Navbar />
      <div style={{ display: "flex", paddingTop: "72px" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: "900px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.03em" }}>Documentation</h1>
          <p style={{ fontSize: "15px", color: "var(--color-on-surface-variant)", marginBottom: "28px" }}>
            Explore all 18 utility modules in the toolmetry package.
          </p>

          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid var(--color-outline-variant)",
              background: "var(--color-surface-container)",
              color: "var(--color-on-surface)",
              fontSize: "14px",
              outline: "none",
              marginBottom: "20px",
            }}
          />

          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveCategory("All")}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid var(--color-outline-variant)",
                background: activeCategory === "All" ? "var(--color-primary)" : "var(--color-surface-container)",
                color: activeCategory === "All" ? "#fff" : "var(--color-on-surface-variant)",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: "1px solid var(--color-outline-variant)",
                  background: activeCategory === cat ? "var(--color-primary)" : "var(--color-surface-container)",
                  color: activeCategory === cat ? "#fff" : "var(--color-on-surface-variant)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
            {filtered.map(tool => (
              <Link
                key={tool.slug}
                href={`/docs/${tool.slug}`}
                style={{
                  display: "block",
                  padding: "18px",
                  borderRadius: "12px",
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  textDecoration: "none",
                }}
              >
                <div style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "var(--color-secondary-container)",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  marginBottom: "8px",
                }}>
                  {tool.category}
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-on-surface)", marginBottom: "4px" }}>{tool.name}</h3>
                <p style={{ fontSize: "12px", color: "var(--color-on-surface-variant)", lineHeight: 1.5 }}>
                  {tool.functions.length} functions
                </p>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
