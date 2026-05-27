"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: "12px 24px",
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme === "dark" ? "rgba(30,32,40,0.8)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)",
        borderRadius: "16px",
        padding: "8px 20px",
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #0C2E76, #6b8cff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "16px",
          }}>
            T
          </div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--color-on-surface)" }}>
            Toolmetry Developer Web
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Link href="/docs" style={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-on-surface-variant)",
            textDecoration: "none",
            transition: "background 0.15s",
          }}>
            Docs
          </Link>
          <Link href="/playground" style={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-on-surface-variant)",
            textDecoration: "none",
            transition: "background 0.15s",
          }}>
            Playground
          </Link>
          <a
            href="https://www.npmjs.com/package/toolmetry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--color-on-surface-variant)",
              textDecoration: "none",
            }}
          >
            npm
          </a>
          <button
            onClick={toggleTheme}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid var(--color-outline-variant)",
              background: "var(--color-surface-container)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
