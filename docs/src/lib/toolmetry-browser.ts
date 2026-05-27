/**
 * toolmetry-browser.ts
 * Browser-compatible wrapper for the `toolmetry` npm package.
 * Uses the actual npm package for all browser-safe modules,
 * and provides proper Web Crypto API implementations for encrypt/hash.
 */

// Type definitions for toolmetry module structure
interface ToolmetryBase64 {
  encode(input: string, encoding?: string): string;
  decode(input: string, encoding?: string): string;
  encodeURL(input: string): string;
  decodeURL(input: string): string;
  isValid(input: string): boolean;
  encodeBuffer(buffer: ArrayBuffer | Uint8Array): string;
  decodeToBuffer(input: string): Uint8Array;
}

interface ToolmetryUrl {
  encode(input: string): string;
  decode(input: string): string;
  buildQuery(params: Record<string, string | number | boolean>): string;
  parseQuery(qs: string): Record<string, string>;
}

interface ToolmetryJwt {
  decode(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string };
  decodeHeader(token: string): Record<string, unknown>;
  decodePayload(token: string): Record<string, unknown>;
  isExpired(token: string, graceSeconds?: number): boolean;
  isValidFormat(token: string): boolean;
  getAlgorithm(token: string): string | null;
  timeUntilExpiry(token: string): number | null;
}

interface ToolmetryUuid {
  v4(): string;
  v4Short(): string;
  v4Batch(count: number): string[];
  isValid(input: string): boolean;
  getVersion(input: string): number | null;
  nil(): string;
  isNil(input: string): boolean;
}

interface ToolmetryColor {
  hexToRgb(hex: string): { r: number; g: number; b: number };
  rgbToHex(r: number, g: number, b: number): string;
  rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
  hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number };
  hexToHsl(hex: string): { h: number; s: number; l: number };
  hslToHex(h: number, s: number, l: number): string;
  convert(input: string): Record<string, unknown>;
  isValidHex(hex: string): boolean;
  lighten(hex: string, amount: number): string;
  darken(hex: string, amount: number): string;
}

interface ToolmetryHtmlEntity {
  encode(input: string): string;
  decode(input: string): string;
  encodeAll(input: string): string;
  encodeChars(input: string, chars: string[]): string;
}

interface ToolmetryNumberBase {
  convert(value: string, fromBase: number, toBase: number): string;
  toBinary(value: string | number): string;
  toOctal(value: string | number): string;
  toHex(value: string | number): string;
  fromBinary(value: string): string;
  fromHex(value: string): string;
  convertAll(value: string | number, fromBase?: number): Record<string, string>;
}

interface ToolmetryText {
  toCamelCase(input: string): string;
  toPascalCase(input: string): string;
  toSnakeCase(input: string): string;
  toKebabCase(input: string): string;
  toConstantCase(input: string): string;
  slugify(input: string): string;
  wordCount(input: string): number;
  charCount(input: string, includeSpaces?: boolean): number;
  reverse(input: string): string;
  truncate(input: string, maxLength: number, suffix?: string): string;
  removeExtraWhitespace(input: string): string;
  removeLineBreaks(input: string): string;
  escapeRegex(input: string): string;
}

interface ToolmetryJson {
  format(input: string, indent?: number): string;
  minify(input: string): string;
  validate(input: string): { valid: boolean; error: string | null; position: { line: number; column: number } | null };
  getType(input: string): string;
  stats(input: string): { type: string; keys: number; depth: number; size: number };
  flatten(input: string): Record<string, unknown>;
}

interface ToolmetryPassword {
  generate(options?: Record<string, unknown>): string;
  passphrase(options?: Record<string, unknown>): string;
  strength(password: string): { score: number; label: string; suggestions: string[] };
  generateBatch(count: number, options?: Record<string, unknown>): string[];
}

interface ToolmetryMorse {
  encode(input: string): string;
  decode(input: string): string;
  isValid(input: string): boolean;
}

interface ToolmetryRoman {
  toRoman(num: number): string;
  fromRoman(str: string): number;
  isValidRoman(str: string): boolean;
}

interface ToolmetryCron {
  validate(expression: string): { valid: boolean; error: string | null; fields: Record<string, unknown> | null };
  describe(expression: string): string;
}

