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
  examples: { title: string; code: string; output?: string }[];
}

export const tools: ToolDef[] = [
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    icon: "FileCode",
    description: "Encode and decode Base64 strings, including URL-safe variants and buffer support. Essential for data encoding in web applications, APIs, and binary data handling.",
    category: "Encoding",
    functions: [
      { name: "base64Encode", description: "Encode a string to Base64", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }, { name: "encoding", type: "string", description: "Character encoding (default: utf-8)", default: "utf-8" }], returns: "string" },
      { name: "base64Decode", description: "Decode a Base64 string", params: [{ name: "input", type: "string", required: true, description: "The Base64 string to decode" }, { name: "encoding", type: "string", description: "Character encoding (default: utf-8)", default: "utf-8" }], returns: "string" },
      { name: "base64EncodeURL", description: "Encode to URL-safe Base64", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "base64DecodeURL", description: "Decode a URL-safe Base64 string", params: [{ name: "input", type: "string", required: true, description: "The Base64URL string" }], returns: "string" },
      { name: "base64IsValid", description: "Check if a string is valid Base64", params: [{ name: "input", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Basic encode/decode", code: `const { base64Encode, base64Decode } = require('toolmetry');\n\nconst encoded = base64Encode('Hello, Toolmetry!');\nconsole.log(encoded); // "SGVsbG8sIFRvb2xtZXRyeSE="\n\nconst decoded = base64Decode(encoded);\nconsole.log(decoded); // "Hello, Toolmetry!"`, output: 'SGVsbG8sIFRvb2xtZXRyeSE=' },
      { title: "URL-safe encoding", code: `const { base64EncodeURL, base64DecodeURL } = require('toolmetry');\n\nconst encoded = base64EncodeURL('hello+world/test=data');\nconsole.log(encoded); // No +, /, or = characters\n\nconst decoded = base64DecodeURL(encoded);\nconsole.log(decoded); // "hello+world/test=data"` },
    ],
  },
  {
    slug: "url",
    name: "URL Encoder/Decoder",
    icon: "Link",
    description: "Encode and decode URL components, build and parse query strings. Perfect for handling URL parameters and query string manipulation in web applications.",
    category: "Encoding",
    functions: [
      { name: "urlEncode", description: "Encode a string for URL parameters", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "urlDecode", description: "Decode a URL-encoded string", params: [{ name: "input", type: "string", required: true, description: "The URL-encoded string" }], returns: "string" },
      { name: "urlBuildQuery", description: "Build a query string from an object", params: [{ name: "params", type: "Record<string, string|number|boolean>", required: true, description: "Key-value pairs" }], returns: "string" },
      { name: "urlParseQuery", description: "Parse a query string into an object", params: [{ name: "qs", type: "string", required: true, description: "The query string" }], returns: "Record<string, string>" },
    ],
    examples: [
      { title: "Build and parse query strings", code: `const { urlBuildQuery, urlParseQuery } = require('toolmetry');\n\nconst qs = urlBuildQuery({ name: 'Toolmetry', version: 3 });\nconsole.log(qs); // "?name=Toolmetry&version=3"\n\nconst params = urlParseQuery(qs);\nconsole.log(params); // { name: "Toolmetry", version: "3" }` },
    ],
  },
  {
    slug: "hash",
    name: "Hash Generator",
    icon: "Shield",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes with HMAC support. Supports hex, base64, and base64url output encodings for all your hashing needs.",
    category: "Security",
    functions: [
      { name: "hashGenerate", description: "Generate a hash of the input string", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }, { name: "algorithm", type: "'md5'|'sha1'|'sha256'|'sha384'|'sha512'", description: "Hash algorithm (default: sha256)", default: "sha256" }, { name: "encoding", type: "'hex'|'base64'|'base64url'", description: "Output encoding (default: hex)", default: "hex" }], returns: "string" },
      { name: "hashAsync", description: "Async hash using SubtleCrypto (browser)", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }, { name: "algorithm", type: "string", description: "Algorithm (default: SHA-256)", default: "SHA-256" }], returns: "Promise<string>" },
      { name: "hmacGenerate", description: "Generate HMAC hash", params: [{ name: "input", type: "string", required: true, description: "The data to hash" }, { name: "secret", type: "string", required: true, description: "The secret key" }, { name: "algorithm", type: "'sha256'|'sha512'", description: "Algorithm (default: sha256)", default: "sha256" }], returns: "string" },
      { name: "hashAll", description: "Generate all supported hashes at once", params: [{ name: "input", type: "string", required: true, description: "The string to hash" }], returns: "Record<string, string>" },
    ],
    examples: [
      { title: "Generate SHA-256 hash", code: `const { hashGenerate, hashAll } = require('toolmetry');\n\nconst sha256 = hashGenerate('hello world');\nconsole.log(sha256);\n\nconst allHashes = hashAll('hello world');\nconsole.log(allHashes);\n// { md5: '...', sha1: '...', sha256: '...', sha384: '...', sha512: '...' }` },
    ],
  },
  {
    slug: "jwt",
    name: "JWT Decoder",
    icon: "KeyRound",
    description: "Decode JWT tokens, check expiration, validate format, and extract algorithm info. Essential for debugging authentication flows and inspecting token contents.",
    category: "Security",
    functions: [
      { name: "jwtDecode", description: "Decode a JWT token (header + payload)", params: [{ name: "token", type: "string", required: true, description: "The JWT token" }], returns: "{ header, payload, signature }" },
      { name: "jwtIsExpired", description: "Check if a JWT token is expired", params: [{ name: "token", type: "string", required: true, description: "The JWT token" }], returns: "boolean" },
      { name: "jwtIsValidFormat", description: "Check if a string is a valid JWT format", params: [{ name: "token", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
      { name: "jwtGetAlgorithm", description: "Get the algorithm from a JWT header", params: [{ name: "token", type: "string", required: true, description: "The JWT token" }], returns: "string | null" },
    ],
    examples: [
      { title: "Decode a JWT", code: `const { jwtDecode, jwtIsExpired } = require('toolmetry');\n\nconst token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';\n\nconst decoded = jwtDecode(token);\nconsole.log(decoded.header);  // { alg: "HS256", typ: "JWT" }\nconsole.log(decoded.payload); // { sub: "1234567890" }\nconsole.log(jwtIsExpired(token)); // true or false` },
    ],
  },
  {
    slug: "uuid",
    name: "UUID Generator",
    icon: "Fingerprint",
    description: "Generate UUID v4, validate UUIDs, and get version info. Create unique identifiers instantly for databases, distributed systems, and more.",
    category: "Identity",
    functions: [
      { name: "uuidV4", description: "Generate a UUID v4", params: [], returns: "string" },
      { name: "uuidV4Short", description: "Generate a short UUID v4 (no dashes)", params: [], returns: "string" },
      { name: "uuidV4Batch", description: "Generate multiple UUIDs at once", params: [{ name: "count", type: "number", required: true, description: "Number of UUIDs to generate" }], returns: "string[]" },
      { name: "uuidIsValid", description: "Check if a string is a valid UUID", params: [{ name: "uuid", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Generate UUIDs", code: `const { uuidV4, uuidV4Batch } = require('toolmetry');\n\nconst id = uuidV4();\nconsole.log(id); // "550e8400-e29b-41d4-a716-446655440000"\n\nconst batch = uuidV4Batch(3);\nconsole.log(batch); // Array of 3 UUIDs` },
    ],
  },
  {
    slug: "encrypt",
    name: "AES-256 Encrypt/Decrypt",
    icon: "Lock",
    description: "AES-256 encryption for secure messages. Encrypt and decrypt text using AES-256-GCM with PBKDF2 key derivation. Includes both synchronous (Node.js) and async (browser/SubtleCrypto) methods.",
    category: "Security",
    functions: [
      { name: "aesEncrypt", description: "Encrypt text using AES-256-GCM (Node.js)", params: [{ name: "plaintext", type: "string", required: true, description: "The text to encrypt" }, { name: "secret", type: "string", required: true, description: "The encryption secret" }], returns: "string" },
      { name: "aesDecrypt", description: "Decrypt AES-256-GCM encrypted text (Node.js)", params: [{ name: "encrypted", type: "string", required: true, description: 'Encrypted string "iv:authTag:ciphertext"' }, { name: "secret", type: "string", required: true, description: "The encryption secret" }], returns: "string" },
      { name: "aesEncryptAsync", description: "Async encrypt using SubtleCrypto (browser)", params: [{ name: "plaintext", type: "string", required: true, description: "The text to encrypt" }, { name: "secret", type: "string", required: true, description: "The encryption secret" }], returns: "Promise<string>" },
      { name: "aesDecryptAsync", description: "Async decrypt using SubtleCrypto (browser)", params: [{ name: "encrypted", type: "string", required: true, description: 'Encrypted string "iv:ciphertext"' }, { name: "secret", type: "string", required: true, description: "The encryption secret" }], returns: "Promise<string>" },
    ],
    examples: [
      { title: "Encrypt and decrypt", code: `const { aesEncrypt, aesDecrypt } = require('toolmetry');\n\nconst encrypted = aesEncrypt('Secret message', 'my-password');\nconsole.log(encrypted); // "iv:authTag:ciphertext" (Base64)\n\nconst decrypted = aesDecrypt(encrypted, 'my-password');\nconsole.log(decrypted); // "Secret message"` },
    ],
  },
  {
    slug: "random",
    name: "Random Generator",
    icon: "Shuffle",
    description: "Generate random strings, numbers, hex values, and more. Includes utilities for random integers, floats, boolean values, array shuffling, and element picking — all using cryptographically secure randomness.",
    category: "Utility",
    functions: [
      { name: "randomString", description: "Generate a random string", params: [{ name: "length", type: "number", description: "Length (default: 16)", default: "16" }, { name: "options", type: "{ lowercase?, uppercase?, digits?, symbols? }", description: "Character options" }], returns: "string" },
      { name: "randomInt", description: "Generate a random integer between min and max", params: [{ name: "min", type: "number", required: true, description: "Minimum value" }, { name: "max", type: "number", required: true, description: "Maximum value" }], returns: "number" },
      { name: "randomHex", description: "Generate a random hex string", params: [{ name: "length", type: "number", description: "Length (default: 32)", default: "32" }], returns: "string" },
      { name: "randomAlphanumeric", description: "Generate a random alphanumeric string", params: [{ name: "length", type: "number", description: "Length (default: 16)", default: "16" }], returns: "string" },
      { name: "randomPick", description: "Pick a random element from an array", params: [{ name: "array", type: "Array", required: true, description: "The array to pick from" }], returns: "T" },
      { name: "randomShuffle", description: "Shuffle an array (Fisher-Yates)", params: [{ name: "array", type: "Array", required: true, description: "The array to shuffle" }], returns: "Array" },
      { name: "randomBoolean", description: "Generate a random boolean", params: [], returns: "boolean" },
      { name: "randomFloat", description: "Generate a random float between min and max", params: [{ name: "min", type: "number", required: true, description: "Minimum value" }, { name: "max", type: "number", required: true, description: "Maximum value" }, { name: "decimals", type: "number", description: "Decimal places (default: 4)", default: "4" }], returns: "number" },
    ],
    examples: [
      { title: "Generate random values", code: `const { randomString, randomInt, randomHex } = require('toolmetry');\n\nconsole.log(randomString(16)); // "aB3dE7fG9hJ2kL5m"\nconsole.log(randomInt(1, 100)); // 42\nconsole.log(randomHex(16)); // "a1b2c3d4e5f6a7b8"\nconsole.log(randomString(20, { symbols: true })); // "aB3!dE7@fG9#hJ2$kL5m"` },
    ],
  },
  {
    slug: "color",
    name: "Color Converter",
    icon: "Palette",
    description: "Convert between HEX, RGB, and HSL color formats. Lighten and darken colors. Supports named colors and CSS color output.",
    category: "Design",
    functions: [
      { name: "hexToRgb", description: "Convert HEX to RGB", params: [{ name: "hex", type: "string", required: true, description: "HEX color code" }], returns: "{ r, g, b } | null" },
      { name: "rgbToHex", description: "Convert RGB to HEX", params: [{ name: "r", type: "number", required: true, description: "Red (0-255)" }, { name: "g", type: "number", required: true, description: "Green (0-255)" }, { name: "b", type: "number", required: true, description: "Blue (0-255)" }], returns: "string" },
      { name: "colorLighten", description: "Lighten a HEX color", params: [{ name: "hex", type: "string", required: true, description: "HEX color" }, { name: "amount", type: "number", required: true, description: "Amount (0-100)" }], returns: "string" },
      { name: "colorDarken", description: "Darken a HEX color", params: [{ name: "hex", type: "string", required: true, description: "HEX color" }, { name: "amount", type: "number", required: true, description: "Amount (0-100)" }], returns: "string" },
    ],
    examples: [
      { title: "Convert and manipulate colors", code: `const { hexToRgb, rgbToHex, colorLighten, colorDarken } = require('toolmetry');\n\nconst rgb = hexToRgb('#00236F');\nconsole.log(rgb); // { r: 0, g: 35, b: 111 }\n\nconst hex = rgbToHex(0, 35, 111);\nconsole.log(hex); // "#00236f"\n\nconsole.log(colorLighten('#00236F', 20)); // Lighter shade\nconsole.log(colorDarken('#00236F', 20));  // Darker shade` },
    ],
  },
  {
    slug: "html-entity",
    name: "HTML Entity",
    icon: "Code2",
    description: "Encode and decode HTML entities to prevent XSS and sanitize content. Supports named entities, numeric entities, and selective encoding.",
    category: "Encoding",
    functions: [
      { name: "htmlEntityEncode", description: "Encode HTML special characters", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
      { name: "htmlEntityDecode", description: "Decode HTML entities", params: [{ name: "input", type: "string", required: true, description: "The string with HTML entities" }], returns: "string" },
      { name: "htmlEntityEncodeAll", description: "Encode all characters to HTML entities", params: [{ name: "input", type: "string", required: true, description: "The string to encode" }], returns: "string" },
    ],
    examples: [
      { title: "Encode and decode HTML", code: `const { htmlEntityEncode, htmlEntityDecode } = require('toolmetry');\n\nconst encoded = htmlEntityEncode('<script>alert("xss")</script>');\nconsole.log(encoded); // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"\n\nconst decoded = htmlEntityDecode(encoded);\nconsole.log(decoded); // Original string` },
    ],
  },
  {
    slug: "number-base",
    name: "Number Base",
    icon: "Binary",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal. Supports custom bases from 2 to 36.",
    category: "Math",
    functions: [
      { name: "baseConvert", description: "Convert a number between bases", params: [{ name: "value", type: "string", required: true, description: "The number as string" }, { name: "fromBase", type: "number", required: true, description: "Source base (2-36)" }, { name: "toBase", type: "number", required: true, description: "Target base (2-36)" }], returns: "string" },
      { name: "toBinary", description: "Convert to binary", params: [{ name: "value", type: "string|number", required: true, description: "The number" }], returns: "string" },
      { name: "toHex", description: "Convert to hexadecimal", params: [{ name: "value", type: "string|number", required: true, description: "The number" }], returns: "string" },
      { name: "convertAllBases", description: "Convert to all bases at once", params: [{ name: "value", type: "string|number", required: true, description: "The number" }], returns: "Record<string, string>" },
    ],
    examples: [
      { title: "Convert between bases", code: `const { toBinary, toHex, convertAllBases } = require('toolmetry');\n\nconsole.log(toBinary(255));    // "11111111"\nconsole.log(toHex(255));       // "FF"\nconsole.log(convertAllBases(255)); // { binary: "11111111", octal: "377", decimal: "255", hex: "FF" }` },
    ],
  },
  {
    slug: "text",
    name: "Text Utilities",
    icon: "Type",
    description: "Case conversion, slugify, word/char counting, whitespace removal, and more. Everything you need for text manipulation in one place.",
    category: "Text",
    functions: [
      { name: "toCamelCase", description: "Convert to camelCase", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "toSnakeCase", description: "Convert to snake_case", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "toKebabCase", description: "Convert to kebab-case", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "slugify", description: "Generate a URL-safe slug", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "string" },
      { name: "wordCount", description: "Count words in a string", params: [{ name: "input", type: "string", required: true, description: "The string" }], returns: "number" },
    ],
    examples: [
      { title: "Case conversion", code: `const { toCamelCase, toSnakeCase, toKebabCase, slugify } = require('toolmetry');\n\nconsole.log(toCamelCase('hello world'));  // "helloWorld"\nconsole.log(toSnakeCase('helloWorld'));  // "hello_world"\nconsole.log(toKebabCase('helloWorld'));  // "hello-world"\nconsole.log(slugify('Hello World! 123')); // "hello-world-123"` },
    ],
  },
  {
    slug: "json",
    name: "JSON Tools",
    icon: "Braces",
    description: "Format, minify, validate, and analyze JSON data with error position reporting. Flatten nested JSON to dot notation.",
    category: "Data",
    functions: [
      { name: "jsonFormat", description: "Format/prettify JSON", params: [{ name: "input", type: "string", required: true, description: "JSON string" }, { name: "indent", type: "number", description: "Indentation spaces (default: 2)", default: "2" }], returns: "string" },
      { name: "jsonMinify", description: "Minify JSON (remove whitespace)", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "string" },
      { name: "jsonValidate", description: "Validate JSON with error position", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "{ valid, error, position }" },
      { name: "jsonFlatten", description: "Flatten JSON to dot notation", params: [{ name: "input", type: "string", required: true, description: "JSON string" }], returns: "Record<string, any>" },
    ],
    examples: [
      { title: "Format and validate JSON", code: `const { jsonFormat, jsonValidate } = require('toolmetry');\n\nconst minified = '{"name":"Toolmetry","version":3}';\nconsole.log(jsonFormat(minified));\n// {\n//   "name": "Toolmetry",\n//   "version": 3\n// }\n\nconst result = jsonValidate('{invalid}');\nconsole.log(result); // { valid: false, error: "...", position: { line: 1, column: 2 } }` },
    ],
  },
  {
    slug: "password",
    name: "Password Generator",
    icon: "Lock",
    description: "Generate secure passwords, passphrases, check strength, and batch generate. Uses cryptographically secure randomness.",
    category: "Security",
    functions: [
      { name: "passwordGenerate", description: "Generate a secure password", params: [{ name: "options", type: "PasswordOptions", description: "{ length, lowercase, uppercase, digits, symbols, excludeAmbiguous }" }], returns: "string" },
      { name: "passwordPassphrase", description: "Generate a passphrase", params: [{ name: "options", type: "object", description: "{ words, separator, capitalize }" }], returns: "string" },
      { name: "passwordStrength", description: "Check password strength", params: [{ name: "password", type: "string", required: true, description: "The password to check" }], returns: "{ score, label, suggestions }" },
    ],
    examples: [
      { title: "Generate and check passwords", code: `const { passwordGenerate, passwordStrength } = require('toolmetry');\n\nconst pwd = passwordGenerate({ length: 20, symbols: true });\nconsole.log(pwd); // "x8#Km2@pL9!nQ4&wR7"\n\nconst strength = passwordStrength('mypassword123');\nconsole.log(strength); // { score: 3, label: "Fair", suggestions: [...] }` },
    ],
  },
  {
    slug: "morse",
    name: "Morse Code",
    icon: "Radio",
    description: "Encode text to Morse code and decode Morse code back to text. Supports letters, numbers, and common punctuation.",
    category: "Encoding",
    functions: [
      { name: "morseEncode", description: "Encode text to Morse code", params: [{ name: "input", type: "string", required: true, description: "The text to encode" }], returns: "string" },
      { name: "morseDecode", description: "Decode Morse code to text", params: [{ name: "input", type: "string", required: true, description: "Morse code string" }], returns: "string" },
      { name: "morseIsValid", description: "Check if string is valid Morse code", params: [{ name: "input", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Encode and decode Morse code", code: `const { morseEncode, morseDecode } = require('toolmetry');\n\nconst encoded = morseEncode('HELLO WORLD');\nconsole.log(encoded); // ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."\n\nconst decoded = morseDecode(encoded);\nconsole.log(decoded); // "HELLO WORLD"` },
    ],
  },
  {
    slug: "roman",
    name: "Roman Numerals",
    icon: "Hash",
    description: "Convert between Arabic numbers and Roman numerals (1-3999). Validate Roman numeral strings.",
    category: "Math",
    functions: [
      { name: "romanToRoman", description: "Convert number to Roman numeral", params: [{ name: "num", type: "number", required: true, description: "Number (1-3999)" }], returns: "string" },
      { name: "romanFromRoman", description: "Convert Roman numeral to number", params: [{ name: "str", type: "string", required: true, description: "Roman numeral string" }], returns: "number" },
      { name: "romanIsValid", description: "Check if string is valid Roman numeral", params: [{ name: "str", type: "string", required: true, description: "The string to check" }], returns: "boolean" },
    ],
    examples: [
      { title: "Convert numbers", code: `const { romanToRoman, romanFromRoman } = require('toolmetry');\n\nconsole.log(romanToRoman(2024));    // "MMXXIV"\nconsole.log(romanFromRoman('XIV')); // 14` },
    ],
  },
  {
    slug: "cron",
    name: "Cron Validator",
    icon: "Clock",
    description: "Validate and describe cron expressions with human-readable output. Supports standard 5-field and 6-field (with seconds) cron expressions plus aliases.",
    category: "Utility",
    functions: [
      { name: "cronValidate", description: "Validate a cron expression", params: [{ name: "expression", type: "string", required: true, description: "The cron expression" }], returns: "{ valid, error, fields }" },
      { name: "cronDescribe", description: "Get human-readable description", params: [{ name: "expression", type: "string", required: true, description: "The cron expression" }], returns: "string" },
    ],
    examples: [
      { title: "Validate cron expressions", code: `const { cronValidate, cronDescribe } = require('toolmetry');\n\nconst result = cronValidate('0 6 * * *');\nconsole.log(result); // { valid: true, error: null, fields: {...} }\n\nconsole.log(cronDescribe('@daily')); // "Runs once a day (at midnight)"` },
    ],
  },
  {
    slug: "diff",
    name: "Diff Checker",
    icon: "GitCompare",
    description: "Compare two strings line by line and find differences with unified diff output. Uses LCS-based algorithm for accurate diff results.",
    category: "Utility",
    functions: [
      { name: "diffCheck", description: "Compare two strings", params: [{ name: "oldText", type: "string", required: true, description: "Original text" }, { name: "newText", type: "string", required: true, description: "Modified text" }], returns: "{ lines, stats }" },
      { name: "diffUnified", description: "Generate unified diff string", params: [{ name: "oldText", type: "string", required: true, description: "Original text" }, { name: "newText", type: "string", required: true, description: "Modified text" }], returns: "string" },
      { name: "diffIsSame", description: "Check if two strings are identical", params: [{ name: "a", type: "string", required: true, description: "First string" }, { name: "b", type: "string", required: true, description: "Second string" }], returns: "boolean" },
    ],
    examples: [
      { title: "Compare texts", code: `const { diffCheck, diffUnified } = require('toolmetry');\n\nconst result = diffCheck('hello world', 'hello earth');\nconsole.log(result.stats); // { added: 1, removed: 1, unchanged: 1 }` },
    ],
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum",
    icon: "AlignLeft",
    description: "Generate placeholder text for design and development. Generate words, sentences, and paragraphs of lorem ipsum text.",
    category: "Content",
    functions: [
      { name: "loremWords", description: "Generate lorem ipsum words", params: [{ name: "count", type: "number", description: "Number of words (default: 30)", default: "30" }], returns: "string" },
      { name: "loremSentences", description: "Generate lorem ipsum sentences", params: [{ name: "count", type: "number", description: "Number of sentences (default: 5)", default: "5" }], returns: "string" },
      { name: "loremParagraphs", description: "Generate lorem ipsum paragraphs", params: [{ name: "count", type: "number", description: "Number of paragraphs (default: 3)", default: "3" }], returns: "string" },
    ],
    examples: [
      { title: "Generate placeholder text", code: `const { loremWords, loremParagraphs } = require('toolmetry');\n\nconsole.log(loremWords(10));     // 10 words of lorem ipsum\nconsole.log(loremParagraphs(2)); // 2 paragraphs of lorem ipsum` },
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
