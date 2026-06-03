'use client';

import { useState, useCallback } from 'react';
import {
  base64Encode, base64Decode,
  urlEncode, urlDecode, urlBuildQuery, urlParseQuery,
  hashAsync, hashAll,
  jwtDecode,
  uuidV4Batch,
  aesEncryptAsync, aesDecryptAsync,
  randomString, randomInt, randomHex, randomAlphanumeric, randomBoolean, randomFloat,
  colorConvert,
  htmlEntityEncode, htmlEntityDecode,
  convertAllBases,
  toCamelCase, toPascalCase, toSnakeCase, toKebabCase, toConstantCase, slugify, wordCount, charCount, reverse,
  jsonFormat, jsonMinify, jsonValidate,
  passwordGenerate,
  morseEncode, morseDecode,
  romanToRoman, romanFromRoman,
  cronValidate, cronDescribe,
  diffCheck,
  loremWords, loremSentences, loremParagraphs,
  qrGenerate,
  markdownToHtml, markdownStrip,
  timestampNow, timestampToDate, timestampFromDateString, timestampFormat,
} from '@/lib/toolmetry';

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
      let result: string;

      switch (toolSlug) {
        case 'base64':
          result = mode === 'decode' ? base64Decode(input) : base64Encode(input);
          break;
        case 'url':
          if (mode === 'decode') result = urlDecode(input);
          else if (mode === 'buildQuery') { try { result = urlBuildQuery(JSON.parse(input)); } catch { result = 'Error: Input must be a JSON object'; } }
          else if (mode === 'parseQuery') result = JSON.stringify(urlParseQuery(input), null, 2);
          else result = urlEncode(input);
          break;
        case 'hash': {
          if (mode === 'all') { const h = await hashAll(input); result = JSON.stringify(h, null, 2); }
          else { try { result = await hashAsync(input, mode || 'SHA-256'); } catch { result = `Error: Algorithm "${mode}" not supported.`; } }
          break;
        }
        case 'jwt':
          try { result = JSON.stringify(jwtDecode(input), null, 2); }
          catch (e) { result = `Error: ${e instanceof Error ? e.message : 'Invalid JWT'}`; }
          break;
        case 'uuid': {
          const count = Math.max(1, Math.min(10, parseInt(input) || 1));
          const uuids = uuidV4Batch(count);
          result = count === 1 ? uuids[0] : uuids.join('\n');
          break;
        }
        case 'encrypt':
          if (!input) { result = 'Enter text to encrypt/decrypt'; break; }
          if (!secret) { result = 'Enter a secret key'; break; }
          try { result = mode === 'decrypt' ? await aesDecryptAsync(input, secret) : await aesEncryptAsync(input, secret); }
          catch (e) { result = `Error: ${e instanceof Error ? e.message : 'Failed'}`; }
          break;
        case 'random':
          switch (mode) {
            case 'int': { const p = input.split(',').map(s => parseInt(s.trim())); result = String(randomInt(p[0] || 1, p[1] || 100)); break; }
            case 'hex': result = randomHex(Math.max(1, Math.min(128, parseInt(input) || 32))); break;
            case 'float': { const p = input.split(',').map(s => parseFloat(s.trim())); result = String(randomFloat(p[0] || 0, p[1] || 1, p[2] || 4)); break; }
            case 'boolean': result = String(randomBoolean()); break;
            case 'alphanumeric': result = randomAlphanumeric(Math.max(1, Math.min(128, parseInt(input) || 16))); break;
            default: result = randomString(Math.max(1, Math.min(128, parseInt(input) || 16)), { lowercase: true, uppercase: true, digits: true });
          }
          break;
        case 'color':
          try { result = JSON.stringify(colorConvert(input), null, 2); }
          catch (e) { result = `Error: ${e instanceof Error ? e.message : 'Invalid color'}`; }
          break;
        case 'html-entity':
          result = mode === 'decode' ? htmlEntityDecode(input) : htmlEntityEncode(input);
          break;
        case 'number-base': {
          const fromBase = mode === 'binary' ? 2 : mode === 'hex' ? 16 : mode === 'octal' ? 8 : 10;
          try { result = JSON.stringify(convertAllBases(input, fromBase), null, 2); }
          catch (e) { result = `Error: ${e instanceof Error ? e.message : 'Invalid number'}`; }
          break;
        }
        case 'text':
          switch (mode || 'camel') {
            case 'camel': result = toCamelCase(input); break;
            case 'pascal': result = toPascalCase(input); break;
            case 'snake': result = toSnakeCase(input); break;
            case 'kebab': result = toKebabCase(input); break;
            case 'constant': result = toConstantCase(input); break;
            case 'slug': result = slugify(input); break;
            case 'reverse': result = reverse(input); break;
            case 'count': result = `Words: ${wordCount(input)}\nCharacters: ${charCount(input)}\nNo spaces: ${charCount(input, false)}`; break;
            default: result = input;
          }
          break;
        case 'json':
          if (mode === 'minify') result = jsonMinify(input);
          else if (mode === 'validate') { const v = jsonValidate(input); result = v.valid ? 'Valid JSON' : `Invalid: ${v.error}`; }
          else result = jsonFormat(input, 2);
          break;
        case 'password': {
          const length = Math.max(8, Math.min(128, parseInt(input) || 16));
          result = passwordGenerate({ length, symbols: true });
          break;
        }
        case 'morse':
          result = mode === 'decode' ? morseDecode(input) : morseEncode(input);
          break;
        case 'roman':
          result = mode === 'fromRoman' ? String(romanFromRoman(input)) : romanToRoman(parseInt(input) || 1);
          break;
        case 'cron':
          if (input.startsWith('@')) { result = cronDescribe(input); }
          else { const v = cronValidate(input); result = v.valid ? `Valid\n${cronDescribe(input)}` : `Invalid: ${v.error}`; }
          break;
        case 'diff': {
          const parts = input.split('---');
          const oldText = (parts[0] || '').trim();
          const newText = (parts[1] || '').trim();
          if (!oldText && !newText) { result = 'Enter two texts separated by "---"'; }
          else {
            const d = diffCheck(oldText, newText);
            const lines = d.lines.map((l: { type: string; content: string }) =>
              `${l.type === 'added' ? '+ ' : l.type === 'removed' ? '- ' : '  '}${l.content}`
            ).join('\n');
            result = `${lines}\n\n+${d.stats.added} -${d.stats.removed} =${d.stats.unchanged}`;
          }
          break;
        }
        case 'lorem': {
          const count = Math.max(1, Math.min(100, parseInt(input) || 5));
          if (mode === 'sentences') result = loremSentences(count);
          else if (mode === 'paragraphs') result = loremParagraphs(count);
          else result = loremWords(count);
          break;
        }
        case 'qr': {
          if (!input.trim()) { result = 'Enter text or URL to generate QR code'; break; }
          result = qrGenerate(input);
          break;
        }
        case 'markdown': {
          if (!input.trim()) { result = 'Enter Markdown text'; break; }
          result = mode === 'strip' ? markdownStrip(input) : markdownToHtml(input);
          break;
        }
        case 'timestamp': {
          if (mode === 'now') { result = String(timestampNow()); }
          else if (mode === 'toDate') { const ts = parseInt(input); result = isNaN(ts) ? 'Enter a valid Unix timestamp' : timestampToDate(ts); }
          else if (mode === 'fromDate') { try { result = String(timestampFromDateString(input)); } catch { result = 'Invalid date string. Use ISO format like 2024-06-03'; } }
          else if (mode === 'format') { const ts = parseInt(input); result = isNaN(ts) ? 'Enter a valid Unix timestamp' : timestampFormat(ts, 'iso'); }
          else { result = String(timestampNow()); }
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
      case 'hash': return [{ value: 'SHA-256', label: 'SHA-256' }, { value: 'SHA-1', label: 'SHA-1' }, { value: 'SHA-384', label: 'SHA-384' }, { value: 'SHA-512', label: 'SHA-512' }, { value: 'all', label: 'All' }];
      case 'random': return [{ value: 'string', label: 'String' }, { value: 'int', label: 'Integer' }, { value: 'hex', label: 'Hex' }, { value: 'alphanumeric', label: 'Alphanumeric' }, { value: 'float', label: 'Float' }, { value: 'boolean', label: 'Boolean' }];
      case 'text': return [{ value: 'camel', label: 'camelCase' }, { value: 'pascal', label: 'PascalCase' }, { value: 'snake', label: 'snake_case' }, { value: 'kebab', label: 'kebab-case' }, { value: 'constant', label: 'CONSTANT' }, { value: 'slug', label: 'slug' }, { value: 'reverse', label: 'reverse' }, { value: 'count', label: 'count' }];
      case 'json': return [{ value: 'format', label: 'Format' }, { value: 'minify', label: 'Minify' }, { value: 'validate', label: 'Validate' }];
      case 'number-base': return [{ value: 'decimal', label: 'From Decimal' }, { value: 'binary', label: 'From Binary' }, { value: 'hex', label: 'From Hex' }, { value: 'octal', label: 'From Octal' }];
      case 'lorem': return [{ value: 'words', label: 'Words' }, { value: 'sentences', label: 'Sentences' }, { value: 'paragraphs', label: 'Paragraphs' }];
      case 'markdown': return [{ value: 'toHtml', label: 'To HTML' }, { value: 'strip', label: 'Strip' }];
      case 'timestamp': return [{ value: 'now', label: 'Now' }, { value: 'toDate', label: 'To Date' }, { value: 'fromDate', label: 'From Date' }, { value: 'format', label: 'Format' }];
      default: return [];
    }
  };

  const getPlaceholder = (): string => {
    switch (toolSlug) {
      case 'base64': return mode === 'decode' ? 'SGVsbG8gV29ybGQ=' : 'Hello World';
      case 'url': return mode === 'buildQuery' ? '{"name":"John","age":30}' : mode === 'parseQuery' ? '?name=John&age=30' : mode === 'decode' ? 'hello%20world' : 'hello world&foo=bar';
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
      case 'qr': return 'https://toolmetryai.com';
      case 'markdown': return '# Hello **World**\n\nThis is a paragraph with [a link](https://example.com).';
      case 'timestamp': return mode === 'fromDate' ? '2024-06-03' : String(Math.floor(Date.now() / 1000));
      default: return 'Enter input...';
    }
  };

  const modes = getModes();

  return (
    <div className="rounded-lg border border-[#1A1A1A] overflow-hidden">
      {modes.length > 0 && (
        <div className="flex flex-wrap gap-1 p-2 bg-[#111111] border-b border-[#1A1A1A]">
          {modes.map(m => (
            <button
              key={m.value}
              onClick={() => { setMode(m.value); setOutput(''); }}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                (mode || modes[0].value) === m.value
                  ? 'bg-[#0C2E76] text-white'
                  : 'bg-[#1A1A1A] text-[#999] hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 space-y-3">
        {toolSlug !== 'uuid' && (
          <div>
            <label className="text-[11px] font-medium text-[#666] mb-1.5 block">Input</label>
            <textarea
              className="w-full rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono leading-relaxed text-white placeholder:text-[#444] focus:outline-none focus:border-[#0C2E76] resize-y min-h-[70px]"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              rows={3}
            />
          </div>
        )}

        {toolSlug === 'encrypt' && (
          <div>
            <label className="text-[11px] font-medium text-[#666] mb-1.5 block">Secret Key</label>
            <input
              type="text"
              className="w-full rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2 text-sm font-mono text-white placeholder:text-[#444] focus:outline-none focus:border-[#0C2E76]"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="my-password"
            />
          </div>
        )}

        <button
          onClick={runTool}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#0C2E76] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a44a8] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          )}
          {toolSlug === 'uuid' ? 'Generate' : 'Run'}
        </button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium text-[#666]">Output</label>
              <button
                onClick={handleCopy}
                className="text-[11px] font-medium text-[#666] hover:text-white transition-colors"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            {toolSlug === 'qr' && output.startsWith('http') ? (
              <div className="space-y-3">
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <img src={output} alt="Generated QR Code" className="w-48 h-48 sm:w-56 sm:h-56" />
                </div>
                <pre className="w-full rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono break-all whitespace-pre-wrap max-h-20 overflow-y-auto text-[#ccc]">
                  {output}
                </pre>
              </div>
            ) : (
              <pre className="w-full rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono break-all whitespace-pre-wrap max-h-56 overflow-y-auto text-[#ccc]">
                {output}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
