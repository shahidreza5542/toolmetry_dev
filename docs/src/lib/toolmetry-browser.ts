export interface PlaygroundFunction {
  tool: string;
  name: string;
  params: { name: string; placeholder: string; default?: string }[];
  execute: (args: string[]) => Promise<string>;
}

const base64 = {
  encode: (input: string): string => {
    try { return btoa(unescape(encodeURIComponent(input))); }
    catch { throw new Error("Invalid input for Base64 encoding"); }
  },
  decode: (input: string): string => {
    try { return decodeURIComponent(escape(atob(input.trim()))); }
    catch { throw new Error("Invalid Base64 string"); }
  },
  encodeURL: (input: string): string => {
    return base64.encode(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  decodeURL: (input: string): string => {
    let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) b64 += "=";
    return base64.decode(b64);
  },
  isValid: (input: string): boolean => {
    return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
  },
};

const url = {
  encode: (input: string) => encodeURIComponent(input),
  decode: (input: string) => decodeURIComponent(input),
  buildQuery: (params: Record<string, string>) => {
    const entries = Object.entries(params).filter(([, v]) => v);
    return entries.length > 0 ? "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&") : "";
  },
  parseQuery: (qs: string) => {
    const str = qs.startsWith("?") ? qs.slice(1) : qs;
    const result: Record<string, string> = {};
    str.split("&").forEach(pair => {
      const [key, ...rest] = pair.split("=");
      if (key) result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
    });
    return result;
  },
};

const hash = {
  hashAsync: async (input: string, algorithm: string = "SHA-256"): Promise<string> => {
    const data = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest(algorithm, data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  },
};

const jwt = {
  decode: (token: string) => {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts");
    const decode64 = (b64url: string) => {
      let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4 !== 0) b64 += "=";
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    };
    return { header: decode64(parts[0]), payload: decode64(parts[1]), signature: parts[2] };
  },
  isExpired: (token: string) => {
    const { payload } = jwt.decode(token);
    if (!payload.exp) return false;
    return Date.now() / 1000 > payload.exp;
  },
  isValidFormat: (token: string) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(token),
};

const uuid = {
  v4: (): string => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  },
  isValid: (input: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input),
};

const aes = {
  encryptAsync: async (plaintext: string, secret: string): Promise<string> => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const keyBytes = await crypto.subtle.digest("SHA-256", keyData);
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    const ivB64 = btoa(String.fromCharCode(...iv));
    const ctB64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    return `${ivB64}:${ctB64}`;
  },
  decryptAsync: async (encrypted: string, secret: string): Promise<string> => {
    const parts = encrypted.split(":");
    if (parts.length !== 2) throw new Error('Invalid format. Expected "iv:ciphertext"');
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const keyBytes = await crypto.subtle.digest("SHA-256", keyData);
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]);
    const iv = Uint8Array.from(atob(parts[0]), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    return new TextDecoder().decode(decrypted);
  },
};

