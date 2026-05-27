/**
 * Browser-compatible toolmetry functions for the Playground
 * These are pure JS implementations that work in the browser
 */

// ─── Base64 ─────────────────────────────────────────────────────────────────
export function base64Encode(input: string): string {
  return btoa(unescape(encodeURIComponent(input)));
}

export function base64Decode(input: string): string {
  return decodeURIComponent(escape(atob(input)));
}

export function base64IsValid(input: string): boolean {
  if (typeof input !== 'string') return false;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
}

// ─── URL ────────────────────────────────────────────────────────────────────
export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

export function urlDecode(input: string): string {
  return decodeURIComponent(input);
}

export function urlBuildQuery(params: Record<string, string | number | boolean>): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return entries.length > 0 ? '?' + entries.join('&') : '';
}

export function urlParseQuery(qs: string): Record<string, string> {
  const str = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!str) return {};
  const params: Record<string, string> = {};
  str.split('&').forEach(pair => {
    const [key, ...rest] = pair.split('=');
    if (key) params[decodeURIComponent(key)] = decodeURIComponent(rest.join('='));
  });
  return params;
}

// ─── Hash ───────────────────────────────────────────────────────────────────
export async function hashGenerate(input: string, algorithm: string = 'SHA-256'): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const bytes = new Uint8Array(hashBuffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── JWT ────────────────────────────────────────────────────────────────────
export function jwtDecode(token: string) {
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
  try {
    const { payload } = jwtDecode(token);
    if (!payload.exp) return false;
    return Date.now() / 1000 > payload.exp;
  } catch { return false; }
}

export function jwtIsValidFormat(token: string): boolean {
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(token);
}

// ─── UUID ───────────────────────────────────────────────────────────────────
export function uuidV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function uuidIsValid(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}

// ─── AES-256 (async, browser SubtleCrypto) ──────────────────────────────────
export async function aesEncrypt(plaintext: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  const key = await crypto.subtle.importKey({ name: 'AES-GCM' }, hash, { name: 'AES-GCM' }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(plaintext));
  const ivB64 = btoa(String.fromCharCode(...iv));
  const ctB64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
  return `${ivB64}:${ctB64}`;
}

export async function aesDecrypt(encrypted: string, secret: string): Promise<string> {
  const [ivB64, ctB64] = encrypted.split(':');
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  const key = await crypto.subtle.importKey({ name: 'AES-GCM' }, hash, { name: 'AES-GCM' }, false, ['decrypt']);
  const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(atob(ctB64), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}

// ─── Random ─────────────────────────────────────────────────────────────────
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const ALPHANUM = LOWER + UPPER + DIGITS;

export function randomString(length: number = 16, options: { lowercase?: boolean; uppercase?: boolean; digits?: boolean; symbols?: boolean } = {}): string {
  const { lowercase = true, uppercase = true, digits = true, symbols = false } = options;
  let chars = '';
  if (lowercase) chars += LOWER;
  if (uppercase) chars += UPPER;
  if (digits) chars += DIGITS;
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) throw new Error('At least one character set needed');
  const arr = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(arr, v => chars[v % chars.length]).join('');
}

export function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const arr = crypto.getRandomValues(new Uint32Array(1));
  return min + (arr[0] % range);
}

export function randomHex(length: number = 32): string {
  const arr = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(arr, v => (v % 16).toString(16)).join('');
}

export function randomAlphanumeric(length: number = 16): string {
  const arr = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(arr, v => ALPHANUM[v % ALPHANUM.length]).join('');
}

export function randomBoolean(): boolean {
  const arr = crypto.getRandomValues(new Uint8Array(1));
  return arr[0] % 2 === 1;
}

