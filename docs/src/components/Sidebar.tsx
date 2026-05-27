"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools, categories } from "../lib/tools-data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "260px",
      minHeight: "100vh",
      padding: "24px 16px",
      borderRight: "1px solid var(--color-outline-variant)",
      background: "var(--color-surface-container)",
      position: "sticky",
      top: 0,
      overflowY: "auto",
      flexShrink: 0,
    }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/docs" style={{
          display: "block",
          padding: "8px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 600,
          color: pathname === "/docs" ? "var(--color-primary)" : "var(--color-on-surface-variant)",
          textDecoration: "none",
          background: pathname === "/docs" ? "var(--color-secondary-container)" : "transparent",
        }}>
          All Tools
        </Link>
      </div>

      {categories.map(cat => {
        const catTools = tools.filter(t => t.category === cat);
        if (catTools.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: "20px" }}>
            <div style={{
              padding: "4px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-outline)",
              marginBottom: "4px",
            }}>
              {cat}
            </div>
            {catTools.map(tool => {
              const href = `/docs/${tool.slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={tool.slug}
                  href={href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  {tool.name}
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}
