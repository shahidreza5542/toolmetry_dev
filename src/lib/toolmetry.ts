/**
 * toolmetry — Browser-Compatible Implementation
 *
 * This file provides the exact same API as the `toolmetry` npm package (v1.0.3),
 * but uses Web Crypto API instead of Node.js `require('crypto')`.
 *
 * It works in BOTH browser and Vercel SSR environments.
 *
 * When the package is published to npm, you can switch imports back to:
 *   import { ... } from 'toolmetry';
 *
 * For now, we use:
 *   import { ... } from '@/lib/toolmetry';
 */

// ─── Base64 ──────────────────────────────────────────────────────────────────

export function base64Encode(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch {
    throw new Error('Invalid input for Base64 encoding');
  }
}

export function base64Decode(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input.trim())));
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

export function base64EncodeURL(input: string): string {
  return base64Encode(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64DecodeURL(input: string): string {
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  return base64Decode(b64);
}

export function base64IsValid(input: string): boolean {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
}

export const base64 = {
  encode: base64Encode,
  decode: base64Decode,
  encodeURL: base64EncodeURL,
  decodeURL: base64DecodeURL,
  isValid: base64IsValid,
};

// ─── URL ─────────────────────────────────────────────────────────────────────

export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

export function urlDecode(input: string): string {
  return decodeURIComponent(input);
}

export function urlBuildQuery(params: Record<string, string | number | boolean>): string {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  return entries.length > 0
    ? '?' + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
    : '';
}

export function urlParseQuery(qs: string): Record<string, string> {
  const str = qs.startsWith('?') ? qs.slice(1) : qs;
  const result: Record<string, string> = {};
  str.split('&').forEach(pair => {
    const [key, ...rest] = pair.split('=');
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(rest.join('='));
  });
  return result;
}

export const url = {
  encode: urlEncode,
  decode: urlDecode,
  buildQuery: urlBuildQuery,
  parseQuery: urlParseQuery,
};

// ─── Hash ────────────────────────────────────────────────────────────────────

export async function hashAsync(input: string, algorithm: string = 'SHA-256'): Promise<string> {
  const algo = algorithm as AlgorithmIdentifier;
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashAll(input: string): Promise<Record<string, string>> {
  const [sha1, sha256, sha384, sha512] = await Promise.all([
    hashAsync(input, 'SHA-1'),
    hashAsync(input, 'SHA-256'),
    hashAsync(input, 'SHA-384'),
    hashAsync(input, 'SHA-512'),
  ]);
  return { sha1, sha256, sha384, sha512 };
}

export const hash = {
  hashAsync,
  hashAll,
};

// ─── JWT ─────────────────────────────────────────────────────────────────────

export function jwtDecode(token: string): { header: any; payload: any; signature: string } {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts');
  const decode64 = (b64url: string) => {
    let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  };
  return { header: decode64(parts[0]), payload: decode64(parts[1]), signature: parts[2] };
}

export function jwtIsExpired(token: string): boolean {
  const { payload } = jwtDecode(token);
  if (!payload.exp) return false;
  return Date.now() / 1000 > payload.exp;
}

export function jwtIsValidFormat(token: string): boolean {
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(token);
}

export const jwt = {
  decode: jwtDecode,
  isExpired: jwtIsExpired,
  isValidFormat: jwtIsValidFormat,
};

// ─── UUID ────────────────────────────────────────────────────────────────────

export function uuidV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function uuidV4Short(): string {
  return uuidV4().replace(/-/g, '');
}

export function uuidV4Batch(count: number): string[] {
  return Array.from({ length: count }, () => uuidV4());
}

export function uuidIsValid(input: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}

export const uuid = {
  v4: uuidV4,
  v4Short: uuidV4Short,
  v4Batch: uuidV4Batch,
  isValid: uuidIsValid,
};

// ─── AES-256 Encrypt/Decrypt ────────────────────────────────────────────────

export async function aesEncryptAsync(plaintext: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const keyBytes = await crypto.subtle.digest('SHA-256', keyData);
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const ivB64 = btoa(String.fromCharCode(...iv));
  const ctB64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
  return `${ivB64}:${ctB64}`;
}

export async function aesDecryptAsync(encrypted: string, secret: string): Promise<string> {
  const parts = encrypted.split(':');
  if (parts.length !== 2) throw new Error('Invalid format. Expected "iv:ciphertext"');
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const keyBytes = await crypto.subtle.digest('SHA-256', keyData);
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']);
  const iv = Uint8Array.from(atob(parts[0]), c => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}

export const encrypt = {
  encryptAsync: aesEncryptAsync,
  decryptAsync: aesDecryptAsync,
};

// ─── Random ──────────────────────────────────────────────────────────────────

export function randomString(
  length: number = 16,
  options?: { lowercase?: boolean; uppercase?: boolean; digits?: boolean; symbols?: boolean }
): string {
  const opts = { lowercase: true, uppercase: true, digits: true, symbols: false, ...options };
  let chars = '';
  if (opts.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.digits) chars += '0123456789';
  if (opts.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) throw new Error('At least one character set needed');
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, v => chars[v % chars.length]).join('');
}

export function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const maxValid = Math.floor((0x100000000 - range % 0x100000000) / range) * range;
  const arr = new Uint32Array(1);
  let val: number;
  do {
    crypto.getRandomValues(arr);
    val = arr[0];
  } while (val >= maxValid);
  return min + (val % range);
}

export function randomHex(length: number = 32): string {
  const arr = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('').slice(0, length);
}

export function randomAlphanumeric(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, v => chars[v % chars.length]).join('');
}

export function randomBoolean(): boolean {
  const arr = new Uint8Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % 2 === 1;
}

export function randomFloat(min: number = 0, max: number = 1, decimals: number = 4): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const scaled = arr[0] / 0x100000000;
  const result = min + scaled * (max - min);
  const factor = Math.pow(10, decimals);
  return Math.round(result * factor) / factor;
}

