"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { playgroundFunctions } from "../../lib/toolmetry-browser";
import { useState } from "react";

export default function PlaygroundPage() {
  const categories = [...new Set(playgroundFunctions.map(f => f.tool))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [paramValues, setParamValues] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const toolFuncs = playgroundFunctions.filter(f => f.tool === activeCategory);
  const currentFunc = toolFuncs[selectedIdx] || toolFuncs[0];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedIdx(0);
    const fn = playgroundFunctions.find(f => f.tool === cat);
    if (fn) setParamValues(fn.params.map(p => p.default || ""));
    setOutput("");
  };

  const handleSelectChange = (idx: number) => {
    setSelectedIdx(idx);
    const fn = toolFuncs[idx];
    if (fn) setParamValues(fn.params.map(p => p.default || ""));
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

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <Navbar />

      <div style={{ paddingTop: "100px", maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.03em" }}>Playground</h1>
        <p style={{ fontSize: "15px", color: "var(--color-on-surface-variant)", marginBottom: "32px" }}>
          Test toolmetry functions directly in your browser. Uses the actual package logic.
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{
            border: "1px solid var(--color-outline-variant)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "var(--color-surface-container)",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-outline-variant)" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>Input</h3>
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
                  marginBottom: "12px",
                }}
              >
                {toolFuncs.map((f, i) => (
                  <option key={i} value={i}>{f.name}</option>
                ))}
              </select>

              {currentFunc && currentFunc.params.map((param, i) => (
                <div key={param.name} style={{ marginBottom: "10px" }}>
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

            {currentFunc && (
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#6c7086", marginBottom: "6px", textTransform: "uppercase" }}>Code</div>
                <pre style={{
                  margin: 0,
                  color: "#cdd6f4",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.6,
                  background: "#1e1e2e",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #313244",
                }}>
                  {`import { ${currentFunc.name.split(" ")[0]} } from 'toolmetry';\n\nconst result = ${currentFunc.name.split(" ")[0]}(${currentFunc.params.map((p, i) => paramValues[i] ? `"${paramValues[i]}"` : `"${p.placeholder}"`).join(", ")});`}
                </pre>
              </div>
            )}
          </div>

          <div style={{
            border: "1px solid var(--color-outline-variant)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#1e1e2e",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #313244" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#cdd6f4" }}>Output</h3>
            </div>
            <div style={{ padding: "20px" }}>
              {output ? (
                <pre style={{
                  margin: 0,
                  color: output.startsWith("Error") ? "#f38ba8" : "#a6e3a1",
                  fontSize: "14px",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {output}
                </pre>
              ) : (
                <p style={{ color: "#6c7086", fontSize: "14px" }}>
                  Select a function and click Run to see the output.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
