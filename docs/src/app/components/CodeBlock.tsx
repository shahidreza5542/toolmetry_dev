'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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

  // Simple syntax highlighting via regex
  const highlightCode = (code: string) => {
    let highlighted = code
      // Strings (single and double quoted)
      .replace(/(&quot;|"|')([^"'&]*?)(\1)/g, '<span class="text-green-500 dark:text-green-400">$1$2$3</span>')
      // Comments
      .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground italic">$1</span>')
      // Keywords
      .replace(/\b(const|let|var|import|require|from|return|await|async|function|new|if|else|true|false|null|undefined)\b/g, '<span class="text-purple-500 dark:text-purple-400 font-semibold">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-amber-500 dark:text-amber-400">$1</span>');

    return highlighted;
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/50">
          <span className="text-xs font-semibold text-muted-foreground">{title}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-brand hover:bg-brand/10 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      {!title && (
        <div className="flex items-center justify-end px-4 py-1.5 border-b border-border bg-muted/50">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-brand hover:bg-brand/10 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-sm font-mono leading-relaxed bg-code-bg text-foreground">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
}
