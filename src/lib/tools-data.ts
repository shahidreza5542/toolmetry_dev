import {
  FileCode, Link, Shield, KeyRound, Fingerprint, Palette,
  Code2, Binary, Type, Braces, Lock, Radio, Hash,
  Clock, GitCompare, AlignLeft, LockKeyhole, Shuffle,
  QrCode, FileText, Timer
} from 'lucide-react';

export type Category = 'Encoding' | 'Security' | 'Identity' | 'Design' | 'Math' | 'Text' | 'Data' | 'Utility' | 'Content' | 'Conversion';

export interface ToolFunction {
  name: string;
  params: string;
  returns: string;
  description: string;
}

export interface ToolInfo {
  slug: string;
  name: string;
  icon: string;
  category: Category;
  description: string;
  importStatement: string;
  functions: ToolFunction[];
  examples: { title: string; code: string }[];
}

export const categories: Category[] = [
  'Encoding', 'Security', 'Identity', 'Design', 'Math', 'Text', 'Data', 'Utility', 'Content', 'Conversion'
];

export const categoryColors: Record<Category, string> = {
  Encoding: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Security: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Identity: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Design: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  Math: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Text: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Data: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  Utility: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Content: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  Conversion: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
};

export const tools: ToolInfo[] = [
  {
    slug: 'base64',
    name: 'Base64 Encode/Decode',
    icon: 'FileCode',
    category: 'Encoding',
    description: 'Encode and decode Base64 strings, with URL-safe and buffer support.',
    importStatement: `import { base64 } from 'toolmetry';`,
    functions: [
      { name: 'base64.encode', params: 'input: string, encoding?: string', returns: 'string', description: 'Encode a string to Base64' },
      { name: 'base64.decode', params: 'input: string, encoding?: string', returns: 'string', description: 'Decode a Base64 string' },
      { name: 'base64.encodeURL', params: 'input: string', returns: 'string', description: 'Encode to URL-safe Base64' },
      { name: 'base64.decodeURL', params: 'input: string', returns: 'string', description: 'Decode URL-safe Base64' },
      { name: 'base64.isValid', params: 'input: string', returns: 'boolean', description: 'Check if a string is valid Base64' },
      { name: 'base64.encodeBuffer', params: 'buffer: ArrayBuffer | Uint8Array', returns: 'string', description: 'Encode buffer to Base64' },
      { name: 'base64.decodeToBuffer', params: 'input: string', returns: 'Uint8Array', description: 'Decode Base64 to Uint8Array' },
    ],
    examples: [
      {
        title: 'Basic Encode/Decode',
        code: `import { base64 } from 'toolmetry';

const encoded = base64.encode('Hello, World!');
// "SGVsbG8sIFdvcmxkIQ=="

const decoded = base64.decode(encoded);
// "Hello, World!"`,
      },
      {
        title: 'URL-Safe Base64',
        code: `import { base64 } from 'toolmetry';

const urlSafe = base64.encodeURL('Hello+World/Test=');
// "SGVsbG8rV29ybGQvVGVzdA"

const original = base64.decodeURL(urlSafe);
// "Hello+World/Test="`,
      },
      {
        title: 'Validation',
        code: `import { base64 } from 'toolmetry';

base64.isValid('SGVsbG8='); // true
base64.isValid('not-base64!'); // false`,
      },
      {
        title: 'Buffer Operations',
        code: `import { base64 } from 'toolmetry';

const buffer = new Uint8Array([72, 101, 108, 108, 111]);
const encoded = base64.encodeBuffer(buffer);
// "SGVsbG8="

const decoded = base64.decodeToBuffer(encoded);
// Uint8Array [72, 101, 108, 108, 111]`,
      },
    ],
  },
  {
    slug: 'url',
    name: 'URL Encoder/Decoder',
    icon: 'Link',
    category: 'Encoding',
    description: 'Encode and decode URL components, build and parse query strings effortlessly.',
    importStatement: `import { url } from 'toolmetry';`,
    functions: [
      { name: 'url.encode', params: 'input: string', returns: 'string', description: 'URL-encode a string' },
      { name: 'url.decode', params: 'input: string', returns: 'string', description: 'Decode a URL-encoded string' },
      { name: 'url.buildQuery', params: 'params: Record<string, string|number|boolean>', returns: 'string', description: 'Build a query string from an object' },
      { name: 'url.parseQuery', params: 'qs: string', returns: 'Record<string, string>', description: 'Parse a query string into an object' },
    ],
    examples: [
      {
        title: 'Encode/Decode',
        code: `import { url } from 'toolmetry';

const encoded = url.encode('hello world&foo=bar');
// "hello%20world%26foo%3Dbar"

const decoded = url.decode(encoded);
// "hello world&foo=bar"`,
      },
      {
        title: 'Build Query String',
        code: `import { url } from 'toolmetry';

const qs = url.buildQuery({ name: 'John', age: 30, active: true });
// "?name=John&age=30&active=true"`,
      },
      {
        title: 'Parse Query String',
        code: `import { url } from 'toolmetry';

const params = url.parseQuery('?name=John&age=30');
// { name: "John", age: "30" }`,
      },
    ],
  },
  {
    slug: 'hash',
    name: 'Hash Generator',
    icon: 'Shield',
    category: 'Security',
    description: 'Generate hashes with MD5, SHA-1, SHA-256, SHA-384, SHA-512 and HMAC support.',
    importStatement: `import { hash } from 'toolmetry';`,
    functions: [
      { name: 'hashGenerate', params: 'input: string, algorithm?: string, encoding?: string', returns: 'string', description: 'Generate a hash (Node.js sync)' },
      { name: 'hashAsync', params: 'input: string, algorithm?: string, encoding?: string', returns: 'Promise<string>', description: 'Async hash (browser + Node)' },
      { name: 'hmacGenerate', params: 'input: string, secret: string, algorithm?: string', returns: 'string', description: 'Generate HMAC hash (Node.js)' },
      { name: 'hashAll', params: 'input: string', returns: 'Record<string, string>', description: 'Generate all algorithm hashes at once' },
    ],
    examples: [
      {
        title: 'SHA-256 Hash',
        code: `import { hashGenerate } from 'toolmetry';

const sha256 = hashGenerate('hello', 'sha256');
// "2cf24dba5fb0a30e26e83b2ac5b9e29e..."`,
      },
      {
        title: 'Async Hash (Browser)',
        code: `import { hashAsync } from 'toolmetry';

const hash = await hashAsync('hello', 'SHA-256');
// Works in both browser and Node.js`,
      },
      {
        title: 'All Hashes at Once',
        code: `import { hashAll } from 'toolmetry';

const all = hashAll('hello');
// { md5: "...", sha1: "...", sha256: "...", sha384: "...", sha512: "..." }`,
      },
      {
        title: 'HMAC',
        code: `import { hmacGenerate } from 'toolmetry';

const hmac = hmacGenerate('message', 'secret-key', 'sha256');
// Node.js only`,
      },
    ],
  },
  {
    slug: 'jwt',
    name: 'JWT Decoder',
    icon: 'KeyRound',
    category: 'Security',
    description: 'Decode and inspect JWT tokens without verification. Check expiry and claims.',
    importStatement: `import { jwt } from 'toolmetry';`,
    functions: [
      { name: 'jwt.decode', params: 'token: string', returns: '{ header, payload, signature }', description: 'Decode a JWT into its parts' },
      { name: 'jwt.decodeHeader', params: 'token: string', returns: 'object', description: 'Decode only the header' },
      { name: 'jwt.decodePayload', params: 'token: string', returns: 'object', description: 'Decode only the payload' },
      { name: 'jwt.isExpired', params: 'token: string, graceSeconds?: number', returns: 'boolean', description: 'Check if a JWT is expired' },
      { name: 'jwt.isValidFormat', params: 'token: string', returns: 'boolean', description: 'Validate JWT format' },
      { name: 'jwt.getAlgorithm', params: 'token: string', returns: 'string | null', description: 'Get the algorithm from JWT header' },
      { name: 'jwt.timeUntilExpiry', params: 'token: string', returns: 'number | null', description: 'Seconds until JWT expires' },
    ],
    examples: [
      {
        title: 'Decode a JWT',
        code: `import { jwt } from 'toolmetry';

const token = 'eyJhbGciOiJIUzI1NiIs...';

const { header, payload, signature } = jwt.decode(token);
// header: { alg: "HS256", typ: "JWT" }
// payload: { sub: "1234567890", name: "John", ... }`,
      },
      {
        title: 'Check Expiry',
        code: `import { jwt } from 'toolmetry';

const expired = jwt.isExpired(token); // true/false
const timeLeft = jwt.timeUntilExpiry(token); // seconds or null`,
      },
      {
        title: 'Get Algorithm',
        code: `import { jwt } from 'toolmetry';

const algo = jwt.getAlgorithm(token);
// "HS256"`,
      },
    ],
  },
  {
    slug: 'uuid',
    name: 'UUID Generator',
    icon: 'Fingerprint',
    category: 'Identity',
    description: 'Generate unique UUIDs instantly with batch creation, validation, and version inspection.',
    importStatement: `import { uuid } from 'toolmetry';`,
    functions: [
      { name: 'uuid.v4', params: '', returns: 'string', description: 'Generate a v4 UUID' },
      { name: 'uuid.v4Short', params: '', returns: 'string', description: 'Generate a v4 UUID without dashes' },
      { name: 'uuid.v4Batch', params: 'count: number', returns: 'string[]', description: 'Generate multiple UUIDs at once' },
      { name: 'uuid.isValid', params: 'input: string', returns: 'boolean', description: 'Validate a UUID string' },
      { name: 'uuid.getVersion', params: 'input: string', returns: 'number | null', description: 'Get UUID version number' },
      { name: 'uuid.nil', params: '', returns: 'string', description: 'Generate a NIL UUID' },
      { name: 'uuid.isNil', params: 'input: string', returns: 'boolean', description: 'Check if a UUID is NIL' },
    ],
    examples: [
      {
        title: 'Generate UUID',
        code: `import { uuid } from 'toolmetry';

const id = uuid.v4();
// "550e8400-e29b-41d4-a716-446655440000"

const short = uuid.v4Short();
// "550e8400e29b41d4a716446655440000"`,
      },
      {
        title: 'Batch Generation',
        code: `import { uuid } from 'toolmetry';

const ids = uuid.v4Batch(5);
// ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"]`,
      },
      {
        title: 'Validation & Version',
        code: `import { uuid } from 'toolmetry';

uuid.isValid('550e8400-e29b-41d4-a716-446655440000'); // true
uuid.getVersion('550e8400-e29b-41d4-a716-446655440000'); // 4
uuid.isNil(uuid.nil()); // true`,
      },
    ],
  },
  {
    slug: 'encrypt',
    name: 'AES-256 Encrypt/Decrypt',
    icon: 'LockKeyhole',
    category: 'Security',
    description: 'AES-256-GCM encryption for secure messages with PBKDF2 key derivation.',
    importStatement: `import { encrypt } from 'toolmetry';`,
    functions: [
      { name: 'aesEncrypt', params: 'plaintext: string, secret: string', returns: 'string', description: 'Encrypt text using AES-256-GCM (Node.js sync)' },
      { name: 'aesDecrypt', params: 'encrypted: string, secret: string', returns: 'string', description: 'Decrypt AES-256-GCM encrypted text (Node.js)' },
      { name: 'aesEncryptAsync', params: 'plaintext: string, secret: string', returns: 'Promise<string>', description: 'Async encrypt (browser + Node)' },
      { name: 'aesDecryptAsync', params: 'encrypted: string, secret: string', returns: 'Promise<string>', description: 'Async decrypt (browser + Node)' },
    ],
    examples: [
      {
        title: 'Encrypt & Decrypt (Node.js)',
        code: `import { aesEncrypt, aesDecrypt } from 'toolmetry';

const encrypted = aesEncrypt('Hello, secret!', 'my-password');
// "iv:authTag:ciphertext" (Base64 parts)

const decrypted = aesDecrypt(encrypted, 'my-password');
// "Hello, secret!"`,
      },
      {
        title: 'Async (Browser)',
        code: `import { aesEncryptAsync, aesDecryptAsync } from 'toolmetry';

const encrypted = await aesEncryptAsync('Hello!', 'my-password');
const decrypted = await aesDecryptAsync(encrypted, 'my-password');
// "Hello!"`,
      },
    ],
  },
  {
    slug: 'random',
    name: 'Random Generator',
    icon: 'Shuffle',
    category: 'Utility',
    description: 'Generate random strings, numbers, hex, alphanumeric, pick, shuffle, and more.',
    importStatement: `import { random } from 'toolmetry';`,
    functions: [
      { name: 'randomString', params: 'length?: number, options?: object', returns: 'string', description: 'Generate a random string with options' },
      { name: 'randomInt', params: 'min: number, max: number', returns: 'number', description: 'Random integer between min and max' },
      { name: 'randomHex', params: 'length?: number', returns: 'string', description: 'Generate a random hex string' },
      { name: 'randomAlphanumeric', params: 'length?: number', returns: 'string', description: 'Generate a random alphanumeric string' },
      { name: 'randomPick', params: 'array: Array', returns: 'any', description: 'Pick a random element from an array' },
      { name: 'randomShuffle', params: 'array: Array', returns: 'Array', description: 'Shuffle an array (Fisher-Yates)' },
      { name: 'randomBoolean', params: '', returns: 'boolean', description: 'Generate a random boolean' },
      { name: 'randomFloat', params: 'min: number, max: number, decimals?: number', returns: 'number', description: 'Random float between min and max' },
    ],
    examples: [
      {
        title: 'Random String',
        code: `import { randomString } from 'toolmetry';

const str = randomString(16, { lowercase: true, uppercase: true, digits: true });
// "aB3xY9kL2mN5pQ8"

const simple = randomString(8, { digits: true, symbols: false });
// "aB3xY9kL"`,
      },
      {
        title: 'Random Numbers',
        code: `import { randomInt, randomFloat } from 'toolmetry';

const int = randomInt(1, 100); // e.g. 42
const float = randomFloat(0, 1, 4); // e.g. 0.5321`,
      },
      {
        title: 'Hex & Alphanumeric',
        code: `import { randomHex, randomAlphanumeric } from 'toolmetry';

const hex = randomHex(32);
// "a1b2c3d4e5f6..."

const alpha = randomAlphanumeric(16);
// "aB3xY9kL2mN5pQ8"`,
      },
      {
        title: 'Pick & Shuffle',
        code: `import { randomPick, randomShuffle } from 'toolmetry';

const picked = randomPick(['apple', 'banana', 'cherry']);
// "banana"

const shuffled = randomShuffle([1, 2, 3, 4, 5]);
// [3, 1, 5, 2, 4]`,
      },
    ],
  },
  {
    slug: 'color',
    name: 'Color Converter',
    icon: 'Palette',
    category: 'Design',
    description: 'Convert between HEX, RGB, and HSL with lighten/darken helpers.',
    importStatement: `import { color } from 'toolmetry';`,
    functions: [
      { name: 'color.hexToRgb', params: 'hex: string', returns: '{ r, g, b }', description: 'Convert HEX to RGB' },
      { name: 'color.rgbToHex', params: 'r: number, g: number, b: number', returns: 'string', description: 'Convert RGB to HEX' },
      { name: 'color.rgbToHsl', params: 'r: number, g: number, b: number', returns: '{ h, s, l }', description: 'Convert RGB to HSL' },
      { name: 'color.hslToRgb', params: 'h: number, s: number, l: number', returns: '{ r, g, b }', description: 'Convert HSL to RGB' },
      { name: 'color.hexToHsl', params: 'hex: string', returns: '{ h, s, l }', description: 'Convert HEX to HSL' },
      { name: 'color.hslToHex', params: 'h: number, s: number, l: number', returns: 'string', description: 'Convert HSL to HEX' },
      { name: 'color.convert', params: 'input: string', returns: 'object', description: 'Convert any color format' },
      { name: 'color.isValidHex', params: 'hex: string', returns: 'boolean', description: 'Validate a HEX color' },
      { name: 'color.lighten', params: 'hex: string, amount: number', returns: 'string', description: 'Lighten a color by percentage' },
      { name: 'color.darken', params: 'hex: string, amount: number', returns: 'string', description: 'Darken a color by percentage' },
    ],
    examples: [
      {
        title: 'HEX to RGB',
        code: `import { color } from 'toolmetry';

const rgb = color.hexToRgb('#3B82F6');
// { r: 59, g: 130, b: 246 }`,
      },
      {
        title: 'Full Conversion',
        code: `import { color } from 'toolmetry';

const all = color.convert('#3B82F6');
// { hex: "#3b82f6", rgb: {r:59,g:130,b:246},
//   hsl: {h:217,s:91,l:60},
//   cssRgb: "rgb(59, 130, 246)",
//   cssHsl: "hsl(217, 91%, 60%)" }`,
      },
      {
        title: 'Lighten/Darken',
        code: `import { color } from 'toolmetry';

const lighter = color.lighten('#3B82F6', 20);
const darker = color.darken('#3B82F6', 20);`,
      },
    ],
  },
  {
    slug: 'html-entity',
    name: 'HTML Entity',
    icon: 'Code2',
    category: 'Encoding',
    description: 'Encode and decode HTML entities for special characters, named, and numeric.',
    importStatement: `import { htmlEntity } from 'toolmetry';`,
    functions: [
      { name: 'htmlEntity.encode', params: 'input: string', returns: 'string', description: 'Encode HTML special characters' },
      { name: 'htmlEntity.decode', params: 'input: string', returns: 'string', description: 'Decode HTML entities to characters' },
      { name: 'htmlEntity.encodeAll', params: 'input: string', returns: 'string', description: 'Encode all non-ASCII as numeric entities' },
      { name: 'htmlEntity.encodeChars', params: 'input: string, chars: string[]', returns: 'string', description: 'Encode only specific characters' },
    ],
    examples: [
      {
        title: 'Encode/Decode',
        code: `import { htmlEntity } from 'toolmetry';

const encoded = htmlEntity.encode('<div class="test">Hello & World</div>');
// "&lt;div class=&quot;test&quot;&gt;Hello &amp; World&lt;/div&gt;"

const decoded = htmlEntity.decode(encoded);
// "<div class="test">Hello & World</div>"`,
      },
      {
        title: 'Encode All Non-ASCII',
        code: `import { htmlEntity } from 'toolmetry';

const result = htmlEntity.encodeAll('Cafe\\u0301');
// "Caf&#233;"`,
      },
      {
        title: 'Encode Specific Characters',
        code: `import { htmlEntity } from 'toolmetry';

const result = htmlEntity.encodeChars('Hello & "World"', ['&', '"']);
// 'Hello &amp; &quot;World&quot;'`,
      },
    ],
  },
  {
    slug: 'number-base',
    name: 'Number Base',
    icon: 'Binary',
    category: 'Math',
    description: 'Convert between binary, octal, decimal, hex, and custom bases (2-36).',
    importStatement: `import { numberBase } from 'toolmetry';`,
    functions: [
      { name: 'baseConvert', params: 'value: string, fromBase: number, toBase: number', returns: 'string', description: 'Convert between any bases (2-36)' },
      { name: 'toBinary', params: 'value: string | number', returns: 'string', description: 'Convert decimal to binary' },
      { name: 'toOctal', params: 'value: string | number', returns: 'string', description: 'Convert decimal to octal' },
      { name: 'toHex', params: 'value: string | number', returns: 'string', description: 'Convert decimal to hexadecimal' },
      { name: 'fromBinary', params: 'value: string', returns: 'string', description: 'Convert binary to decimal' },
      { name: 'fromHex', params: 'value: string', returns: 'string', description: 'Convert hex to decimal' },
      { name: 'convertAllBases', params: 'value: string | number, fromBase?: number', returns: 'Record<string, string>', description: 'Convert to all common bases' },
    ],
    examples: [
      {
        title: 'Basic Conversion',
        code: `import { toHex, toBinary } from 'toolmetry';

const hex = toHex(255);
// "FF"

const binary = toBinary(10);
// "1010"`,
      },
      {
        title: 'Custom Base Conversion',
        code: `import { baseConvert } from 'toolmetry';

const result = baseConvert('FF', 16, 10);
// "255"`,
      },
      {
        title: 'Convert to All Bases',
        code: `import { convertAllBases } from 'toolmetry';

const all = convertAllBases(255);
// { decimal: "255", binary: "11111111", octal: "377", hex: "FF" }`,
      },
    ],
  },
  {
    slug: 'text',
    name: 'Text Utilities',
    icon: 'Type',
    category: 'Text',
    description: 'Case conversion, slugify, word/char counting, reverse, and more text utilities.',
    importStatement: `import { text } from 'toolmetry';`,
    functions: [
      { name: 'toCamelCase', params: 'input: string', returns: 'string', description: 'Convert to camelCase' },
      { name: 'toPascalCase', params: 'input: string', returns: 'string', description: 'Convert to PascalCase' },
      { name: 'toSnakeCase', params: 'input: string', returns: 'string', description: 'Convert to snake_case' },
      { name: 'toKebabCase', params: 'input: string', returns: 'string', description: 'Convert to kebab-case' },
      { name: 'toConstantCase', params: 'input: string', returns: 'string', description: 'Convert to CONSTANT_CASE' },
      { name: 'slugify', params: 'input: string', returns: 'string', description: 'Generate a URL-safe slug' },
      { name: 'wordCount', params: 'input: string', returns: 'number', description: 'Count words in a string' },
      { name: 'charCount', params: 'input: string, includeSpaces?: boolean', returns: 'number', description: 'Count characters' },
      { name: 'reverse', params: 'input: string', returns: 'string', description: 'Reverse a string' },
      { name: 'truncate', params: 'input: string, maxLength: number, suffix?: string', returns: 'string', description: 'Truncate with ellipsis' },
      { name: 'removeExtraWhitespace', params: 'input: string', returns: 'string', description: 'Collapse multiple spaces' },
      { name: 'removeLineBreaks', params: 'input: string', returns: 'string', description: 'Remove all line breaks' },
      { name: 'escapeRegex', params: 'input: string', returns: 'string', description: 'Escape for use in regex' },
    ],
    examples: [
      {
        title: 'Case Conversion',
        code: `import { toCamelCase, toPascalCase, toSnakeCase, toKebabCase, toConstantCase } from 'toolmetry';

toCamelCase('hello world example');  // "helloWorldExample"
toPascalCase('hello world example'); // "HelloWorldExample"
toSnakeCase('helloWorldExample');    // "hello_world_example"
toKebabCase('helloWorldExample');    // "hello-world-example"
toConstantCase('hello world');       // "HELLO_WORLD"`,
      },
      {
        title: 'Slugify',
        code: `import { slugify } from 'toolmetry';

slugify('My Blog Post Title!');
// "my-blog-post-title"`,
      },
      {
        title: 'Counting & Truncation',
        code: `import { wordCount, charCount, truncate } from 'toolmetry';

wordCount('Hello world example'); // 3
charCount('Hello'); // 5
truncate('A very long string here', 10); // "A ver..."`,
      },
    ],
  },
  {
    slug: 'json',
    name: 'JSON Tools',
    icon: 'Braces',
    category: 'Data',
    description: 'Format, minify, validate, flatten, and inspect JSON structures.',
    importStatement: `import { json } from 'toolmetry';`,
    functions: [
      { name: 'jsonFormat', params: 'input: string, indent?: number', returns: 'string', description: 'Format/prettify JSON' },
      { name: 'jsonMinify', params: 'input: string', returns: 'string', description: 'Minify JSON string' },
      { name: 'jsonValidate', params: 'input: string', returns: '{ valid, error, position }', description: 'Validate JSON and return error info' },
      { name: 'jsonGetType', params: 'input: string', returns: 'string', description: 'Get the type of a JSON value' },
      { name: 'jsonStats', params: 'input: string', returns: '{ type, keys, depth, size }', description: 'Get statistics about a JSON structure' },
      { name: 'jsonFlatten', params: 'input: string', returns: 'Record<string, unknown>', description: 'Flatten JSON to dot-notation object' },
    ],
    examples: [
      {
        title: 'Format & Minify',
        code: `import { jsonFormat, jsonMinify } from 'toolmetry';

const ugly = '{"name":"John","age":30}';

const pretty = jsonFormat(ugly, 2);
// Formatted with 2-space indent

const mini = jsonMinify(ugly);
// '{"name":"John","age":30}'`,
      },
      {
        title: 'Validate',
        code: `import { jsonValidate } from 'toolmetry';

const result = jsonValidate('{"valid": true}');
// { valid: true, error: null, position: null }`,
      },
      {
        title: 'Stats & Flatten',
        code: `import { jsonStats, jsonFlatten } from 'toolmetry';

const stats = jsonStats('{"a":1,"b":{"c":2}}');
// { type: "object", keys: 2, depth: 2, size: 20 }

const flat = jsonFlatten('{"a":{"b":1}}');
// { "a.b": 1 }`,
      },
    ],
  },
  {
    slug: 'password',
    name: 'Password Generator',
    icon: 'Lock',
    category: 'Security',
    description: 'Generate secure random passwords with customizable options and strength checking.',
    importStatement: `import { password } from 'toolmetry';`,
    functions: [
      { name: 'passwordGenerate', params: 'options?: PasswordOptions', returns: 'string', description: 'Generate a random password' },
      { name: 'passwordPassphrase', params: 'options?: { words?, separator?, capitalize? }', returns: 'string', description: 'Generate a passphrase' },
      { name: 'passwordStrength', params: 'password: string', returns: '{ score, label, suggestions }', description: 'Check password strength' },
      { name: 'passwordGenerateBatch', params: 'count: number, options?: PasswordOptions', returns: 'string[]', description: 'Generate multiple passwords' },
    ],
    examples: [
      {
        title: 'Generate Password',
        code: `import { passwordGenerate } from 'toolmetry';

const pwd = passwordGenerate({ length: 20, symbols: true });
// "aB3$xY9!kL2@mN5#pQ8"

const simple = passwordGenerate({ length: 8, digits: true, symbols: false });
// "aB3xY9kL"`,
      },
      {
        title: 'Passphrase',
        code: `import { passwordPassphrase } from 'toolmetry';

const phrase = passwordPassphrase({ words: 4, separator: '-', capitalize: true });
// "Brave-Cloud-Eagle-Flame"`,
      },
      {
        title: 'Check Strength',
        code: `import { passwordStrength } from 'toolmetry';

const result = passwordStrength('MyP@ss123');
// { score: 5, label: "Strong", suggestions: [] }`,
      },
    ],
  },
  {
    slug: 'morse',
    name: 'Morse Code',
    icon: 'Radio',
    category: 'Encoding',
    description: 'Encode and decode Morse code with validation support.',
    importStatement: `import { morse } from 'toolmetry';`,
    functions: [
      { name: 'morseEncode', params: 'input: string', returns: 'string', description: 'Encode text to Morse code' },
      { name: 'morseDecode', params: 'input: string', returns: 'string', description: 'Decode Morse code to text' },
      { name: 'morseIsValid', params: 'input: string', returns: 'boolean', description: 'Check if valid Morse code' },
    ],
    examples: [
      {
        title: 'Encode/Decode',
        code: `import { morseEncode, morseDecode } from 'toolmetry';

const encoded = morseEncode('HELLO WORLD');
// ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."

const decoded = morseDecode(encoded);
// "HELLO WORLD"`,
      },
      {
        title: 'Validation',
        code: `import { morseIsValid } from 'toolmetry';

morseIsValid('.... . .-.. .-.. ---'); // true
morseIsValid('hello'); // false`,
      },
    ],
  },
  {
    slug: 'roman',
    name: 'Roman Numerals',
    icon: 'Hash',
    category: 'Math',
    description: 'Convert between Arabic numbers and Roman numerals with validation.',
    importStatement: `import { roman } from 'toolmetry';`,
    functions: [
      { name: 'romanToRoman', params: 'num: number', returns: 'string', description: 'Convert number to Roman numeral (1-3999)' },
      { name: 'romanFromRoman', params: 'str: string', returns: 'number', description: 'Convert Roman numeral to number' },
      { name: 'romanIsValid', params: 'str: string', returns: 'boolean', description: 'Check if valid Roman numeral' },
    ],
    examples: [
      {
        title: 'To Roman',
        code: `import { romanToRoman } from 'toolmetry';

romanToRoman(42);   // "XLII"
romanToRoman(1999); // "MCMXCIX"`,
      },
      {
        title: 'From Roman',
        code: `import { romanFromRoman } from 'toolmetry';

romanFromRoman('XLII');    // 42
romanFromRoman('MCMXCIX'); // 1999`,
      },
      {
        title: 'Validation',
        code: `import { romanIsValid } from 'toolmetry';

romanIsValid('XLII'); // true
romanIsValid('ABC');  // false`,
      },
    ],
  },
  {
    slug: 'cron',
    name: 'Cron Validator',
    icon: 'Clock',
    category: 'Utility',
    description: 'Validate and describe cron expressions with human-readable output.',
    importStatement: `import { cron } from 'toolmetry';`,
    functions: [
      { name: 'cronValidate', params: 'expression: string', returns: '{ valid, error, fields }', description: 'Validate a cron expression' },
      { name: 'cronDescribe', params: 'expression: string', returns: 'string', description: 'Get human-readable description' },
    ],
    examples: [
      {
        title: 'Validate',
        code: `import { cronValidate } from 'toolmetry';

const result = cronValidate('0 0 * * *');
// { valid: true, error: null, fields: {...} }`,
      },
      {
        title: 'Describe',
        code: `import { cronDescribe } from 'toolmetry';

cronDescribe('0 0 * * *');
// "Cron: 0 0 * * * (at minute 0, at hour 0)"

cronDescribe('@daily');
// "Runs once a day (at midnight)"`,
      },
    ],
  },
  {
    slug: 'diff',
    name: 'Diff Checker',
    icon: 'GitCompare',
    category: 'Utility',
    description: 'Compare texts line by line and find differences.',
    importStatement: `import { diff } from 'toolmetry';`,
    functions: [
      { name: 'diffCheck', params: 'oldText: string, newText: string', returns: '{ lines, stats }', description: 'Compare two strings line by line' },
      { name: 'diffUnified', params: 'oldText: string, newText: string, oldLabel?, newLabel?', returns: 'string', description: 'Generate unified diff string' },
      { name: 'diffIsSame', params: 'a: string, b: string', returns: 'boolean', description: 'Check if two strings are identical' },
    ],
    examples: [
      {
        title: 'Line-by-Line Diff',
        code: `import { diffCheck } from 'toolmetry';

const result = diffCheck('Hello\\nWorld', 'Hello\\nEarth');
// { lines: [...], stats: { added: 1, removed: 1, unchanged: 1 } }`,
      },
      {
        title: 'Unified Diff',
        code: `import { diffUnified } from 'toolmetry';

const unified = diffUnified('Hello\\nWorld', 'Hello\\nEarth');
// "--- original\\n+++ modified\\n  Hello\\n- World\\n+ Earth"`,
      },
      {
        title: 'Quick Comparison',
        code: `import { diffIsSame } from 'toolmetry';

diffIsSame('hello', 'hello'); // true
diffIsSame('hello', 'world'); // false`,
      },
    ],
  },
  {
    slug: 'lorem',
    name: 'Lorem Ipsum',
    icon: 'AlignLeft',
    category: 'Content',
    description: 'Generate placeholder text for design and development.',
    importStatement: `import { lorem } from 'toolmetry';`,
    functions: [
      { name: 'loremWords', params: 'count?: number', returns: 'string', description: 'Generate lorem ipsum words' },
      { name: 'loremSentences', params: 'count?: number', returns: 'string', description: 'Generate lorem ipsum sentences' },
      { name: 'loremParagraphs', params: 'count?: number', returns: 'string', description: 'Generate lorem ipsum paragraphs' },
    ],
    examples: [
      {
        title: 'Generate Words',
        code: `import { loremWords } from 'toolmetry';

const words = loremWords(10);
// "lorem ipsum dolor sit amet consectetur adipiscing elit"`,
      },
      {
        title: 'Generate Sentences',
        code: `import { loremSentences } from 'toolmetry';

const sentences = loremSentences(2);
// Two sentences of lorem ipsum text`,
      },
      {
        title: 'Generate Paragraphs',
        code: `import { loremParagraphs } from 'toolmetry';

const paragraphs = loremParagraphs(3);
// Three paragraphs of lorem ipsum text`,
      },
    ],
  },
  {
    slug: 'qr',
    name: 'QR Code Generator & Decoder',
    icon: 'QrCode',
    category: 'Utility',
    description: 'Generate QR codes from any text or URL, and decode QR code images back to text. Free, no dependencies, works in the browser.',
    importStatement: `import { qr } from 'toolmetry';`,
    functions: [
      { name: 'qr.generate', params: 'text: string, size?: number', returns: 'string', description: 'Generate a QR code image URL from text' },
      { name: 'qr.decode', params: 'imageUrl: string', returns: 'Promise<string>', description: 'Decode a QR code image URL back to text' },
    ],
    examples: [
      {
        title: 'Generate QR Code',
        code: `import { qr } from 'toolmetry';

const qrUrl = qr.generate('https://toolmetry.pro');
// Returns QR code image URL

const qrLarge = qr.generate('https://toolmetry.pro', 512);
// Returns a larger 512x512 QR code`,
      },
      {
        title: 'Decode QR Code',
        code: `import { qr } from 'toolmetry';

const decoded = await qr.decode('https://example.com/qr-image.png');
// Returns the text/URL encoded in the QR code`,
      },
      {
        title: 'Generate from Text',
        code: `import { qr } from 'toolmetry';

const qrUrl = qr.generate('Hello, World!');
// Returns QR code image URL`,
      },
    ],
  },
  {
    slug: 'markdown',
    name: 'Markdown Converter',
    icon: 'FileText',
    category: 'Text',
    description: 'Convert Markdown to HTML or strip Markdown syntax. Parse headings, bold, links, lists, and more.',
    importStatement: `import { markdown } from 'toolmetry';`,
    functions: [
      { name: 'markdown.toHtml', params: 'input: string', returns: 'string', description: 'Convert Markdown to HTML' },
      { name: 'markdown.strip', params: 'input: string', returns: 'string', description: 'Strip Markdown syntax to plain text' },
    ],
    examples: [
      {
        title: 'Markdown to HTML',
        code: `import { markdown } from 'toolmetry';

const html = markdown.toHtml('# Hello **World**');
// "<h1>Hello <strong>World</strong></h1>"`,
      },
      {
        title: 'Strip Markdown',
        code: `import { markdown } from 'toolmetry';

const plain = markdown.strip('# Hello **World**');
// "Hello World"`,
      },
    ],
  },
  {
    slug: 'timestamp',
    name: 'Timestamp Converter',
    icon: 'Timer',
    category: 'Conversion',
    description: 'Convert between Unix timestamps and human-readable dates. Get current timestamp, format, and parse dates.',
    importStatement: `import { timestamp } from 'toolmetry';`,
    functions: [
      { name: 'timestamp.now', params: '', returns: 'number', description: 'Get current Unix timestamp in seconds' },
      { name: 'timestamp.toDate', params: 'ts: number', returns: 'string', description: 'Convert Unix timestamp to ISO date string' },
      { name: 'timestamp.fromDateString', params: 'dateStr: string', returns: 'number', description: 'Convert date string to Unix timestamp' },
      { name: 'timestamp.format', params: 'ts: number, format?: string', returns: 'string', description: 'Format timestamp (iso, utc, locale, date, time)' },
    ],
    examples: [
      {
        title: 'Current Timestamp',
        code: `import { timestamp } from 'toolmetry';

const now = timestamp.now();
// 1717400000`,
      },
      {
        title: 'Timestamp to Date',
        code: `import { timestamp } from 'toolmetry';

const date = timestamp.toDate(1717400000);
// "2024-06-03T06:13:20.000Z"`,
      },
      {
        title: 'Date to Timestamp',
        code: `import { timestamp } from 'toolmetry';

const ts = timestamp.fromDateString('2024-06-03');
// 1717372800`,
      },
      {
        title: 'Format Timestamp',
        code: `import { timestamp } from 'toolmetry';

const utc = timestamp.format(1717400000, 'utc');
// "Mon, 03 Jun 2024 06:13:20 GMT"`,
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolInfo | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: Category): ToolInfo[] {
  return tools.filter(t => t.category === category);
}

export const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileCode,
  Link,
  Shield,
  KeyRound,
  Fingerprint,
  Palette,
  Code2,
  Binary,
  Type,
  Braces,
  Lock,
  Radio,
  Hash,
  Clock,
  GitCompare,
  AlignLeft,
  LockKeyhole,
  Shuffle,
  QrCode,
  FileText,
  Timer,
};
