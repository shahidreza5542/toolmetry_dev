export interface ToolDef {
  slug: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  functions: {
    name: string;
    description: string;
    params: { name: string; type: string; required?: boolean; description: string; default?: string }[];
    returns: string;
  }[];
  examples: { title: string; code: string }[];
}

export const tools: ToolDef[] = [
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    icon: "FileCode",
    description: "Encode and decode Base64 strings, including URL-safe variants and buffer support. Essential for data encoding in web applications, APIs, and binary data handling.",
    category: "Encoding",
    functions: [
      { name: "base64Encode", description: "Encode a string to Base64", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "base64Decode", description: "Decode a Base64 string", params: [{ name: "input", type: "string", required: true, description: "The Base64 string" }], returns: "string" },
      { name: "base64EncodeURL", description: "Encode to URL-safe Base64", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "base64DecodeURL", description: "Decode URL-safe Base64", params: [{ name: "input", type: "string", required: true, description: "The Base64URL string" }], returns: "string" },
    ],
    examples: [
      { title: "Basic encode/decode", code: `import { base64Encode, base64Decode } from 'toolmetry';\n\nconst encoded = base64Encode('Hello, Toolmetry!');\nconsole.log(encoded); // "SGVsbG8sIFRvb2xtZXRyeSE="\n\nconst decoded = base64Decode(encoded);\nconsole.log(decoded); // "Hello, Toolmetry!"` },
    ],
  },
  {
    slug: "url",
    name: "URL Encoder/Decoder",
    icon: "Link",
    description: "Encode and decode URL components, build and parse query strings. Perfect for handling URL parameters and query string manipulation.",
    category: "Encoding",
    functions: [
      { name: "urlEncode", description: "Encode for URL parameters", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "urlDecode", description: "Decode a URL-encoded string", params: [{ name: "input", type: "string", required: true, description: "The URL-encoded string" }], returns: "string" },
      { name: "urlBuildQuery", description: "Build a query string from an object", params: [{ name: "params", type: "Record<string, string|number|boolean>", required: true, description: "Key-value pairs" }], returns: "string" },
      { name: "urlParseQuery", description: "Parse a query string into an object", params: [{ name: "qs", type: "string", required: true, description: "The query string" }], returns: "Record<string, string>" },
    ],
    examples: [
      { title: "Build and parse query strings", code: `import { urlBuildQuery, urlParseQuery } from 'toolmetry';\n\nconst qs = urlBuildQuery({ name: 'Toolmetry', version: 3 });\nconsole.log(qs); // "?name=Toolmetry&version=3"\n\nconst params = urlParseQuery(qs);\nconsole.log(params); // { name: "Toolmetry", version: "3" }` },
    ],
  },
  {
    slug: "hash",
    name: "Hash Generator",
    icon: "Shield",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes with HMAC support. Supports hex, base64, and base64url output encodings.",
    category: "Security",
    functions: [
      { name: "hashGenerate", description: "Generate a hash (Node.js sync)", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }, { name: "algorithm", type: "string", description: "Algorithm (default: sha256)" }], returns: "string" },
      { name: "hashAsync", description: "Async hash via SubtleCrypto (browser)", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }, { name: "algorithm", type: "string", description: "Algorithm (default: SHA-256)" }], returns: "Promise<string>" },
      { name: "hmacGenerate", description: "Generate HMAC hash", params: [{ name: "input", type: "string", required: true, description: "The data" }, { name: "secret", type: "string", required: true, description: "The secret key" }], returns: "string" },
      { name: "hashAll", description: "Generate all hashes at once", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }], returns: "Record<string, string>" },
    ],
    examples: [
      { title: "Generate hashes", code: `import { hashGenerate, hashAll } from 'toolmetry';\n\nconst sha256 = hashGenerate('hello world');\nconsole.log(sha256);\n\nconst all = hashAll('hello world');\n// { md5: '...', sha1: '...', sha256: '...', sha384: '...', sha512: '...' }` },
    ],
  },
  {
    slug: "jwt",
    name: "JWT Decoder",
    icon: "KeyRound",
    description: "Decode JWT tokens, check expiration, validate format, and extract algorithm info. Essential for debugging authentication flows.",
    category: "Security",
    functions: [
      { name: "jwtDecode", description: "Decode a JWT token", params: [{ name: "token", type: "string", required: true, description: "The JWT token" }], returns: "{ header, payload, signature }" },
      { name: "jwtIsExpired", description: "Check if a JWT is expired", params: [{ name: "token", type: "string", required: true, description: "The JWT token" }], returns: "boolean" },
      { name: "jwtIsValidFormat", description: "Check valid JWT format", params: [{ name: "token", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Decode a JWT", code: `import { jwtDecode, jwtIsExpired } from 'toolmetry';\n\nconst token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';\n\nconst decoded = jwtDecode(token);\nconsole.log(decoded.header);  // { alg: "HS256" }\nconsole.log(decoded.payload); // { sub: "1234" }\nconsole.log(jwtIsExpired(token));` },
    ],
  },
  {
    slug: "uuid",
    name: "UUID Generator",
    icon: "Fingerprint",
    description: "Generate UUID v4, validate UUIDs, and get version info. Create unique identifiers for databases, distributed systems, and more.",
    category: "Identity",
    functions: [
      { name: "uuidV4", description: "Generate a UUID v4", params: [], returns: "string" },
      { name: "uuidV4Short", description: "Short UUID v4 (no dashes)", params: [], returns: "string" },
      { name: "uuidV4Batch", description: "Generate multiple UUIDs", params: [{ name: "count", type: "number", required: true, description: "Number of UUIDs" }], returns: "string[]" },
      { name: "uuidIsValid", description: "Validate a UUID", params: [{ name: "uuid", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Generate UUIDs", code: `import { uuidV4, uuidV4Batch } from 'toolmetry';\n\nconst id = uuidV4();\nconsole.log(id); // "550e8400-e29b-41d4-..."\n\nconst batch = uuidV4Batch(3);\nconsole.log(batch); // Array of 3 UUIDs` },
    ],
  },
  {
    slug: "encrypt",
    name: "AES-256 Encrypt/Decrypt",
    icon: "Lock",
    description: "AES-256-GCM encryption with PBKDF2 key derivation. Sync methods for Node.js, async for browsers via SubtleCrypto.",
    category: "Security",
    functions: [
      { name: "aesEncrypt", description: "Encrypt text (Node.js sync)", params: [{ name: "plaintext", type: "string", required: true, description: "Text to encrypt" }, { name: "secret", type: "string", required: true, description: "Encryption secret" }], returns: "string" },
      { name: "aesDecrypt", description: "Decrypt text (Node.js sync)", params: [{ name: "encrypted", type: "string", required: true, description: "Encrypted string" }, { name: "secret", type: "string", required: true, description: "Encryption secret" }], returns: "string" },
      { name: "aesEncryptAsync", description: "Async encrypt (browser)", params: [{ name: "plaintext", type: "string", required: true, description: "Text to encrypt" }, { name: "secret", type: "string", required: true, description: "Encryption secret" }], returns: "Promise<string>" },
      { name: "aesDecryptAsync", description: "Async decrypt (browser)", params: [{ name: "encrypted", type: "string", required: true, description: "Encrypted string" }, { name: "secret", type: "string", required: true, description: "Encryption secret" }], returns: "Promise<string>" },
    ],
    examples: [
      { title: "Encrypt and decrypt", code: `import { aesEncrypt, aesDecrypt } from 'toolmetry';\n\n// Node.js (sync)\nconst encrypted = aesEncrypt('Secret message', 'my-password');\nconst decrypted = aesDecrypt(encrypted, 'my-password');\nconsole.log(decrypted); // "Secret message"\n\n// Browser (async)\nconst enc = await aesEncryptAsync('Secret', 'password');\nconst dec = await aesDecryptAsync(enc, 'password');` },
    ],
  },
  {
    slug: "random",
    name: "Random Generator",
    icon: "Shuffle",
    description: "Generate random strings, numbers, hex, and more using cryptographically secure randomness. Includes pick, shuffle, boolean, and float utilities.",
    category: "Utility",
    functions: [
      { name: "randomString", description: "Generate a random string", params: [{ name: "length", type: "number", description: "Length (default: 16)" }], returns: "string" },
      { name: "randomInt", description: "Random integer between min and max", params: [{ name: "min", type: "number", required: true, description: "Min" }, { name: "max", type: "number", required: true, description: "Max" }], returns: "number" },
      { name: "randomHex", description: "Random hex string", params: [{ name: "length", type: "number", description: "Length (default: 32)" }], returns: "string" },
      { name: "randomBoolean", description: "Random boolean", params: [], returns: "boolean" },
    ],
    examples: [
      { title: "Generate random values", code: `import { randomString, randomInt, randomHex } from 'toolmetry';\n\nconsole.log(randomString(16));  // "aB3dE7fG9hJ2kL5m"\nconsole.log(randomInt(1, 100));  // 42\nconsole.log(randomHex(16));      // "a1b2c3d4e5f6a7b8"` },
    ],
  },
  {
    slug: "color",
    name: "Color Converter",
    icon: "Palette",
    description: "Convert between HEX, RGB, and HSL color formats. Lighten and darken colors. Supports named colors and CSS output.",
    category: "Design",
    functions: [
      { name: "hexToRgb", description: "HEX to RGB", params: [{ name: "hex", type: "string", required: true, description: "HEX color" }], returns: "{ r, g, b }" },
      { name: "rgbToHex", description: "RGB to HEX", params: [{ name: "r", type: "number", required: true, description: "Red" }, { name: "g", type: "number", required: true, description: "Green" }, { name: "b", type: "number", required: true, description: "Blue" }], returns: "string" },
      { name: "colorLighten", description: "Lighten a HEX color", params: [{ name: "hex", type: "string", required: true, description: "HEX color" }, { name: "amount", type: "number", required: true, description: "Amount (0-100)" }], returns: "string" },
      { name: "colorDarken", description: "Darken a HEX color", params: [{ name: "hex", type: "string", required: true, description: "HEX color" }, { name: "amount", type: "number", required: true, description: "Amount (0-100)" }], returns: "string" },
    ],
    examples: [
      { title: "Convert colors", code: `import { hexToRgb, rgbToHex } from 'toolmetry';\n\nconst rgb = hexToRgb('#ff0000');\nconsole.log(rgb); // { r: 255, g: 0, b: 0 }\n\nconst hex = rgbToHex(255, 0, 0);\nconsole.log(hex); // "#ff0000"` },
    ],
  },
  {
    slug: "html-entity",
    name: "HTML Entity",
    icon: "Code2",
    description: "Encode and decode HTML entities to prevent XSS and sanitize content. Supports named and numeric entities.",
    category: "Encoding",
    functions: [
      { name: "htmlEntityEncode", description: "Encode HTML special characters", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "htmlEntityDecode", description: "Decode HTML entities", params: [{ name: "input", type: "string", required: true, description: "String with entities" }], returns: "string" },
    ],
    examples: [
      { title: "Encode and decode HTML", code: `import { htmlEntityEncode, htmlEntityDecode } from 'toolmetry';\n\nconst encoded = htmlEntityEncode('<script>alert("xss")</script>');\nconsole.log(encoded); // "&lt;script&gt;..."\n\nconst decoded = htmlEntityDecode(encoded);` },
    ],
  },
  {
    slug: "number-base",
    name: "Number Base",
    icon: "Binary",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal. Supports custom bases 2-36.",
    category: "Math",
    functions: [
      { name: "baseConvert", description: "Convert between bases", params: [{ name: "value", type: "string", required: true, description: "The number" }, { name: "fromBase", type: "number", required: true, description: "Source base" }, { name: "toBase", type: "number", required: true, description: "Target base" }], returns: "string" },
      { name: "toBinary", description: "Convert to binary", params: [{ name: "value", type: "string|number", required: true, description: "The number" }], returns: "string" },
      { name: "toHex", description: "Convert to hexadecimal", params: [{ name: "value", type: "string|number", required: true, description: "The number" }], returns: "string" },
    ],
    examples: [
      { title: "Convert between bases", code: `import { toBinary, toHex, convertAllBases } from 'toolmetry';\n\nconsole.log(toBinary(255)); // "11111111"\nconsole.log(toHex(255));    // "ff"` },
    ],
  },
  {
    slug: "text",
    name: "Text Utilities",
    icon: "Type",
    description: "Case conversion, slugify, word/char counting, whitespace removal, and more text manipulation utilities.",
    category: "Text",
    functions: [
      { name: "toCamelCase", description: "Convert to camelCase", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "toSnakeCase", description: "Convert to snake_case", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "toKebabCase", description: "Convert to kebab-case", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "slugify", description: "Generate a URL slug", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
    ],
    examples: [
      { title: "Case conversion", code: `import { toCamelCase, toSnakeCase, slugify } from 'toolmetry';\n\nconsole.log(toCamelCase('hello world'));  // "helloWorld"\nconsole.log(toSnakeCase('helloWorld'));  // "hello_world"\nconsole.log(slugify('Hello World! 123')); // "hello-world-123"` },
    ],
  },
  {
    slug: "json",
    name: "JSON Tools",
    icon: "Braces",
    description: "Format, minify, validate, and analyze JSON data with error position reporting. Flatten nested JSON to dot notation.",
    category: "Data",
    functions: [
      { name: "jsonFormat", description: "Format/prettify JSON", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "string" },
      { name: "jsonMinify", description: "Minify JSON", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "string" },
      { name: "jsonValidate", description: "Validate JSON", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "{ valid, error }" },
    ],
    examples: [
      { title: "Format and validate", code: `import { jsonFormat, jsonValidate } from 'toolmetry';\n\nconst formatted = jsonFormat('{"name":"Toolmetry"}');\nconsole.log(formatted);\n// {\n//   "name": "Toolmetry"\n// }` },
    ],
  },
  {
    slug: "password",
    name: "Password Generator",
    icon: "Lock",
    description: "Generate secure passwords, passphrases, check strength, and batch generate. Uses cryptographically secure randomness.",
    category: "Security",
    functions: [
      { name: "passwordGenerate", description: "Generate a secure password", params: [{ name: "options", type: "PasswordOptions", description: "Options object" }], returns: "string" },
      { name: "passwordPassphrase", description: "Generate a passphrase", params: [{ name: "options", type: "object", description: "{ words, separator, capitalize }" }], returns: "string" },
      { name: "passwordStrength", description: "Check password strength", params: [{ name: "password", type: "string", required: true, description: "The password" }], returns: "{ score, label, suggestions }" },
    ],
    examples: [
      { title: "Generate passwords", code: `import { passwordGenerate, passwordStrength } from 'toolmetry';\n\nconst pwd = passwordGenerate({ length: 20, symbols: true });\nconsole.log(pwd); // "x8#Km2@pL9!nQ4&wR7"\n\nconst result = passwordStrength('mypassword123');\nconsole.log(result); // { score: 3, label: "Fair" }` },
    ],
  },
  {
    slug: "morse",
    name: "Morse Code",
    icon: "Radio",
    description: "Encode text to Morse code and decode Morse back to text. Supports letters, numbers, and common punctuation.",
    category: "Encoding",
    functions: [
      { name: "morseEncode", description: "Encode to Morse code", params: [{ name: "input", type: "string", required: true, description: "The text" }], returns: "string" },
      { name: "morseDecode", description: "Decode Morse code", params: [{ name: "input", type: "string", required: true, description: "Morse code" }], returns: "string" },
    ],
    examples: [
      { title: "Encode and decode", code: `import { morseEncode, morseDecode } from 'toolmetry';\n\nconsole.log(morseEncode('SOS')); // "... --- ..."\nconsole.log(morseDecode('... --- ...')); // "SOS"` },
    ],
  },
  {
    slug: "roman",
    name: "Roman Numerals",
    icon: "Hash",
    description: "Convert between Arabic numbers and Roman numerals (1-3999). Validate Roman numeral strings.",
    category: "Math",
    functions: [
      { name: "romanToRoman", description: "Number to Roman", params: [{ name: "num", type: "number", required: true, description: "Number (1-3999)" }], returns: "string" },
      { name: "romanFromRoman", description: "Roman to number", params: [{ name: "str", type: "string", required: true, description: "Roman numeral" }], returns: "number" },
    ],
    examples: [
      { title: "Convert numbers", code: `import { romanToRoman, romanFromRoman } from 'toolmetry';\n\nconsole.log(romanToRoman(42));     // "XLII"\nconsole.log(romanFromRoman('XIV')); // 14` },
    ],
  },
  {
    slug: "cron",
    name: "Cron Validator",
    icon: "Clock",
    description: "Validate and describe cron expressions with human-readable output. Supports standard 5-field cron plus aliases.",
    category: "Utility",
    functions: [
      { name: "cronValidate", description: "Validate a cron expression", params: [{ name: "expression", type: "string", required: true, description: "The cron expression" }], returns: "{ valid, error }" },
      { name: "cronDescribe", description: "Human-readable description", params: [{ name: "expression", type: "string", required: true, description: "The cron expression" }], returns: "string" },
    ],
    examples: [
      { title: "Validate cron", code: `import { cronValidate, cronDescribe } from 'toolmetry';\n\nconst result = cronValidate('0 0 * * *');\nconsole.log(result); // { valid: true, error: null }\n\nconsole.log(cronDescribe('@daily'));` },
    ],
  },
  {
    slug: "diff",
    name: "Diff Checker",
    icon: "GitCompare",
    description: "Compare two strings line by line and find differences with unified diff output. Uses LCS-based algorithm.",
    category: "Utility",
    functions: [
      { name: "diffCheck", description: "Compare two strings", params: [{ name: "oldText", type: "string", required: true, description: "Original" }, { name: "newText", type: "string", required: true, description: "Modified" }], returns: "{ lines, stats }" },
      { name: "diffIsSame", description: "Check if strings are identical", params: [{ name: "a", type: "string", required: true, description: "First string" }, { name: "b", type: "string", required: true, description: "Second string" }], returns: "boolean" },
    ],
    examples: [
      { title: "Compare texts", code: `import { diffCheck } from 'toolmetry';\n\nconst result = diffCheck('hello world', 'hello earth');\nconsole.log(result.stats); // { added: 1, removed: 1, unchanged: 1 }` },
    ],
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum",
    icon: "AlignLeft",
    description: "Generate placeholder text for design and development. Generate words, sentences, and paragraphs.",
    category: "Content",
    functions: [
      { name: "loremWords", description: "Generate lorem words", params: [{ name: "count", type: "number", description: "Word count (default: 10)" }], returns: "string" },
      { name: "loremParagraphs", description: "Generate lorem paragraphs", params: [{ name: "count", type: "number", description: "Paragraph count (default: 2)" }], returns: "string" },
    ],
    examples: [
      { title: "Generate placeholder text", code: `import { loremWords, loremParagraphs } from 'toolmetry';\n\nconsole.log(loremWords(10));      // 10 words\nconsole.log(loremParagraphs(2));  // 2 paragraphs` },
    ],
  },
];

export const categories = ["Encoding", "Security", "Identity", "Design", "Math", "Text", "Data", "Utility", "Content"];

export function getToolBySlug(slug: string): ToolDef | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDef[] {
  return tools.filter(t => t.category === category);
}
