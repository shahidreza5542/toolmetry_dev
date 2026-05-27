'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { playgroundFunctions, categories } from '../../lib/toolmetry-browser';
import { tools } from '../../lib/tools-data';

export default function PlaygroundPage() {
  const [selectedFn, setSelectedFn] = useState('');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = categoryFilter
    ? playgroundFunctions.filter(f => f.category === categoryFilter)
    : playgroundFunctions;

  const currentFn = playgroundFunctions.find(f => f.name === selectedFn);

  const handleSelectFn = (name: string) => {
    setSelectedFn(name);
    const fn = playgroundFunctions.find(f => f.name === name);
    if (fn) {
      const defaults: Record<string, string> = {};
      fn.params.forEach(p => {
        defaults[p.name] = p.default || p.placeholder || '';
      });
      setParamValues(defaults);
    }
    setOutput('');
  };

  const handleRun = async () => {
    if (!currentFn) return;
    setLoading(true);
    try {
      const args = currentFn.params.map(p => paramValues[p.name] || '');
      const result = await currentFn.execute(...args);
      setOutput(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  const uniqueCategories = [...new Set(playgroundFunctions.map(f => f.category))];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Playground</h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '32px' }}>
          Test toolmetry functions directly in your browser. Uses the same code as the npm package.
        </p>

        <div style={{ display: 'flex', gap: '24px', minHeight: '600px' }}>
          {/* Left Panel — Controls */}
          <div style={{ flex: 1, maxWidth: '480px' }}>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <button
                onClick={() => setCategoryFilter(null)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: !categoryFilter ? 'var(--primary)' : 'var(--card)',
                  color: !categoryFilter ? 'white' : 'var(--foreground)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: categoryFilter === cat ? 'var(--primary)' : 'var(--card)',
                    color: categoryFilter === cat ? 'white' : 'var(--foreground)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Function selector */}
            <select
              value={selectedFn}
              onChange={e => handleSelectFn(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--foreground)',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              <option value="">Choose a function...</option>
              {filtered.map(fn => (
                <option key={fn.name} value={fn.name}>{fn.name}()</option>
              ))}
            </select>

            {/* Parameters */}
            {currentFn && currentFn.params.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '12px' }}>
                  Parameters
                </div>
                {currentFn.params.map(p => (
                  <div key={p.name} style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--foreground)', display: 'block', marginBottom: '4px' }}>
                      {p.name} <span style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>({p.type}{p.required ? ', required' : ''})</span>
                    </label>
                    <input
                      type="text"
                      value={paramValues[p.name] || ''}
                      onChange={e => setParamValues(prev => ({ ...prev, [p.name]: e.target.value }))}
                      placeholder={p.placeholder || p.name}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentFn && currentFn.params.length === 0 && (
              <div style={{ padding: '16px', borderRadius: '8px', background: 'var(--accent)', marginBottom: '16px', fontSize: '13px', color: 'var(--muted-foreground)' }}>
                This function takes no parameters.
              </div>
            )}

            {/* Run */}
            <button
              onClick={handleRun}
              disabled={!selectedFn || loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                background: selectedFn && !loading ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'var(--muted)',
                color: selectedFn && !loading ? 'white' : 'var(--muted-foreground)',
                fontWeight: 700,
                fontSize: '15px',
                border: 'none',
                cursor: selectedFn && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Running...' : '▶ Run'}
            </button>
          </div>

          {/* Right Panel — Output */}
          <div style={{ flex: 1 }}>
            <div style={{
              borderRadius: '12px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              background: 'var(--card)',
              height: '100%',
            }}>
              {/* Code snippet */}
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--code-bg)',
              }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Code</div>
                <code style={{ color: 'var(--code-text)', fontSize: '13px', fontFamily: 'monospace' }}>
                  {selectedFn ? (
                    <>
                      <span style={{ color: '#94a3b8' }}>const {'{ '}</span>
                      <span style={{ color: '#60a5fa' }}>{selectedFn}</span>
                      <span style={{ color: '#94a3b8' }}> {'} = '}require</span>
                      <span style={{ color: '#4ade80' }}>({'\''}toolmetry{'\''})</span>
                      <span style={{ color: '#94a3b8' }}>;</span>
                    </>
                  ) : (
                    <span style={{ color: '#64748b' }}>// Select a function to see the code</span>
                  )}
                </code>
              </div>

              {/* Output */}
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Output
                </div>
                <pre style={{
                  minHeight: '300px',
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--code-bg)',
                  color: output.startsWith('Error') ? '#ef4444' : '#4ade80',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  border: 'none',
                }}>
                  {output || '// Select a function and click Run to see the output'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
