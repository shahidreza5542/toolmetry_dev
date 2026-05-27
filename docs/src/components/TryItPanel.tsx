'use client';

import { useState } from 'react';
import { getToolBySlug } from '../lib/tools-data';
import { playgroundFunctions } from '../lib/toolmetry-browser';

export default function TryItPanel({ toolSlug }: { toolSlug: string }) {
  const tool = getToolBySlug(toolSlug);
  const [selectedFn, setSelectedFn] = useState('');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!tool) return null;

  const toolFunctions = playgroundFunctions.filter(f => {
    const fnNames = tool.functions.map(fn => fn.name);
    return fnNames.includes(f.name);
  });

  const currentFn = toolFunctions.find(f => f.name === selectedFn);

  const handleSelectFn = (name: string) => {
    setSelectedFn(name);
    const fn = toolFunctions.find(f => f.name === name);
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

  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--card)',
    }}>
      {/* Function selector */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '8px' }}>
          Select Function
        </label>
        <select
          value={selectedFn}
          onChange={e => handleSelectFn(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--background)',
            color: 'var(--foreground)',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Choose a function...</option>
          {toolFunctions.map(fn => (
            <option key={fn.name} value={fn.name}>{fn.name}()</option>
          ))}
        </select>
      </div>

      {/* Parameters */}
      {currentFn && currentFn.params.length > 0 && (
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '12px' }}>
            Parameters
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentFn.params.map(p => (
              <div key={p.name}>
                <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--foreground)', display: 'block', marginBottom: '4px' }}>
                  {p.name} <span style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>({p.type})</span>
                </label>
                <input
                  type="text"
                  value={paramValues[p.name] || ''}
                  onChange={e => setParamValues(prev => ({ ...prev, [p.name]: e.target.value }))}
                  placeholder={p.placeholder || p.name}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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
        </div>
      )}

      {/* Run button */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={handleRun}
          disabled={!selectedFn || loading}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            background: selectedFn && !loading ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'var(--muted)',
            color: selectedFn && !loading ? 'white' : 'var(--muted-foreground)',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: selectedFn && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Running...' : 'Run'}
        </button>
      </div>

      {/* Output */}
      <div style={{ padding: '16px 20px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '8px' }}>
          Output
        </label>
        <div style={{
          minHeight: '80px',
          padding: '14px',
          borderRadius: '8px',
          background: 'var(--code-bg)',
          color: output.startsWith('Error') ? '#ef4444' : '#4ade80',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}>
          {output || '// Select a function and click Run'}
        </div>
        {selectedFn && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: 'var(--code-bg)',
            color: '#94a3b8',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: 1.6,
          }}>
            <span style={{ color: '#94a3b8' }}>const {'{ '}</span>
            <span style={{ color: '#60a5fa' }}>{selectedFn}</span>
            <span style={{ color: '#94a3b8' }}> {'} = '}require</span>
            <span style={{ color: '#4ade80' }}>({'\''}toolmetry{'\''})</span>
            <span style={{ color: '#94a3b8' }}>;</span>{'\n'}
            <span style={{ color: '#60a5fa' }}>{selectedFn}</span>
            <span style={{ color: '#94a3b8' }}>(</span>
            {currentFn?.params.map((p, i) => (
              <span key={p.name}>
                {i > 0 && <span style={{ color: '#94a3b8' }}>, </span>}
                <span style={{ color: '#fbbf24' }}>{paramValues[p.name] ? `"${paramValues[p.name]}"` : `"${p.placeholder || p.name}"`}</span>
              </span>
            ))}
            <span style={{ color: '#94a3b8' }}>);</span>
          </div>
        )}
      </div>
    </div>
  );
}