interface ToolmetryDiff {
  diff(oldText: string, newText: string): { lines: Array<{ type: string; content: string }>; stats: { added: number; removed: number; unchanged: number } };
  unifiedDiff(oldText: string, newText: string, oldLabel?: string, newLabel?: string): string;
  isSame(a: string, b: string): boolean;
}

interface ToolmetryLorem {
  words(count?: number): string;
  sentences(count?: number): string;
  paragraphs(count?: number): string;
}

interface ToolmetryRandom {
  string(length?: number, options?: Record<string, unknown>): string;
  int(min: number, max: number): number;
  hex(length?: number): string;
  alphanumeric(length?: number): string;
  pick<T>(array: T[]): T;
  shuffle<T>(array: T[]): T[];
  boolean(): boolean;
  float(min: number, max: number, decimals?: number): number;
}

interface ToolmetryEncrypt {
  encrypt(plaintext: string, secret: string): string;
  decrypt(encrypted: string, secret: string): string;
  encryptAsync(plaintext: string, secret: string): Promise<string>;
  decryptAsync(encrypted: string, secret: string): Promise<string>;
}

interface ToolmetryHash {
  hash(input: string, algorithm?: string, encoding?: string): string;
  hashAsync(input: string, algorithm?: string, encoding?: string): Promise<string>;
  hmac(input: string, secret: string, algorithm?: string): string;
  hashAll(input: string): Record<string, string>;
}

// The full toolmetry module type
interface ToolmetryModule {
  base64: ToolmetryBase64;
  url: ToolmetryUrl;
  jwt: ToolmetryJwt;
  uuid: ToolmetryUuid;
  color: ToolmetryColor;
  htmlEntity: ToolmetryHtmlEntity;
  numberBase: ToolmetryNumberBase;
  text: ToolmetryText;
  json: ToolmetryJson;
  password: ToolmetryPassword;
  morse: ToolmetryMorse;
  roman: ToolmetryRoman;
  cron: ToolmetryCron;
  diff: ToolmetryDiff;
  lorem: ToolmetryLorem;
  random: ToolmetryRandom;
  encrypt: ToolmetryEncrypt;
  hash: ToolmetryHash;
}

// Cached module reference
let _toolmetry: ToolmetryModule | null = null;

/**
 * Load the toolmetry npm package dynamically.
 * Works in browser because Next.js handles CJS->ESM interop.
 */
async function loadToolmetry(): Promise<ToolmetryModule> {
  if (_toolmetry) return _toolmetry;
  try {
    const mod = await import('toolmetry');
    _toolmetry = mod.default || mod;
    return _toolmetry!;
  } catch (e) {
    console.error('[toolmetry-browser] Failed to load toolmetry package:', e);
    throw new Error('Failed to load toolmetry package');
  }
}

// ─── AES-256 Encrypt/Decrypt (Browser-safe with FIXED importKey) ─────────────

