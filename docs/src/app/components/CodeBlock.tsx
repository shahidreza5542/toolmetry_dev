'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[#1A1A1A] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#1A1A1A]">
        <span className="text-[11px] font-medium text-[#666]">{title || 'code'}</span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-medium text-[#666] hover:text-white transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="px-4 py-3 text-[13px] leading-6 font-mono bg-[#0A0A0A] text-[#ccc]">
          {code}
        </pre>
      </div>
    </div>
  );
}
