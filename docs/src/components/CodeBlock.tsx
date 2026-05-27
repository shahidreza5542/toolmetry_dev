'use client';

import { useState } from 'react';

export default function CodeBlock({ code, language = 'javascript' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', margin: '12px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'var(--code-bg)',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            color: copied ? '#4ade80' : '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0,
        background: 'var(--code-bg)',
        color: 'var(--code-text)',
        borderRadius: '0 0 8px 8px',
        padding: '16px',
        overflowX: 'auto',
        fontSize: '13px',
        lineHeight: 1.7,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
