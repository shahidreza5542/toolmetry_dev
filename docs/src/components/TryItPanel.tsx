"use client";

import { playgroundFunctions } from "../lib/toolmetry-browser";
import { useState } from "react";

export default function TryItPanel({ toolName }: { toolName: string }) {
  const toolFuncs = playgroundFunctions.filter(f => f.tool === toolName);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [paramValues, setParamValues] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentFunc = toolFuncs[selectedIdx] || toolFuncs[0];

  const handleSelectChange = (idx: number) => {
    setSelectedIdx(idx);
    const fn = toolFuncs[idx];
    if (fn) {
      setParamValues(fn.params.map(p => p.default || ""));
    }
    setOutput("");
  };

  const handleRun = async () => {
    if (!currentFunc) return;
    setLoading(true);
    try {
      const result = await currentFunc.execute(paramValues);
      setOutput(String(result));
    } catch (e: any) {
      setOutput("Error: " + (e.message || String(e)));
    }
    setLoading(false);
  };

  if (toolFuncs.length === 0) {
    return <p style={{ fontSize: "14px", color: "var(--color-on-surface-variant)" }}>No playground functions available for this tool.</p>;
  }

  return (
    <div style={{
      border: "1px solid var(--color-outline-variant)",
      borderRadius: "12px",
      overflow: "hidden",
      background: "var(--color-surface-container)",
    }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-outline-variant)" }}>
        <select
          value={selectedIdx}
          onChange={e => handleSelectChange(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--color-outline-variant)",
            background: "var(--color-surface)",
            color: "var(--color-on-surface)",
            fontSize: "13px",
            fontFamily: "var(--font-mono)",
          }}
        >
          {toolFuncs.map((f, i) => (
            <option key={i} value={i}>{f.name}({f.params.map(p => p.name).join(", ")})</option>
          ))}
        </select>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {currentFunc && currentFunc.params.map((param, i) => (
          <div key={param.name} style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--color-on-surface-variant)", marginBottom: "4px" }}>
              {param.name}
            </label>
            <input
              type="text"
              placeholder={param.placeholder}
              value={paramValues[i] || ""}
              onChange={e => {
                const newVals = [...paramValues];
                newVals[i] = e.target.value;
                setParamValues(newVals);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--color-outline-variant)",
                background: "var(--color-surface)",
                color: "var(--color-on-surface)",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
              }}
            />
          </div>
        ))}

        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      {output && (
        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--color-outline-variant)",
          background: "#1e1e2e",
        }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#6c7086", marginBottom: "8px", textTransform: "uppercase" }}>Output</div>
          <pre style={{
            margin: 0,
            color: output.startsWith("Error") ? "#f38ba8" : "#a6e3a1",
            fontSize: "13px",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