export const random = {
  string: randomString,
  int: randomInt,
  hex: randomHex,
  alphanumeric: randomAlphanumeric,
  boolean: randomBoolean,
  float: randomFloat,
};

// ─── Color ───────────────────────────────────────────────────────────────────

export function colorConvert(input: string): Record<string, any> {
  let hex: string, rgb: { r: number; g: number; b: number };

  if (input.startsWith('#')) {
    hex = input.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    rgb = {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
    hex = '#' + hex.toLowerCase();
  } else if (input.startsWith('rgb')) {
    const match = input.match(/(\d+)/g);
    if (!match || match.length < 3) throw new Error('Invalid RGB color');
    rgb = { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
    hex = '#' + [rgb.r, rgb.g, rgb.b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
  } else {
    throw new Error('Unsupported color format. Use HEX (#RRGGBB) or RGB (rgb(r, g, b))');
  }

  // RGB to HSL
  const r1 = rgb.r / 255, g1 = rgb.g / 255, b1 = rgb.b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
    else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
    else h = ((r1 - g1) / d + 4) / 6;
  }

  return {
    hex,
    rgb,
    hsl: {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    },
    cssRgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    cssHsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
  };
}

export const color = {
  convert: colorConvert,
};

// ─── HTML Entity ─────────────────────────────────────────────────────────────

export function htmlEntityEncode(input: string): string {
  return input.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c
  );
}

export function htmlEntityDecode(input: string): string {
  return input.replace(/&(amp|lt|gt|quot|#39|apos);/g, e =>
    ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" })[e] || e
  );
}

export const htmlEntity = {
  encode: htmlEntityEncode,
  decode: htmlEntityDecode,
};

// ─── Number Base ─────────────────────────────────────────────────────────────

export function convertAllBases(value: string | number, fromBase: number = 10): Record<string, string> {
  const num = typeof value === 'number' ? value : parseInt(value, fromBase);
  if (isNaN(num)) throw new Error('Invalid number for base conversion');
  return {
    decimal: num.toString(10),
    binary: num.toString(2),
    octal: num.toString(8),
    hex: num.toString(16).toUpperCase(),
  };
}

export const numberBase = {
  convertAll: convertAllBases,
};

// ─── Text ────────────────────────────────────────────────────────────────────

export function toCamelCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase())
    .replace(/[\s_-]+/g, '');
}

