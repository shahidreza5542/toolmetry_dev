'use client';

import { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
}

export function CodeBlock({ code, title, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Enhanced syntax highlighting via regex
  const highlightCode = (code: string) => {
    // Escape HTML first
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments (must be before strings to avoid conflicts)
    highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-slate-500 dark:text-slate-500 italic">$1</span>');

    // Strings (single, double, and template)
    highlighted = highlighted.replace(/(&quot;|"|'|`)([^"'`&]*?)(\1)/g, '<span class="text-emerald-400">$1$2$3</span>');

    // Keywords
    highlighted = highlighted.replace(/\b(const|let|var|import|require|from|return|await|async|function|new|if|else|true|false|null|undefined|export|default|class|extends|typeof|instanceof|throw|try|catch|finally)\b/g, '<span class="text-violet-400 font-medium">$1</span>');

    // Function names (word followed by parenthesis)
    highlighted = highlighted.replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, '<span class="text-blue-400">$1</span>');

    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>');

    // Properties after dot
    highlighted = highlighted.replace(/\.([a-zA-Z_$][\w$]*)/g, '.<span class="text-slate-300">$1</span>');

    return highlighted;
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B1120]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111827] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileCode size={13} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-400">{title || 'code'}</span>
          {language && (
            <span className="text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto custom-scrollbar">
        <pre className="px-4 py-3 text-[13px] font-mono leading-6 text-slate-300">
          <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
        </pre>
      </div>
    </div>
  );
}
