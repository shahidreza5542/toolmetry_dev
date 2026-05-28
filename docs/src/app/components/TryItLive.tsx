'use client';

/**
 * TryItLive — Real-time testing using the actual `toolmetry` npm package.
 *
 * Every function call goes directly to `import { ... } from 'toolmetry'`.
 * No wrappers, no manual logic — this IS the real package being tested.
 *
 * npm i toolmetry   →   v1.0.3
 */

import { useState, useCallback } from 'react';
import { Copy, Check, Play, Loader2, Package } from 'lucide-react';

// ─── DIRECT IMPORTS FROM THE TOOLMETRY NPM PACKAGE ──────────────────────────
import {
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  urlBuildQuery,
  urlParseQuery,
  hashAsync,
  hashAll,
  jwtDecode,
  uuidV4Batch,
  aesEncryptAsync,
  aesDecryptAsync,
  randomString,
  randomInt,
  randomHex,
  randomAlphanumeric,
  randomBoolean,
  randomFloat,
  colorConvert,
  htmlEntityEncode,
  htmlEntityDecode,
  convertAllBases,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  slugify,
  wordCount,
  charCount,
  reverse,
  jsonFormat,
  jsonMinify,
  jsonValidate,
  passwordGenerate,
  morseEncode,
  morseDecode,
  romanToRoman,
  romanFromRoman,
  cronValidate,
  cronDescribe,
  diffCheck,
  loremWords,
  loremSentences,
  loremParagraphs,
} from 'toolmetry';

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

  // ─── REAL TOOLMETRY PACKAGE CALLS ────────────────────────────────────────
  // Every case directly calls a function imported from `import {} from 'toolmetry'`
  const runTool = useCallback(async () => {
    setLoading(true);
    try {
      let result: string;

      switch (toolSlug) {
        // ── Base64 (toolmetry.base64Encode / base64Decode) ──────────────
        case 'base64':
          result = mode === 'decode' ? base64Decode(input) : base64Encode(input);
          break;

        // ── URL (toolmetry.urlEncode / urlDecode / urlBuildQuery / urlParseQuery) ──
        case 'url':
          if (mode === 'decode') {
            result = urlDecode(input);
          } else if (mode === 'buildQuery') {
            try {
              const obj = JSON.parse(input);
              result = urlBuildQuery(obj);
            } catch {
              result = 'Error: Input must be a JSON object like {"name":"John","age":30}';
            }
          } else if (mode === 'parseQuery') {
            result = JSON.stringify(urlParseQuery(input), null, 2);
          } else {
            result = urlEncode(input);
          }
          break;

        // ── Hash (toolmetry.hashAsync / hashAll) ────────────────────────
        case 'hash': {
          if (mode === 'all') {
            const [sha1, sha256, sha384, sha512] = await Promise.all([
              hashAsync(input, 'SHA-1'),
              hashAsync(input, 'SHA-256'),
              hashAsync(input, 'SHA-384'),
              hashAsync(input, 'SHA-512'),
            ]);
            result = JSON.stringify({ sha1, sha256, sha384, sha512 }, null, 2);
          } else {
            try {
              result = await hashAsync(input, mode || 'SHA-256');
            } catch {
              result = `Error: Algorithm "${mode}" not supported in browser. Use SHA-1, SHA-256, SHA-384, or SHA-512.`;
            }
          }
          break;
        }

        // ── JWT (toolmetry.jwtDecode) ───────────────────────────────────
        case 'jwt':
          try {
            const decoded = jwtDecode(input);
            result = JSON.stringify(decoded, null, 2);
          } catch (e) {
            result = `Error: ${e instanceof Error ? e.message : 'Invalid JWT'}`;
          }
          break;

        // ── UUID (toolmetry.uuidV4Batch) ────────────────────────────────
        case 'uuid': {
          const count = Math.max(1, Math.min(10, parseInt(input) || 1));
          const uuids = uuidV4Batch(count);
          result = count === 1 ? uuids[0] : uuids.join('\n');
          break;
        }

        // ── AES-256 Encrypt/Decrypt (toolmetry.aesEncryptAsync / aesDecryptAsync) ──
        case 'encrypt':
          if (!input) { result = 'Error: Enter text to encrypt/decrypt'; break; }
          if (!secret) { result = 'Error: Enter a secret key'; break; }
          try {
            result = mode === 'decrypt'
              ? await aesDecryptAsync(input, secret)
              : await aesEncryptAsync(input, secret);
          } catch (e) {
            result = `Error: ${e instanceof Error ? e.message : 'Encryption failed'}`;
          }
          break;

        // ── Random (toolmetry.randomString / randomInt / randomHex / ...) ──
        case 'random':
          switch (mode) {
            case 'int': {
              const parts = input.split(',').map(s => parseInt(s.trim()));
              result = String(randomInt(parts[0] || 1, parts[1] || 100));
              break;
            }
            case 'hex':
              result = randomHex(Math.max(1, Math.min(128, parseInt(input) || 32)));
              break;
            case 'float': {
              const parts = input.split(',').map(s => parseFloat(s.trim()));
              result = String(randomFloat(parts[0] || 0, parts[1] || 1, parts[2] || 4));
              break;
            }
            case 'boolean':
              result = String(randomBoolean());
              break;
            case 'alphanumeric':
              result = randomAlphanumeric(Math.max(1, Math.min(128, parseInt(input) || 16)));
              break;
            default:
              result = randomString(Math.max(1, Math.min(128, parseInt(input) || 16)), { lowercase: true, uppercase: true, digits: true });
          }
          break;

        // ── Color (toolmetry.colorConvert) ──────────────────────────────
        case 'color':
          try {
            result = JSON.stringify(colorConvert(input), null, 2);
          } catch (e) {
            result = `Error: ${e instanceof Error ? e.message : 'Invalid color'}`;
          }
          break;

        // ── HTML Entity (toolmetry.htmlEntityEncode / htmlEntityDecode) ──
        case 'html-entity':
          result = mode === 'decode' ? htmlEntityDecode(input) : htmlEntityEncode(input);
          break;

        // ── Number Base (toolmetry.convertAllBases) ─────────────────────
        case 'number-base': {
          const fromBase = mode === 'binary' ? 2 : mode === 'hex' ? 16 : mode === 'octal' ? 8 : 10;
          try {
            result = JSON.stringify(convertAllBases(input, fromBase), null, 2);
          } catch (e) {
            result = `Error: ${e instanceof Error ? e.message : 'Invalid number'}`;
          }
          break;
        }

        // ── Text (toolmetry.toCamelCase / toSnakeCase / ...) ────────────
        case 'text':
          switch (mode || 'camel') {
            case 'camel': result = toCamelCase(input); break;
            case 'pascal': result = toPascalCase(input); break;
            case 'snake': result = toSnakeCase(input); break;
            case 'kebab': result = toKebabCase(input); break;
            case 'constant': result = toConstantCase(input); break;
            case 'slug': result = slugify(input); break;
            case 'reverse': result = reverse(input); break;
            case 'count': {
              const words = wordCount(input);
              const chars = charCount(input);
              const charsNoSpace = charCount(input, false);
              result = `Words: ${words}\nCharacters (with spaces): ${chars}\nCharacters (no spaces): ${charsNoSpace}`;
              break;
            }
            default: result = input;
          }
          break;

        // ── JSON (toolmetry.jsonFormat / jsonMinify / jsonValidate) ─────
        case 'json':
          if (mode === 'minify') {
            result = jsonMinify(input);
          } else if (mode === 'validate') {
            const v = jsonValidate(input);
            result = v.valid ? 'Valid JSON!' : `Invalid JSON: ${v.error}`;
          } else {
            result = jsonFormat(input, 2);
          }
          break;

        // ── Password (toolmetry.passwordGenerate) ──────────────────────
        case 'password': {
          const length = Math.max(8, Math.min(128, parseInt(input) || 16));
          result = passwordGenerate({ length, symbols: true });
          break;
        }

        // ── Morse (toolmetry.morseEncode / morseDecode) ────────────────
        case 'morse':
          result = mode === 'decode' ? morseDecode(input) : morseEncode(input);
          break;

        // ── Roman (toolmetry.romanToRoman / romanFromRoman) ────────────
        case 'roman':
          result = mode === 'fromRoman' ? String(romanFromRoman(input)) : romanToRoman(parseInt(input) || 1);
          break;

        // ── Cron (toolmetry.cronValidate / cronDescribe) ───────────────
        case 'cron':
          if (input.startsWith('@')) {
            result = cronDescribe(input);
          } else {
            const v = cronValidate(input);
            result = v.valid ? `Valid: true\n${cronDescribe(input)}` : `Valid: false\nError: ${v.error}`;
          }
          break;

        // ── Diff (toolmetry.diffCheck) ─────────────────────────────────
        case 'diff': {
          const parts = input.split('---');
          const oldText = (parts[0] || '').trim();
          const newText = (parts[1] || '').trim();
          if (!oldText && !newText) {
            result = 'Enter two texts separated by "---" on a new line.\nExample:\nHello World\n---\nHello Earth';
          } else {
            const d = diffCheck(oldText, newText);
            const lines = d.lines.map((l: { type: string; content: string }) =>
              `${l.type === 'added' ? '+ ' : l.type === 'removed' ? '- ' : '  '}${l.content}`
            ).join('\n');
            result = `${lines}\n\nStats: +${d.stats.added} -${d.stats.removed} unchanged:${d.stats.unchanged}`;
          }
          break;
        }

        // ── Lorem (toolmetry.loremWords / loremSentences / loremParagraphs) ──
        case 'lorem': {
          const count = Math.max(1, Math.min(100, parseInt(input) || 5));
          if (mode === 'sentences') result = loremSentences(count);
          else if (mode === 'paragraphs') result = loremParagraphs(count);
          else result = loremWords(count);
          break;
        }

        default:
          result = 'Interactive demo not available for this tool.';
      }

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
      {/* Header with gradient left border */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 gradient-bg rounded-r" />
        <Play size={14} className="text-brand" />
        <h3 className="text-sm font-semibold text-card-foreground">Try It Live</h3>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono text-brand bg-brand/10 dark:bg-brand/15 rounded-full px-2.5 py-1 font-medium">
          <Package size={10} /> import {'{'} ... {'}'} from &apos;toolmetry&apos;
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Mode buttons */}
        {modes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {modes.map(m => (
              <button
                key={m.value}
                onClick={() => { setMode(m.value); setOutput(''); }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  (mode || modes[0].value) === m.value
                    ? 'gradient-bg text-white shadow-sm shadow-brand/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        {toolSlug !== 'uuid' && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Input</label>
            <textarea
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 resize-y min-h-[80px] text-foreground placeholder:text-muted-foreground/50"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              rows={3}
            />
          </div>
        )}

        {/* Secret key for encrypt */}
        {toolSlug === 'encrypt' && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Secret Key</label>
            <input
              type="text"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 text-foreground placeholder:text-muted-foreground/50"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="my-password"
            />
          </div>
        )}

        {/* Run button */}
        <button
          onClick={runTool}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {toolSlug === 'uuid' ? 'Generate UUID' : 'Run'}
        </button>

        {/* Output */}
        {output && (
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Output <span className="text-brand/60 font-mono text-[10px]">via toolmetry</span>
              </label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md px-1.5 py-0.5 hover:bg-muted transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="w-full rounded-lg border border-slate-800 bg-[#0B1120] px-3 py-2.5 text-sm font-mono break-all whitespace-pre-wrap max-h-64 overflow-y-auto text-slate-300 custom-scrollbar">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
