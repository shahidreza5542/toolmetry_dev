/**
 * toolmetry-browser.ts
 * Direct wrapper for the `toolmetry` npm package.
 * Uses the ACTUAL package functions — encryptAsync, decryptAsync, hashAsync,
 * base64, url, jwt, uuid, color, htmlEntity, numberBase, text, json,
 * password, morse, roman, cron, diff, lorem, random — all from `npm i toolmetry`.
 *
 * Only hashAllAsync is a thin wrapper since the package's hashAll() is sync-only.
 */

// Type definitions for the toolmetry module
interface ToolmetryModule {
  base64: {
    encode(input: string, encoding?: string): string;
    decode(input: string, encoding?: string): string;
    encodeURL(input: string): string;
    decodeURL(input: string): string;
    isValid(input: string): boolean;
    encodeBuffer(buffer: ArrayBuffer | Uint8Array): string;
    decodeToBuffer(input: string): Uint8Array;
  };
  url: {
    encode(input: string): string;
    decode(input: string): string;
    buildQuery(params: Record<string, string | number | boolean>): string;
    parseQuery(qs: string): Record<string, string>;
  };
  jwt: {
    decode(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string };
    decodeHeader(token: string): Record<string, unknown>;
    decodePayload(token: string): Record<string, unknown>;
    isExpired(token: string, graceSeconds?: number): boolean;
    isValidFormat(token: string): boolean;
    getAlgorithm(token: string): string | null;
    timeUntilExpiry(token: string): number | null;
  };
  uuid: {
    v4(): string;
    v4Short(): string;
    v4Batch(count: number): string[];
    isValid(input: string): boolean;
    getVersion(input: string): number | null;
    nil(): string;
    isNil(input: string): boolean;
  };
  color: {
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
  };
  htmlEntity: {
    encode(input: string): string;
    decode(input: string): string;
    encodeAll(input: string): string;
    encodeChars(input: string, chars: string[]): string | Record<string, string>;
  };
  numberBase: {
    convert(value: string, fromBase: number, toBase: number): string;
    toBinary(value: string | number): string;
    toOctal(value: string | number): string;
    toHex(value: string | number): string;
    fromBinary(value: string): number | string;
    fromHex(value: string): number | string;
    convertAll(value: string | number, fromBase?: number): Record<string, string>;
  };
  text: {
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
  };
  json: {
    format(input: string, indent?: number): string;
    minify(input: string): string;
    validate(input: string): { valid: boolean; error: string | null; position: { line: number; column: number } | null };
    getType(input: string): string;
    stats(input: string): { type: string; keys: number; depth: number; size: number };
    flatten(input: string): Record<string, unknown>;
  };
  password: {
    generate(options?: Record<string, unknown>): string;
    passphrase(options?: Record<string, unknown>): string;
    strength(password: string): { score: number; label: string; suggestions: string[] };
    generateBatch(count: number, options?: Record<string, unknown>): string[];
  };
  morse: {
    encode(input: string): string;
    decode(input: string): string;
    isValid(input: string): boolean;
  };
  roman: {
    toRoman(num: number): string;
    fromRoman(str: string): number;
    isValidRoman(str: string): boolean;
  };
  cron: {
    validate(expression: string): { valid: boolean; error: string | null; fields: Record<string, unknown> | null };
    describe(expression: string): string;
  };
  diff: {
    diff(oldText: string, newText: string): { lines: Array<{ type: string; content: string }>; stats: { added: number; removed: number; unchanged: number } };
    unifiedDiff(oldText: string, newText: string, oldLabel?: string, newLabel?: string): string;
    isSame(a: string, b: string): boolean;
  };
  lorem: {
    words(count?: number): string;
    sentences(count?: number): string;
    paragraphs(count?: number): string;
  };
  random: {
    string(length?: number, options?: Record<string, unknown>): string;
    int(min: number, max: number): number;
    hex(length?: number): string;
    alphanumeric(length?: number): string;
    pick<T>(array: T[]): T;
    shuffle<T>(array: T[]): T[];
    boolean(): boolean;
    float(min: number, max: number, decimals?: number): number;
  };
  encrypt: {
    encrypt(plaintext: string, secret: string): string;
    decrypt(encrypted: string, secret: string): string;
    encryptAsync(plaintext: string, secret: string): Promise<string>;
    decryptAsync(encrypted: string, secret: string): Promise<string>;
  };
  hash: {
    hash(input: string, algorithm?: string, encoding?: string): string;
    hashAsync(input: string, algorithm?: string, encoding?: string): Promise<string>;
    hmac(input: string, secret: string, algorithm?: string): string;
    hashAll(input: string): Record<string, string>;
  };
}

