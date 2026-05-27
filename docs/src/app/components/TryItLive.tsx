'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Play, Loader2 } from 'lucide-react';
import { runToolFunction } from '@/lib/toolmetry-browser';

interface TryItLiveProps {
  toolSlug: string;
}

export function TryItLive({ toolSlug }: TryItLiveProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('');
  const [copied, setCopied] = useState(false);
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const runTool = useCallback(async () => {
    setLoading(true);
    try {
      const result = await runToolFunction(toolSlug, mode, input, secret);
      setOutput(result);
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  }, [input, mode, secret, toolSlug]);

  const getModes = (): { value: string; label: string }[] => {
    switch (toolSlug) {
      case 'base64': return [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }];
      case 'url': return [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }, { value: 'buildQuery', label: 'Build Query' }, { value: 'parseQuery', label: 'Parse Query' }];
      case 'html-entity': return [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }];
      case 'morse': return [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }];
      case 'roman': return [{ value: 'toRoman', label: 'To Roman' }, { value: 'fromRoman', label: 'From Roman' }];
      case 'encrypt': return [{ value: 'encrypt', label: 'Encrypt' }, { value: 'decrypt', label: 'Decrypt' }];
      case 'hash': return [
        { value: 'SHA-256', label: 'SHA-256' }, { value: 'SHA-1', label: 'SHA-1' },
        { value: 'SHA-384', label: 'SHA-384' }, { value: 'SHA-512', label: 'SHA-512' },
        { value: 'all', label: 'All Hashes' },
      ];
      case 'random': return [
        { value: 'string', label: 'String' }, { value: 'int', label: 'Integer' },
        { value: 'hex', label: 'Hex' }, { value: 'alphanumeric', label: 'Alphanumeric' },
        { value: 'float', label: 'Float' }, { value: 'boolean', label: 'Boolean' },
      ];
      case 'text': return [
        { value: 'camel', label: 'camelCase' }, { value: 'pascal', label: 'PascalCase' },
        { value: 'snake', label: 'snake_case' }, { value: 'kebab', label: 'kebab-case' },
        { value: 'constant', label: 'CONSTANT' }, { value: 'slug', label: 'slug' },
        { value: 'reverse', label: 'reverse' }, { value: 'count', label: 'count' },
      ];
      case 'json': return [{ value: 'format', label: 'Format' }, { value: 'minify', label: 'Minify' }, { value: 'validate', label: 'Validate' }];
      case 'number-base': return [
        { value: 'decimal', label: 'From Decimal' }, { value: 'binary', label: 'From Binary' },
        { value: 'hex', label: 'From Hex' }, { value: 'octal', label: 'From Octal' },
      ];
      case 'lorem': return [
        { value: 'words', label: 'Words' }, { value: 'sentences', label: 'Sentences' },
        { value: 'paragraphs', label: 'Paragraphs' },
      ];
      default: return [];
    }
  };

  const getPlaceholder = (): string => {
    switch (toolSlug) {
      case 'base64': return mode === 'decode' ? 'SGVsbG8gV29ybGQ=' : 'Hello World';
      case 'url': return mode === 'buildQuery' ? '{"name":"John","age":30}' : mode === 'parseQuery' ? '?name=John&age=30' : mode === 'decode' ? 'hello%20world%26foo%3Dbar' : 'hello world&foo=bar';
      case 'jwt': return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      case 'encrypt': return 'Hello, secret message!';
      case 'hash': return 'hello world';
      case 'random': return mode === 'int' ? '1, 100' : mode === 'float' ? '0, 1, 4' : '16';
      case 'color': return '#3B82F6';
      case 'html-entity': return mode === 'decode' ? '&lt;div&gt;Hello &amp; World&lt;/div&gt;' : '<div>Hello & "World"</div>';
      case 'number-base': return mode === 'binary' ? '11111111' : mode === 'hex' ? 'FF' : mode === 'octal' ? '377' : '255';
      case 'text': return 'hello world example';
      case 'json': return '{"name":"John","age":30}';
      case 'password': return '16';
      case 'morse': return mode === 'decode' ? '.... . .-.. .-.. ---' : 'HELLO WORLD';
      case 'roman': return mode === 'fromRoman' ? 'XLII' : '42';
      case 'cron': return '0 0 * * *';
      case 'diff': return 'Hello World\n---\nHello Earth';
      case 'lorem': return '5';
      case 'uuid': return '1';
      default: return 'Enter input...';
    }
  };

  const modes = getModes();

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
        <Play size={14} className="text-brand" />
        <h3 className="text-sm font-semibold text-card-foreground">Try It Live</h3>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground">powered by toolmetry</span>
      </div>
      <div className="p-4 space-y-3">
        {modes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {modes.map(m => (
              <button
                key={m.value}
                onClick={() => { setMode(m.value); setOutput(''); }}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  (mode || modes[0].value) === m.value
                    ? 'gradient-bg text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {toolSlug !== 'uuid' && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Input</label>
            <textarea
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/50 resize-y min-h-[80px] text-foreground"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              rows={3}
            />
          </div>
        )}

        {toolSlug === 'encrypt' && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Secret Key</label>
            <input
              type="text"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/50 text-foreground"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="my-password"
            />
          </div>
        )}

        <button
          onClick={runTool}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-95 disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {toolSlug === 'uuid' ? 'Generate UUID' : 'Run'}
        </button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Output</label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:bg-brand/10 rounded px-1.5 py-0.5 transition-colors"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="w-full rounded-lg border border-border bg-code-bg px-3 py-2 text-sm font-mono break-all whitespace-pre-wrap max-h-64 overflow-y-auto text-foreground custom-scrollbar">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