function _bufferToBase64url(buffer: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function _base64urlToBuffer(b64url: string): Uint8Array {
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function _importAesKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  return crypto.subtle.importKey(
    'raw',  // FIXED: was { name: 'AES-GCM' } which caused the bug
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

async function aesEncryptAsync(plaintext: string, secret: string): Promise<string> {
  if (typeof plaintext !== 'string') throw new TypeError('Plaintext must be a string');
  if (typeof secret !== 'string' || secret.length < 1) throw new TypeError('Secret must be a non-empty string');

  const encoder = new TextEncoder();
  const keyMaterial = await _importAesKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    keyMaterial,
    encoded
  );

  const ivB64 = _bufferToBase64url(iv);
  const ctB64 = _bufferToBase64url(new Uint8Array(ciphertext));
  return `${ivB64}:${ctB64}`;
}

async function aesDecryptAsync(encrypted: string, secret: string): Promise<string> {
  if (typeof encrypted !== 'string') throw new TypeError('Encrypted text must be a string');
  if (typeof secret !== 'string' || secret.length < 1) throw new TypeError('Secret must be a non-empty string');

  const parts = encrypted.split(':');
  if (parts.length !== 2) throw new Error('Invalid encrypted format. Expected "iv:ciphertext"');

  const [ivB64, ctB64] = parts;
  const keyMaterial = await _importAesKey(secret);
  const iv = _base64urlToBuffer(ivB64);
  const ciphertext = _base64urlToBuffer(ctB64);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    keyMaterial,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

// ─── Hash (Browser-safe using SubtleCrypto) ─────────────────────────────────

const HASH_ALGO_MAP: Record<string, string> = {
  'md5': 'MD5', // Not supported by SubtleCrypto, will error
  'sha1': 'SHA-1',
  'sha-1': 'SHA-1',
  'sha256': 'SHA-256',
  'sha-256': 'SHA-256',
  'sha384': 'SHA-384',
  'sha-384': 'SHA-384',
  'sha512': 'SHA-512',
  'sha-512': 'SHA-512',
};

async function hashAsync(input: string, algorithm: string = 'SHA-256'): Promise<string> {
  const algo = HASH_ALGO_MAP[algorithm.toLowerCase()] || algorithm;
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashAllAsync(input: string): Promise<Record<string, string>> {
  const [sha1, sha256, sha384, sha512] = await Promise.all([
    hashAsync(input, 'SHA-1'),
    hashAsync(input, 'SHA-256'),
    hashAsync(input, 'SHA-384'),
    hashAsync(input, 'SHA-512'),
  ]);
  return { sha1, sha256, sha384, sha512 };
}

// ─── Exported API ────────────────────────────────────────────────────────────

/**
 * Get the raw toolmetry module (loads dynamically).
 * Use this for all browser-safe modules: base64, url, jwt, uuid, color,
 * htmlEntity, numberBase, text, json, password, morse, roman, cron, diff, lorem, random.
 */
export async function getToolmetry(): Promise<ToolmetryModule> {
  return loadToolmetry();
}

/**
 * Browser-safe AES-256-GCM encrypt (uses Web Crypto API with FIXED importKey).
 * Compatible with toolmetry's encryptAsync format: "iv:ciphertext" (Base64url).
 */
export { aesEncryptAsync, aesDecryptAsync };

/**
 * Browser-safe hash functions (uses Web Crypto API).
 */
export { hashAsync, hashAllAsync };

/**
 * Quick-access: Run a toolmetry function in the browser.
 * Automatically handles async for encrypt/hash operations.
 */
export async function runToolFunction(
  toolSlug: string,
  mode: string,
  input: string,
  secret?: string
): Promise<string> {
  const t = await loadToolmetry();

  switch (toolSlug) {
    case 'base64': {
      if (mode === 'decode') return t.base64.decode(input);
      return t.base64.encode(input);
    }
    case 'url': {
      if (mode === 'decode') return t.url.decode(input);
      if (mode === 'buildQuery') {
        try {
          const obj = JSON.parse(input);
          return t.url.buildQuery(obj);
        } catch {
          return 'Error: Input must be a JSON object like {"name":"John","age":30}';
        }
      }
      if (mode === 'parseQuery') {
        const result = t.url.parseQuery(input);
        return JSON.stringify(result, null, 2);
      }
      return t.url.encode(input);
    }
    case 'hash': {
      if (mode === 'all') {
        const all = await hashAllAsync(input);
        return JSON.stringify(all, null, 2);
      }
      const algo = mode || 'SHA-256';
      try {
        return await hashAsync(input, algo);
      } catch {
        return `Error: Algorithm "${algo}" not supported in browser. Use SHA-1, SHA-256, SHA-384, or SHA-512.`;
      }
    }
    case 'jwt': {
      try {
        const decoded = t.jwt.decode(input);
        return JSON.stringify(decoded, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid JWT'}`;
      }
    }
    case 'uuid': {
      const count = Math.max(1, Math.min(10, parseInt(input) || 1));
      const uuids = t.uuid.v4Batch(count);
      return count === 1 ? uuids[0] : uuids.join('\n');
    }
    case 'encrypt': {
      if (!input) return 'Error: Enter text to encrypt/decrypt';
      if (!secret) return 'Error: Enter a secret key';
      try {
        if (mode === 'decrypt') {
          return await aesDecryptAsync(input, secret);
        }
        return await aesEncryptAsync(input, secret);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Encryption failed'}`;
      }
    }
    case 'random': {
      switch (mode) {
        case 'int': {
          const parts = input.split(',').map(s => parseInt(s.trim()));
          const min = parts[0] || 1;
          const max = parts[1] || 100;
          return String(t.random.int(min, max));
        }
        case 'hex': {
          const len = Math.max(1, Math.min(128, parseInt(input) || 32));
          return t.random.hex(len);
        }
        case 'float': {
          const parts = input.split(',').map(s => parseFloat(s.trim()));
          const min = parts[0] || 0;
          const max = parts[1] || 1;
          const decimals = parts[2] || 4;
          return String(t.random.float(min, max, decimals));
        }
        case 'boolean': {
          return String(t.random.boolean());
        }
        case 'alphanumeric': {
          const len = Math.max(1, Math.min(128, parseInt(input) || 16));
          return t.random.alphanumeric(len);
        }
        default: {
          const len = Math.max(1, Math.min(128, parseInt(input) || 16));
          return t.random.string(len, { lowercase: true, uppercase: true, digits: true });
        }
      }
    }
    case 'color': {
      try {
        const result = t.color.convert(input);
        return JSON.stringify(result, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid color'}`;
      }
    }
    case 'html-entity': {
      if (mode === 'decode') return t.htmlEntity.decode(input);
      return t.htmlEntity.encode(input);
    }
    case 'number-base': {
      const fromBase = mode === 'binary' ? 2 : mode === 'hex' ? 16 : mode === 'octal' ? 8 : 10;
      try {
        const all = t.numberBase.convertAll(input, fromBase);
        return JSON.stringify(all, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid number'}`;
      }
    }
    case 'text': {
      const caseType = mode || 'camel';
      switch (caseType) {
        case 'camel': return t.text.toCamelCase(input);
        case 'pascal': return t.text.toPascalCase(input);
        case 'snake': return t.text.toSnakeCase(input);
        case 'kebab': return t.text.toKebabCase(input);
        case 'constant': return t.text.toConstantCase(input);
        case 'slug': return t.text.slugify(input);
        case 'reverse': return t.text.reverse(input);
        case 'count': {
          const words = t.text.wordCount(input);
          const chars = t.text.charCount(input);
          const charsNoSpace = t.text.charCount(input, false);
          return `Words: ${words}\nCharacters (with spaces): ${chars}\nCharacters (no spaces): ${charsNoSpace}`;
        }
        default: return input;
      }
    }
    case 'json': {
      if (mode === 'minify') {
        return t.json.minify(input);
      }
      if (mode === 'validate') {
        const result = t.json.validate(input);
        return result.valid ? 'Valid JSON!' : `Invalid JSON: ${result.error}`;
      }
      return t.json.format(input, 2);
    }
    case 'password': {
      const length = Math.max(8, Math.min(128, parseInt(input) || 16));
      return t.password.generate({ length, symbols: true });
    }
    case 'morse': {
      if (mode === 'decode') return t.morse.decode(input);
      return t.morse.encode(input);
    }
    case 'roman': {
      if (mode === 'fromRoman') return String(t.roman.fromRoman(input));
      return t.roman.toRoman(parseInt(input) || 1);
    }
    case 'cron': {
      if (input.startsWith('@')) {
        const desc = t.cron.describe(input);
        return desc;
      }
      const result = t.cron.validate(input);
      if (result.valid) {
        const desc = t.cron.describe(input);
        return `Valid: true\n${desc}`;
      }
      return `Valid: false\nError: ${result.error}`;
    }
    case 'diff': {
      const parts = input.split('---');
      const oldText = (parts[0] || '').trim();
      const newText = (parts[1] || '').trim();
      if (!oldText && !newText) {
        return 'Enter two texts separated by "---" on a new line.\nExample:\nHello World\n---\nHello Earth';
      }
      const result = t.diff.diff(oldText, newText);
      const output = result.lines.map(l => `${l.type === 'added' ? '+ ' : l.type === 'removed' ? '- ' : '  '}${l.content}`).join('\n');
      return `${output}\n\nStats: +${result.stats.added} -${result.stats.removed} unchanged:${result.stats.unchanged}`;
    }
    case 'lorem': {
      const count = Math.max(1, Math.min(100, parseInt(input) || 5));
      if (mode === 'sentences') return t.lorem.sentences(count);
      if (mode === 'paragraphs') return t.lorem.paragraphs(count);
      return t.lorem.words(count);
    }
    default:
      return 'Interactive demo not available for this tool.';
  }
}