// ─── Load the actual toolmetry npm package ────────────────────────────────────
// Uses require() to load the CJS entry directly.
// The ESM entry (index.mjs) uses `import from 'module'` which is Node.js-only.
// All toolmetry modules use try/catch for require('crypto'), so they gracefully
// fall back to browser SubtleCrypto / getRandomValues when crypto is unavailable.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const toolmetry: ToolmetryModule = require('toolmetry');

/**
 * Get the raw toolmetry module — all 18 modules, real functions.
 * This IS the package. No mocks, no reimplementations.
 */
export function getToolmetry(): ToolmetryModule {
  return toolmetry;
}

// ─── Thin async wrapper for hashAll (package only has sync hashAll) ───────────

/**
 * Async version of hashAll using the package's own hashAsync() for each algorithm.
 * Browser-safe because hashAsync() uses SubtleCrypto internally.
 */
export async function hashAllAsync(input: string): Promise<Record<string, string>> {
  const [sha1, sha256, sha384, sha512] = await Promise.all([
    toolmetry.hash.hashAsync(input, 'SHA-1'),
    toolmetry.hash.hashAsync(input, 'SHA-256'),
    toolmetry.hash.hashAsync(input, 'SHA-384'),
    toolmetry.hash.hashAsync(input, 'SHA-512'),
  ]);
  return { sha1, sha256, sha384, sha512 };
}

// ─── Run Tool Function — Direct Package Calls ────────────────────────────────

/**
 * Run any toolmetry function in the browser.
 * Every call goes directly to the REAL toolmetry package.
 * - encrypt → toolmetry.encrypt.encryptAsync() (browser SubtleCrypto)
 * - decrypt → toolmetry.encrypt.decryptAsync() (browser SubtleCrypto)
 * - hash → toolmetry.hash.hashAsync() (browser SubtleCrypto)
 * - all other tools → direct package calls (pure JS, browser-safe)
 */