export function toPascalCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase())
    .replace(/[\s_-]+/g, '');
}

export function toSnakeCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

export function toKebabCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toConstantCase(input: string): string {
  return toSnakeCase(input).toUpperCase();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function wordCount(input: string): number {
  return input.trim() ? input.trim().split(/\s+/).length : 0;
}

export function charCount(input: string, includeSpaces: boolean = true): number {
  return includeSpaces ? input.length : input.replace(/\s/g, '').length;
}

export function reverse(input: string): string {
  return input.split('').reverse().join('');
}

export const text = {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  slugify,
  wordCount,
  charCount,
  reverse,
};

// ─── JSON ────────────────────────────────────────────────────────────────────

export function jsonFormat(input: string, indent: number = 2): string {
  return JSON.stringify(JSON.parse(input), null, indent);
}

export function jsonMinify(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

export function jsonValidate(input: string): { valid: boolean; error: string | null } {
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (e: any) {
    return { valid: false, error: e.message };
  }
}

export const json = {
  format: jsonFormat,
  minify: jsonMinify,
  validate: jsonValidate,
};

// ─── Password ────────────────────────────────────────────────────────────────

export function passwordGenerate(options?: { length?: number; symbols?: boolean; digits?: boolean; uppercase?: boolean; lowercase?: boolean }): string {
  const opts = { length: 16, symbols: true, digits: true, uppercase: true, lowercase: true, ...options };
  let chars = '';
  if (opts.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.digits) chars += '0123456789';
  if (opts.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  return Array.from(arr, v => chars[v % chars.length]).join('');
}

export const password = {
  generate: passwordGenerate,
};

// ─── Morse Code ──────────────────────────────────────────────────────────────

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
};

const MORSE_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export function morseEncode(input: string): string {
  return input
    .toUpperCase()
    .split('')
    .map(c => c === ' ' ? '/' : MORSE_MAP[c] || c)
    .join(' ');
}

export function morseDecode(input: string): string {
  return input
    .split(' ')
    .map(c => c === '/' ? ' ' : MORSE_REVERSE[c] || c)
    .join('');
}

export const morse = {
  encode: morseEncode,
  decode: morseDecode,
};

// ─── Roman Numerals ──────────────────────────────────────────────────────────

const ROMAN_VALUES: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const ROMAN_DIGITS: Record<string, number> = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

export function romanToRoman(num: number): string {
  if (num < 1 || num > 3999) throw new Error('Number must be between 1 and 3999');
  let result = '';
  let n = num;
  for (const [val, sym] of ROMAN_VALUES) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
}

export function romanFromRoman(str: string): number {
  const upper = str.toUpperCase();
  let result = 0;
  for (let i = 0; i < upper.length; i++) {
    const curr = ROMAN_DIGITS[upper[i]];
    const next = ROMAN_DIGITS[upper[i + 1]];
    if (curr === undefined) throw new Error(`Invalid Roman numeral character: ${upper[i]}`);
    if (next && curr < next) result -= curr;
    else result += curr;
  }
  return result;
}

export const roman = {
  toRoman: romanToRoman,
  fromRoman: romanFromRoman,
};

// ─── Cron Validator ──────────────────────────────────────────────────────────

const CRON_ALIASES: Record<string, string> = {
  '@yearly': 'Runs once a year (midnight, January 1st)',
  '@annually': 'Runs once a year (midnight, January 1st)',
  '@monthly': 'Runs once a month (midnight, first of month)',
  '@weekly': 'Runs once a week (midnight on Sunday)',
  '@daily': 'Runs once a day (at midnight)',
  '@midnight': 'Runs once a day (at midnight)',
  '@hourly': 'Runs once an hour (at minute 0)',
};

export function cronValidate(expression: string): { valid: boolean; error: string | null } {
  const trimmed = expression.trim();

  // Handle aliases
  if (trimmed.startsWith('@')) {
    if (CRON_ALIASES[trimmed]) return { valid: true, error: null };
    return { valid: false, error: `Unknown alias: ${trimmed}` };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 5) return { valid: false, error: 'Cron expression must have exactly 5 fields (minute hour day month weekday)' };

  const ranges = [
    { name: 'minute', min: 0, max: 59 },
    { name: 'hour', min: 0, max: 23 },
    { name: 'day', min: 1, max: 31 },
    { name: 'month', min: 1, max: 12 },
    { name: 'weekday', min: 0, max: 6 },
  ];

  for (let i = 0; i < 5; i++) {
    const part = parts[i];
    const range = ranges[i];
    // Allow *, */n, n, n-m, n,m,o
    if (part === '*') continue;
    if (part.startsWith('*/')) {
      const n = parseInt(part.slice(2));
      if (isNaN(n) || n < 1) return { valid: false, error: `Invalid ${range.name} field: ${part}` };
      continue;
    }
    const items = part.split(',');
    for (const item of items) {
      if (item.includes('-')) {
        const [from, to] = item.split('-').map(Number);
        if (isNaN(from) || isNaN(to) || from < range.min || to > range.max) {
          return { valid: false, error: `Invalid ${range.name} range: ${item}` };
        }
      } else {
        const n = parseInt(item);
        if (isNaN(n) || n < range.min || n > range.max) {
          return { valid: false, error: `Invalid ${range.name} value: ${item}` };
        }
      }
    }
  }

  return { valid: true, error: null };
}

export function cronDescribe(expression: string): string {
  const trimmed = expression.trim();

  if (CRON_ALIASES[trimmed]) return CRON_ALIASES[trimmed];

  const v = cronValidate(trimmed);
  if (!v.valid) return `Invalid cron: ${v.error}`;

  const parts = trimmed.split(/\s+/);
  const [minute, hour, day, month, weekday] = parts;

  const describeField = (field: string, name: string): string => {
    if (field === '*') return `every ${name}`;
    return `${name} ${field}`;
  };

  const parts_desc = [
    describeField(minute, 'minute'),
    describeField(hour, 'hour'),
    describeField(day, 'day'),
    describeField(month, 'month'),
    describeField(weekday, 'weekday'),
  ];

  return `Cron: ${trimmed} (${parts_desc.join(', ')})`;
}

export const cron = {
  validate: cronValidate,
  describe: cronDescribe,
};

// ─── Diff Checker ────────────────────────────────────────────────────────────

export function diffCheck(oldText: string, newText: string): {
  lines: { type: 'added' | 'removed' | 'unchanged'; content: string }[];
  stats: { added: number; removed: number; unchanged: number };
} {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const maxLen = Math.max(oldLines.length, newLines.length);
  const lines: { type: 'added' | 'removed' | 'unchanged'; content: string }[] = [];
  let added = 0, removed = 0, unchanged = 0;

  for (let i = 0; i < maxLen; i++) {
    if (i < oldLines.length && i < newLines.length) {
      if (oldLines[i] === newLines[i]) {
        lines.push({ type: 'unchanged', content: oldLines[i] });
        unchanged++;
      } else {
        lines.push({ type: 'removed', content: oldLines[i] });
        lines.push({ type: 'added', content: newLines[i] });
        removed++;
        added++;
      }
    } else if (i < oldLines.length) {
      lines.push({ type: 'removed', content: oldLines[i] });
      removed++;
    } else {
      lines.push({ type: 'added', content: newLines[i] });
      added++;
    }
  }

  return { lines, stats: { added, removed, unchanged } };
}

export const diff = {
  diff: diffCheck,
};

// ─── Lorem Ipsum ─────────────────────────────────────────────────────────────

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

export function loremWords(count: number = 10): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  return result.join(' ');
}

export function loremSentences(count: number = 3): string {
  const sentenceTemplates = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];
  return Array.from({ length: count }, (_, i) => sentenceTemplates[i % sentenceTemplates.length]).join(' ');
}

export function loremParagraphs(count: number = 2): string {
  return Array.from({ length: count }, (_, i) =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Paragraph ${i + 1}.`
  ).join('\n\n');
}

export const lorem = {
  words: loremWords,
  sentences: loremSentences,
  paragraphs: loremParagraphs,
};