// ─── Color ──────────────────────────────────────────────────────────────────
export function hexToRgb(hex: string) {
  const h = hex.replace(/^#/, '').toLowerCase();
  const padded = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return {
    r: parseInt(padded.slice(0, 2), 16),
    g: parseInt(padded.slice(2, 4), 16),
    b: parseInt(padded.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

// ─── HTML Entity ────────────────────────────────────────────────────────────
export function htmlEntityEncode(input: string): string {
  return input.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] || ch));
}

export function htmlEntityDecode(input: string): string {
  const map: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
  let result = input.replace(/&[a-zA-Z]+;/g, entity => map[entity] || entity);
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  return result;
}

// ─── Number Base ────────────────────────────────────────────────────────────
export function toBinary(value: string | number): string { return Number(value).toString(2).toUpperCase(); }
export function toHex(value: string | number): string { return Number(value).toString(16).toUpperCase(); }
export function toOctal(value: string | number): string { return Number(value).toString(8).toUpperCase(); }

// ─── Text ───────────────────────────────────────────────────────────────────
export function toCamelCase(input: string): string {
  return input.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/^[A-Z]/, c => c.toLowerCase());
}
export function toSnakeCase(input: string): string {
  return input.replace(/([A-Z])/g, '_$1').replace(/[-\s]+/g, '_').replace(/^_/, '').toLowerCase();
}
export function toKebabCase(input: string): string {
  return input.replace(/([A-Z])/g, '-$1').replace(/[_\s]+/g, '-').replace(/^-/, '').toLowerCase();
}
export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
export function wordCount(input: string): number {
  return input.trim().split(/\s+/).filter(Boolean).length;
}

// ─── JSON ───────────────────────────────────────────────────────────────────
export function jsonFormat(input: string, indent: number = 2): string {
  return JSON.stringify(JSON.parse(input), null, indent);
}
export function jsonMinify(input: string): string {
  return JSON.stringify(JSON.parse(input));
}
export function jsonValidate(input: string) {
  try { JSON.parse(input); return { valid: true, error: null }; }
  catch (e: any) { return { valid: false, error: e.message }; }
}

// ─── Password ───────────────────────────────────────────────────────────────
export function passwordGenerate(options: { length?: number; lowercase?: boolean; uppercase?: boolean; digits?: boolean; symbols?: boolean } = {}): string {
  const { length = 16, lowercase = true, uppercase = true, digits = true, symbols = true } = options;
  let chars = '';
  if (lowercase) chars += LOWER;
  if (uppercase) chars += UPPER;
  if (digits) chars += DIGITS;
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) throw new Error('At least one character set needed');
  const arr = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(arr, v => chars[v % chars.length]).join('');
}

// ─── Morse ──────────────────────────────────────────────────────────────────
const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/',
};

const REVERSE_MORSE: Record<string, string> = {};
for (const [k, v] of Object.entries(MORSE_MAP)) REVERSE_MORSE[v] = k;

export function morseEncode(input: string): string {
  return input.toUpperCase().split('').map(c => MORSE_MAP[c] || '').filter(Boolean).join(' ');
}

export function morseDecode(input: string): string {
  return input.trim().split(/\s*\/\s*/).map(word =>
    word.trim().split(/\s+/).map(code => REVERSE_MORSE[code] || '').join('')
  ).join(' ');
}

// ─── Roman ──────────────────────────────────────────────────────────────────
const ROMAN_VALS: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function romanToRoman(num: number): string {
  let result = '';
  let remaining = num;
  for (const [value, symbol] of ROMAN_VALS) {
    while (remaining >= value) { result += symbol; remaining -= value; }
  }
  return result;
}

export function romanFromRoman(str: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const upper = str.toUpperCase();
  let result = 0;
  for (let i = 0; i < upper.length; i++) {
    const current = map[upper[i]];
    const next = map[upper[i + 1]];
    if (next && current < next) result -= current;
    else result += current;
  }
  return result;
}

// ─── Lorem ──────────────────────────────────────────────────────────────────
const LOREM = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud'];

export function loremWords(count: number = 30): string {
  return Array.from({ length: count }, (_, i) => LOREM[i % LOREM.length]).join(' ');
}

export function loremParagraphs(count: number = 3): string {
  return Array.from({ length: count }, () => {
    const len = 15 + Math.floor(Math.random() * 20);
    const words = Array.from({ length: len }, (_, i) => LOREM[i % LOREM.length]);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  }).join('\n\n');
}

// ─── Function registry for playground ───────────────────────────────────────
export interface PlaygroundFunction {
  name: string;
  category: string;
  params: { name: string; type: string; required: boolean; default?: string; placeholder?: string }[];
  execute: (...args: any[]) => any;
}