export async function runToolFunction(
  toolSlug: string,
  mode: string,
  input: string,
  secret?: string
): Promise<string> {
  const t = toolmetry; // direct reference to the npm package

  switch (toolSlug) {
    // ─── Base64 ──────────────────────────────────────────────────────────
    case 'base64': {
      if (mode === 'decode') return t.base64.decode(input);
      return t.base64.encode(input);
    }

    // ─── URL ─────────────────────────────────────────────────────────────
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
        return JSON.stringify(t.url.parseQuery(input), null, 2);
      }
      return t.url.encode(input);
    }

    // ─── Hash ──── uses toolmetry.hash.hashAsync() ───────────────────────
    case 'hash': {
      if (mode === 'all') {
        const all = await hashAllAsync(input);
        return JSON.stringify(all, null, 2);
      }
      try {
        return await t.hash.hashAsync(input, mode || 'SHA-256');
      } catch {
        return `Error: Algorithm "${mode}" not supported in browser. Use SHA-1, SHA-256, SHA-384, or SHA-512.`;
      }
    }

    // ─── JWT ─────────────────────────────────────────────────────────────
    case 'jwt': {
      try {
        const decoded = t.jwt.decode(input);
        return JSON.stringify(decoded, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid JWT'}`;
      }
    }

    // ─── UUID ────────────────────────────────────────────────────────────
    case 'uuid': {
      const count = Math.max(1, Math.min(10, parseInt(input) || 1));
      const uuids = t.uuid.v4Batch(count);
      return count === 1 ? uuids[0] : uuids.join('\n');
    }

    // ─── AES-256 Encrypt ──── uses toolmetry.encrypt.encryptAsync() ─────
    case 'encrypt': {
      if (!input) return 'Error: Enter text to encrypt/decrypt';
      if (!secret) return 'Error: Enter a secret key';
      try {
        if (mode === 'decrypt') {
          return await t.encrypt.decryptAsync(input, secret);
        }
        return await t.encrypt.encryptAsync(input, secret);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Encryption failed'}`;
      }
    }

    // ─── Random ──────────────────────────────────────────────────────────
    case 'random': {
      switch (mode) {
        case 'int': {
          const parts = input.split(',').map(s => parseInt(s.trim()));
          return String(t.random.int(parts[0] || 1, parts[1] || 100));
        }
        case 'hex':
          return t.random.hex(Math.max(1, Math.min(128, parseInt(input) || 32)));
        case 'float': {
          const parts = input.split(',').map(s => parseFloat(s.trim()));
          return String(t.random.float(parts[0] || 0, parts[1] || 1, parts[2] || 4));
        }
        case 'boolean':
          return String(t.random.boolean());
        case 'alphanumeric':
          return t.random.alphanumeric(Math.max(1, Math.min(128, parseInt(input) || 16)));
        default:
          return t.random.string(Math.max(1, Math.min(128, parseInt(input) || 16)), { lowercase: true, uppercase: true, digits: true });
      }
    }

    // ─── Color ───────────────────────────────────────────────────────────
    case 'color': {
      try {
        return JSON.stringify(t.color.convert(input), null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid color'}`;
      }
    }

    // ─── HTML Entity ─────────────────────────────────────────────────────
    case 'html-entity': {
      if (mode === 'decode') return t.htmlEntity.decode(input);
      return t.htmlEntity.encode(input);
    }

    // ─── Number Base ─────────────────────────────────────────────────────
    case 'number-base': {
      const fromBase = mode === 'binary' ? 2 : mode === 'hex' ? 16 : mode === 'octal' ? 8 : 10;
      try {
        return JSON.stringify(t.numberBase.convertAll(input, fromBase), null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : 'Invalid number'}`;
      }
    }

    // ─── Text ────────────────────────────────────────────────────────────
    case 'text': {
      switch (mode || 'camel') {
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

    // ─── JSON ────────────────────────────────────────────────────────────
    case 'json': {
      if (mode === 'minify') return t.json.minify(input);
      if (mode === 'validate') {
        const result = t.json.validate(input);
        return result.valid ? 'Valid JSON!' : `Invalid JSON: ${result.error}`;
      }
      return t.json.format(input, 2);
    }

    // ─── Password ────────────────────────────────────────────────────────
    case 'password': {
      const length = Math.max(8, Math.min(128, parseInt(input) || 16));
      return t.password.generate({ length, symbols: true });
    }

    // ─── Morse ───────────────────────────────────────────────────────────
    case 'morse': {
      if (mode === 'decode') return t.morse.decode(input);
      return t.morse.encode(input);
    }

    // ─── Roman ───────────────────────────────────────────────────────────
    case 'roman': {
      if (mode === 'fromRoman') return String(t.roman.fromRoman(input));
      return t.roman.toRoman(parseInt(input) || 1);
    }

    // ─── Cron ────────────────────────────────────────────────────────────
    case 'cron': {
      if (input.startsWith('@')) return t.cron.describe(input);
      const result = t.cron.validate(input);
      if (result.valid) return `Valid: true\n${t.cron.describe(input)}`;
      return `Valid: false\nError: ${result.error}`;
    }

    // ─── Diff ────────────────────────────────────────────────────────────
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

    // ─── Lorem ───────────────────────────────────────────────────────────
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
