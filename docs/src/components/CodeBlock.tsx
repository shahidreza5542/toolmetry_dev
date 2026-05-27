"use client";

import { useState } from "react";

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 16px",
        background: "#181825",
        borderRadius: "12px 12px 0 0",
        borderBottom: "1px solid #313244",
      }}>
        <span style={{ fontSize: "12px", color: "#6c7086", fontWeight: 500, textTransform: "uppercase" }}>
          {language || "javascript"}
        </span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: "12px",
            color: copied ? "#a6e3a1" : "#6c7086",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="code-block" style={{ borderRadius: "0 0 12px 12px", borderTop: "none" }}>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{code}</pre>
      </div>
    </div>
  );
}