const random = {
  string: (length: number = 16, options?: { lowercase?: boolean; uppercase?: boolean; digits?: boolean; symbols?: boolean }): string => {
    const opts = { lowercase: true, uppercase: true, digits: true, symbols: false, ...options };
    let chars = "";
    if (opts.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (opts.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (opts.digits) chars += "0123456789";
    if (opts.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) throw new Error("At least one character set needed");
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, v => chars[v % chars.length]).join("");
  },
  int: (min: number, max: number): number => {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return min + (arr[0] % (max - min + 1));
  },
  hex: (length: number = 32): string => {
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
  },
  boolean: (): boolean => {
    const arr = new Uint8Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % 2 === 1;
  },
};

const color = {
  hexToRgb: (hex: string) => {
    const h = hex.replace(/^#/, "");
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  },
  rgbToHex: (r: number, g: number, b: number) => "#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join(""),
};

const htmlEntity = {
  encode: (input: string) => input.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c),
  decode: (input: string) => input.replace(/&(amp|lt|gt|quot|#39|apos);/g, e => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" })[e] || e),
};

const numberBase = {
  convert: (value: string, from: number, to: number) => parseInt(value, from).toString(to),
  toBinary: (v: string | number) => Number(v).toString(2),
  toHex: (v: string | number) => Number(v).toString(16),
};

const text = {
  toCamelCase: (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/[\s_-]+/g, ""),
  toSnakeCase: (s: string) => s.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase(),
  toKebabCase: (s: string) => s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase(),
  slugify: (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, ""),
  wordCount: (s: string) => s.trim() ? s.trim().split(/\s+/).length : 0,
  charCount: (s: string, spaces?: boolean) => spaces ? s.length : s.replace(/\s/g, "").length,
};

const json = {
  format: (s: string) => JSON.stringify(JSON.parse(s), null, 2),
  minify: (s: string) => JSON.stringify(JSON.parse(s)),
  validate: (s: string) => { try { JSON.parse(s); return { valid: true, error: null }; } catch (e: any) { return { valid: false, error: e.message }; } },
};

const password = {
  generate: (length: number = 16): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, v => chars[v % chars.length]).join("");
  },
  strength: (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong", "Excellent"];
    return { score, label: labels[Math.min(score, 6)] };
  },
};

const morse = {
  encode: (input: string) => {
    const map: Record<string, string> = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----." };
    return input.toUpperCase().split("").map(c => c === " " ? "/" : map[c] || c).join(" ");
  },
  decode: (input: string) => {
    const map: Record<string, string> = { ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z" };
    return input.split(" ").map(c => c === "/" ? " " : map[c] || c).join("");
  },
};

const roman = {
  toRoman: (num: number) => {
    const map: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let result = "";
    for (const [val, sym] of map) { while (num >= val) { result += sym; num -= val; } }
    return result;
  },
  fromRoman: (str: string) => {
    const vals: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    const upper = str.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      const curr = vals[upper[i]];
      const next = vals[upper[i + 1]];
      if (next && curr < next) result -= curr;
      else result += curr;
    }
    return result;
  },
};

const cron = {
  validate: (expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return { valid: false, error: "Must have 5 fields" };
    return { valid: true, error: null };
  },
  describe: (expr: string) => {
    const aliases: Record<string, string> = { "@yearly": "Run once a year", "@monthly": "Run once a month", "@weekly": "Run once a week", "@daily": "Run once a day", "@hourly": "Run once an hour" };
    return aliases[expr.trim()] || expr;
  },
};

const diff = {
  diff: (oldText: string, newText: string) => {
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");
    let added = 0, removed = 0, unchanged = 0;
    const maxLen = Math.max(oldLines.length, newLines.length);
    for (let i = 0; i < maxLen; i++) {
      if (oldLines[i] === newLines[i]) unchanged++;
      else { if (i < newLines.length) added++; if (i < oldLines.length) removed++; }
    }
    return { stats: { added, removed, unchanged } };
  },
  isSame: (a: string, b: string) => a === b,
};

const lorem = {
  words: (count: number = 10) => "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod".split(" ").slice(0, count).join(" "),
  sentences: (count: number = 3) => Array.from({ length: count }, (_, i) => `Lorem ipsum dolor sit amet consectetur adipiscing elit ${i + 1}.`).join(" "),
  paragraphs: (count: number = 2) => Array.from({ length: count }, (_, i) => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore paragraph ${i + 1}.`).join("\n\n"),
};

export const playgroundFunctions: PlaygroundFunction[] = [
  { tool: "base64", name: "base64Encode", params: [{ name: "input", placeholder: "Hello World!" }], execute: async ([input]) => base64.encode(input) },
  { tool: "base64", name: "base64Decode", params: [{ name: "input", placeholder: "SGVsbG8gV29ybGQh" }], execute: async ([input]) => base64.decode(input) },
  { tool: "base64", name: "base64EncodeURL", params: [{ name: "input", placeholder: "hello+world/data" }], execute: async ([input]) => base64.encodeURL(input) },
  { tool: "base64", name: "base64DecodeURL", params: [{ name: "input", placeholder: "aGVsbG8rd29ybGQvZGF0YQ" }], execute: async ([input]) => base64.decodeURL(input) },
  { tool: "url", name: "urlEncode", params: [{ name: "input", placeholder: "hello world" }], execute: async ([input]) => url.encode(input) },
  { tool: "url", name: "urlDecode", params: [{ name: "input", placeholder: "hello%20world" }], execute: async ([input]) => url.decode(input) },
  { tool: "url", name: "urlBuildQuery", params: [{ name: "key1", placeholder: "name", default: "name" }, { name: "value1", placeholder: "toolmetry", default: "toolmetry" }], execute: async ([k, v]) => url.buildQuery({ [k]: v }) },
  { tool: "hash", name: "hashAsync (SHA-256)", params: [{ name: "input", placeholder: "hello world" }], execute: async ([input]) => hash.hashAsync(input) },
  { tool: "hash", name: "hashAsync (SHA-1)", params: [{ name: "input", placeholder: "hello world" }], execute: async ([input]) => hash.hashAsync(input, "SHA-1") },
  { tool: "hash", name: "hashAsync (SHA-512)", params: [{ name: "input", placeholder: "hello world" }], execute: async ([input]) => hash.hashAsync(input, "SHA-512") },
  { tool: "jwt", name: "jwtDecode", params: [{ name: "token", placeholder: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.abc" }], execute: async ([token]) => JSON.stringify(jwt.decode(token), null, 2) },
  { tool: "jwt", name: "jwtIsValidFormat", params: [{ name: "token", placeholder: "a.b.c" }], execute: async ([token]) => String(jwt.isValidFormat(token)) },
  { tool: "uuid", name: "uuidV4", params: [], execute: async () => uuid.v4() },
  { tool: "uuid", name: "uuidIsValid", params: [{ name: "uuid", placeholder: "550e8400-e29b-41d4-a716-446655440000" }], execute: async ([id]) => String(uuid.isValid(id)) },
  { tool: "encrypt", name: "aesEncryptAsync", params: [{ name: "plaintext", placeholder: "Secret message" }, { name: "secret", placeholder: "my-password" }], execute: async ([text, secret]) => aes.encryptAsync(text, secret) },
  { tool: "encrypt", name: "aesDecryptAsync", params: [{ name: "encrypted", placeholder: "iv:ciphertext" }, { name: "secret", placeholder: "my-password" }], execute: async ([enc, secret]) => aes.decryptAsync(enc, secret) },
  { tool: "random", name: "randomString", params: [{ name: "length", placeholder: "16", default: "16" }], execute: async ([len]) => random.string(Number(len) || 16) },
  { tool: "random", name: "randomInt", params: [{ name: "min", placeholder: "1", default: "1" }, { name: "max", placeholder: "100", default: "100" }], execute: async ([min, max]) => String(random.int(Number(min), Number(max))) },
  { tool: "random", name: "randomHex", params: [{ name: "length", placeholder: "32", default: "32" }], execute: async ([len]) => random.hex(Number(len) || 32) },
  { tool: "random", name: "randomBoolean", params: [], execute: async () => String(random.boolean()) },
  { tool: "color", name: "hexToRgb", params: [{ name: "hex", placeholder: "#ff0000" }], execute: async ([hex]) => JSON.stringify(color.hexToRgb(hex)) },
  { tool: "color", name: "rgbToHex", params: [{ name: "r", placeholder: "255" }, { name: "g", placeholder: "0" }, { name: "b", placeholder: "0" }], execute: async ([r, g, b]) => color.rgbToHex(Number(r), Number(g), Number(b)) },
  { tool: "htmlEntity", name: "htmlEntityEncode", params: [{ name: "input", placeholder: '<div class="test">' }], execute: async ([input]) => htmlEntity.encode(input) },
  { tool: "htmlEntity", name: "htmlEntityDecode", params: [{ name: "input", placeholder: "&lt;div&gt;" }], execute: async ([input]) => htmlEntity.decode(input) },
  { tool: "numberBase", name: "toBinary", params: [{ name: "value", placeholder: "255" }], execute: async ([v]) => numberBase.toBinary(v) },
  { tool: "numberBase", name: "toHex", params: [{ name: "value", placeholder: "255" }], execute: async ([v]) => numberBase.toHex(v) },
  { tool: "text", name: "toCamelCase", params: [{ name: "input", placeholder: "hello world" }], execute: async ([input]) => text.toCamelCase(input) },
  { tool: "text", name: "toSnakeCase", params: [{ name: "input", placeholder: "helloWorld" }], execute: async ([input]) => text.toSnakeCase(input) },
  { tool: "text", name: "toKebabCase", params: [{ name: "input", placeholder: "helloWorld" }], execute: async ([input]) => text.toKebabCase(input) },
  { tool: "text", name: "slugify", params: [{ name: "input", placeholder: "Hello World! 123" }], execute: async ([input]) => text.slugify(input) },
  { tool: "json", name: "jsonFormat", params: [{ name: "input", placeholder: '{"a":1}' }], execute: async ([input]) => json.format(input) },
  { tool: "json", name: "jsonValidate", params: [{ name: "input", placeholder: '{"a":1}' }], execute: async ([input]) => JSON.stringify(json.validate(input)) },
  { tool: "password", name: "passwordGenerate", params: [{ name: "length", placeholder: "16", default: "16" }], execute: async ([len]) => password.generate(Number(len) || 16) },
  { tool: "password", name: "passwordStrength", params: [{ name: "password", placeholder: "MyP@ss123" }], execute: async ([pwd]) => JSON.stringify(password.strength(pwd)) },
  { tool: "morse", name: "morseEncode", params: [{ name: "input", placeholder: "SOS" }], execute: async ([input]) => morse.encode(input) },
  { tool: "morse", name: "morseDecode", params: [{ name: "input", placeholder: "... --- ..." }], execute: async ([input]) => morse.decode(input) },
  { tool: "roman", name: "toRoman", params: [{ name: "num", placeholder: "42" }], execute: async ([num]) => roman.toRoman(Number(num)) },
  { tool: "roman", name: "fromRoman", params: [{ name: "str", placeholder: "XLII" }], execute: async ([str]) => String(roman.fromRoman(str)) },
  { tool: "cron", name: "cronValidate", params: [{ name: "expression", placeholder: "0 0 * * *" }], execute: async ([expr]) => JSON.stringify(cron.validate(expr)) },
  { tool: "diff", name: "diffIsSame", params: [{ name: "text1", placeholder: "hello" }, { name: "text2", placeholder: "world" }], execute: async ([a, b]) => String(diff.isSame(a, b)) },
  { tool: "lorem", name: "loremWords", params: [{ name: "count", placeholder: "10", default: "10" }], execute: async ([count]) => lorem.words(Number(count) || 10) },
  { tool: "lorem", name: "loremParagraphs", params: [{ name: "count", placeholder: "2", default: "2" }], execute: async ([count]) => lorem.paragraphs(Number(count) || 2) },
];