export const playgroundFunctions: PlaygroundFunction[] = [
  { name: 'base64Encode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'Hello, World!' }], execute: (input: string) => base64Encode(input) },
  { name: 'base64Decode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'SGVsbG8sIFdvcmxkIQ==' }], execute: (input: string) => base64Decode(input) },
  { name: 'base64IsValid', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'SGVsbG8=' }], execute: (input: string) => base64IsValid(input) },
  { name: 'urlEncode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'hello world' }], execute: (input: string) => urlEncode(input) },
  { name: 'urlDecode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'hello%20world' }], execute: (input: string) => urlDecode(input) },
  { name: 'urlBuildQuery', category: 'Encoding', params: [{ name: 'params (JSON)', type: 'string', required: true, placeholder: '{"name":"Toolmetry","v":3}' }], execute: (input: string) => urlBuildQuery(JSON.parse(input)) },
  { name: 'urlParseQuery', category: 'Encoding', params: [{ name: 'queryString', type: 'string', required: true, placeholder: '?name=Toolmetry&v=3' }], execute: (input: string) => urlParseQuery(input) },
  { name: 'hashGenerate', category: 'Security', params: [{ name: 'input', type: 'string', required: true, placeholder: 'hello world' }, { name: 'algorithm', type: 'string', required: false, default: 'SHA-256', placeholder: 'SHA-256' }], execute: async (input: string, algo: string) => hashGenerate(input, algo || 'SHA-256') },
  { name: 'jwtDecode', category: 'Security', params: [{ name: 'token', type: 'string', required: true, placeholder: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.abc' }], execute: (token: string) => jwtDecode(token) },
  { name: 'jwtIsExpired', category: 'Security', params: [{ name: 'token', type: 'string', required: true, placeholder: 'eyJhbGciOiJIUzI1NiJ9...' }], execute: (token: string) => jwtIsExpired(token) },
  { name: 'jwtIsValidFormat', category: 'Security', params: [{ name: 'token', type: 'string', required: true, placeholder: 'eyJhbGciOiJIUzI1NiJ9...' }], execute: (token: string) => jwtIsValidFormat(token) },
  { name: 'uuidV4', category: 'Identity', params: [], execute: () => uuidV4() },
  { name: 'uuidIsValid', category: 'Identity', params: [{ name: 'uuid', type: 'string', required: true, placeholder: '550e8400-e29b-41d4-a716-446655440000' }], execute: (uuid: string) => uuidIsValid(uuid) },
  { name: 'aesEncrypt', category: 'Security', params: [{ name: 'plaintext', type: 'string', required: true, placeholder: 'Secret message' }, { name: 'secret', type: 'string', required: true, placeholder: 'my-password' }], execute: (text: string, secret: string) => aesEncrypt(text, secret) },
  { name: 'aesDecrypt', category: 'Security', params: [{ name: 'encrypted', type: 'string', required: true, placeholder: 'iv:ciphertext' }, { name: 'secret', type: 'string', required: true, placeholder: 'my-password' }], execute: (enc: string, secret: string) => aesDecrypt(enc, secret) },
  { name: 'randomString', category: 'Utility', params: [{ name: 'length', type: 'number', required: false, default: '16', placeholder: '16' }], execute: (len: string) => randomString(parseInt(len) || 16) },
  { name: 'randomInt', category: 'Utility', params: [{ name: 'min', type: 'number', required: true, placeholder: '1' }, { name: 'max', type: 'number', required: true, placeholder: '100' }], execute: (min: string, max: string) => randomInt(parseInt(min), parseInt(max)) },
  { name: 'randomHex', category: 'Utility', params: [{ name: 'length', type: 'number', required: false, default: '32', placeholder: '32' }], execute: (len: string) => randomHex(parseInt(len) || 32) },
  { name: 'randomAlphanumeric', category: 'Utility', params: [{ name: 'length', type: 'number', required: false, default: '16', placeholder: '16' }], execute: (len: string) => randomAlphanumeric(parseInt(len) || 16) },
  { name: 'randomBoolean', category: 'Utility', params: [], execute: () => randomBoolean() },
  { name: 'hexToRgb', category: 'Design', params: [{ name: 'hex', type: 'string', required: true, placeholder: '#3B82F6' }], execute: (hex: string) => hexToRgb(hex) },
  { name: 'rgbToHex', category: 'Design', params: [{ name: 'r', type: 'number', required: true, placeholder: '59' }, { name: 'g', type: 'number', required: true, placeholder: '130' }, { name: 'b', type: 'number', required: true, placeholder: '246' }], execute: (r: string, g: string, b: string) => rgbToHex(parseInt(r), parseInt(g), parseInt(b)) },
  { name: 'htmlEntityEncode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: '<script>alert("xss")</script>' }], execute: (input: string) => htmlEntityEncode(input) },
  { name: 'htmlEntityDecode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: '&lt;hello&gt;' }], execute: (input: string) => htmlEntityDecode(input) },
  { name: 'toBinary', category: 'Math', params: [{ name: 'value', type: 'number', required: true, placeholder: '255' }], execute: (v: string) => toBinary(v) },
  { name: 'toHex', category: 'Math', params: [{ name: 'value', type: 'number', required: true, placeholder: '255' }], execute: (v: string) => toHex(v) },
  { name: 'toCamelCase', category: 'Text', params: [{ name: 'input', type: 'string', required: true, placeholder: 'hello world' }], execute: (input: string) => toCamelCase(input) },
  { name: 'toSnakeCase', category: 'Text', params: [{ name: 'input', type: 'string', required: true, placeholder: 'helloWorld' }], execute: (input: string) => toSnakeCase(input) },
  { name: 'toKebabCase', category: 'Text', params: [{ name: 'input', type: 'string', required: true, placeholder: 'helloWorld' }], execute: (input: string) => toKebabCase(input) },
  { name: 'slugify', category: 'Text', params: [{ name: 'input', type: 'string', required: true, placeholder: 'Hello World! 123' }], execute: (input: string) => slugify(input) },
  { name: 'wordCount', category: 'Text', params: [{ name: 'input', type: 'string', required: true, placeholder: 'hello world foo bar' }], execute: (input: string) => wordCount(input) },
  { name: 'jsonFormat', category: 'Data', params: [{ name: 'input', type: 'string', required: true, placeholder: '{"name":"Toolmetry","v":3}' }], execute: (input: string) => jsonFormat(input) },
  { name: 'jsonMinify', category: 'Data', params: [{ name: 'input', type: 'string', required: true, placeholder: '{ "name" : "Toolmetry" }' }], execute: (input: string) => jsonMinify(input) },
  { name: 'jsonValidate', category: 'Data', params: [{ name: 'input', type: 'string', required: true, placeholder: '{"valid":true}' }], execute: (input: string) => jsonValidate(input) },
  { name: 'passwordGenerate', category: 'Security', params: [{ name: 'length', type: 'number', required: false, default: '16', placeholder: '16' }], execute: (len: string) => passwordGenerate({ length: parseInt(len) || 16 }) },
  { name: 'morseEncode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: 'HELLO WORLD' }], execute: (input: string) => morseEncode(input) },
  { name: 'morseDecode', category: 'Encoding', params: [{ name: 'input', type: 'string', required: true, placeholder: '.... . .-.. .-.. ---' }], execute: (input: string) => morseDecode(input) },
  { name: 'romanToRoman', category: 'Math', params: [{ name: 'num', type: 'number', required: true, placeholder: '2024' }], execute: (num: string) => romanToRoman(parseInt(num)) },
  { name: 'romanFromRoman', category: 'Math', params: [{ name: 'str', type: 'string', required: true, placeholder: 'MMXXIV' }], execute: (str: string) => romanFromRoman(str) },
  { name: 'loremWords', category: 'Content', params: [{ name: 'count', type: 'number', required: false, default: '10', placeholder: '10' }], execute: (count: string) => loremWords(parseInt(count) || 10) },
  { name: 'loremParagraphs', category: 'Content', params: [{ name: 'count', type: 'number', required: false, default: '2', placeholder: '2' }], execute: (count: string) => loremParagraphs(parseInt(count) || 2) },
];
