// toolmetry — TypeScript Declarations v3.0.0

// ─── Base64 ─────────────────────────────────────────────────────────────────
export function base64Encode(input: string, encoding?: string): string;
export function base64Decode(input: string, encoding?: string): string;
export function base64EncodeURL(input: string): string;
export function base64DecodeURL(input: string): string;
export function base64IsValid(input: string): boolean;
export function base64EncodeBuffer(buffer: ArrayBuffer | Uint8Array): string;
export function base64DecodeToBuffer(input: string): Uint8Array;

export const base64: {
  encode: typeof base64Encode;
  decode: typeof base64Decode;
  encodeURL: typeof base64EncodeURL;
  decodeURL: typeof base64DecodeURL;
  isValid: typeof base64IsValid;
  encodeBuffer: typeof base64EncodeBuffer;
  decodeToBuffer: typeof base64DecodeToBuffer;
};

// ─── URL ────────────────────────────────────────────────────────────────────
export function urlEncode(input: string): string;
export function urlDecode(input: string): string;
export function urlBuildQuery(params: Record<string, string | number | boolean>): string;
export function urlParseQuery(qs: string): Record<string, string>;

export const url: {
  encode: typeof urlEncode;
  decode: typeof urlDecode;
  buildQuery: typeof urlBuildQuery;
  parseQuery: typeof urlParseQuery;
};

// ─── Hash ───────────────────────────────────────────────────────────────────
export const ALGORITHMS: string[];
export function hashGenerate(input: string, algorithm?: string, encoding?: string): string;
export function hashGenerateAsync(input: string, algorithm?: string, encoding?: string): Promise<string>;
export function hmacGenerate(input: string, secret: string, algorithm?: string): string;
export function hashGenerateAll(input: string): Record<string, string>;

// ─── JWT ────────────────────────────────────────────────────────────────────
export function jwtDecode(token: string): Record<string, unknown>;
export function jwtDecodeHeader(token: string): Record<string, unknown>;
export function jwtDecodePayload(token: string): Record<string, unknown>;
export function jwtIsExpired(token: string): boolean;
export function jwtIsValidFormat(token: string): boolean;
export function jwtGetAlgorithm(token: string): string | null;
export function jwtTimeUntilExpiry(token: string): number | null;

export const jwt: {
  decode: typeof jwtDecode;
  decodeHeader: typeof jwtDecodeHeader;
  decodePayload: typeof jwtDecodePayload;
  isExpired: typeof jwtIsExpired;
  isValidFormat: typeof jwtIsValidFormat;
  getAlgorithm: typeof jwtGetAlgorithm;
  timeUntilExpiry: typeof jwtTimeUntilExpiry;
};

// ─── UUID ───────────────────────────────────────────────────────────────────
export function uuidV4(): string;
export function uuidV4Short(): string;
export function uuidV4Batch(count: number): string[];
export function uuidIsValid(uuid: string): boolean;
export function uuidGetVersion(uuid: string): number | null;
export function uuidNil(): string;
export function uuidIsNil(uuid: string): boolean;

export const uuid: {
  v4: typeof uuidV4;
  v4Short: typeof uuidV4Short;
  v4Batch: typeof uuidV4Batch;
  isValid: typeof uuidIsValid;
  getVersion: typeof uuidGetVersion;
  nil: typeof uuidNil;
  isNil: typeof uuidIsNil;
};

// ─── AES-256 Encrypt/Decrypt ────────────────────────────────────────────────
export function aesEncrypt(plaintext: string, secret: string): string;
export function aesDecrypt(encrypted: string, secret: string): string;
export function aesEncryptAsync(plaintext: string, secret: string): Promise<string>;
export function aesDecryptAsync(encrypted: string, secret: string): Promise<string>;

export const encrypt: {
  encrypt: typeof aesEncrypt;
  decrypt: typeof aesDecrypt;
  encryptAsync: typeof aesEncryptAsync;
  decryptAsync: typeof aesDecryptAsync;
};

// ─── Random ─────────────────────────────────────────────────────────────────
export function randomString(length?: number, options?: { lowercase?: boolean; uppercase?: boolean; digits?: boolean; symbols?: boolean }): string;
export function randomInt(min: number, max: number): number;
export function randomHex(length?: number): string;
export function randomAlphanumeric(length?: number): string;
export function randomPick<T>(array: T[]): T;
export function randomShuffle<T>(array: T[]): T[];
export function randomBoolean(): boolean;
export function randomFloat(min: number, max: number, decimals?: number): number;

export const random: {
  string: typeof randomString;
  int: typeof randomInt;
  hex: typeof randomHex;
  alphanumeric: typeof randomAlphanumeric;
  pick: typeof randomPick;
  shuffle: typeof randomShuffle;
  boolean: typeof randomBoolean;
  float: typeof randomFloat;
};

// ─── Color ──────────────────────────────────────────────────────────────────
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null;
export function rgbToHex(r: number, g: number, b: number): string;
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number };
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null;
export function hslToHex(h: number, s: number, l: number): string;
export function colorConvert(value: string, from: string, to: string): string | null;
export function colorIsValidHex(hex: string): boolean;
export function colorLighten(hex: string, amount: number): string;
export function colorDarken(hex: string, amount: number): string;

// ─── HTML Entity ────────────────────────────────────────────────────────────
export function htmlEntityEncode(input: string): string;
export function htmlEntityDecode(input: string): string;
export function htmlEntityEncodeAll(input: string): string;
export function htmlEntityEncodeChars(input: string): string;

// ─── Number Base ────────────────────────────────────────────────────────────
export function baseConvert(value: string, fromBase: number, toBase: number): string;
export function toBinary(value: string | number): string;
export function toOctal(value: string | number): string;
export function toHex(value: string | number): string;
export function fromBinary(binary: string): number;
export function fromHex(hex: string): number;
export function convertAllBases(value: string | number): Record<string, string>;

// ─── Text ───────────────────────────────────────────────────────────────────
export function toCamelCase(input: string): string;
export function toPascalCase(input: string): string;
export function toSnakeCase(input: string): string;
export function toKebabCase(input: string): string;
export function toConstantCase(input: string): string;
export function slugify(input: string): string;
export function wordCount(input: string): number;
export function charCount(input: string, includeSpaces?: boolean): number;
export function reverse(input: string): string;
export function truncate(input: string, maxLength: number, suffix?: string): string;
export function removeExtraWhitespace(input: string): string;
export function removeLineBreaks(input: string): string;
export function escapeRegex(input: string): string;

// ─── JSON ───────────────────────────────────────────────────────────────────
export function jsonFormat(input: string, indent?: number): string;
export function jsonMinify(input: string): string;
export function jsonValidate(input: string): { valid: boolean; error: string | null; position: { line: number; column: number } | null };
export function jsonGetType(input: string): string;
export function jsonStats(input: string): { type: string; keys: number | null; depth: number; size: number };
export function jsonFlatten(input: string): Record<string, unknown>;

// ─── Password ───────────────────────────────────────────────────────────────
export interface PasswordOptions {
  length?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  digits?: boolean;
  symbols?: boolean;
  excludeAmbiguous?: boolean;
}
export function passwordGenerate(options?: PasswordOptions): string;
export function passwordPassphrase(options?: { words?: number; separator?: string; capitalize?: boolean }): string;
export function passwordStrength(password: string): { score: number; label: string; suggestions: string[] };
export function passwordGenerateBatch(count: number, options?: PasswordOptions): string[];

export const password: {
  generate: typeof passwordGenerate;
  passphrase: typeof passwordPassphrase;
  strength: typeof passwordStrength;
  generateBatch: typeof passwordGenerateBatch;
};

// ─── Morse Code ─────────────────────────────────────────────────────────────
export function morseEncode(input: string): string;
export function morseDecode(input: string): string;
export function morseIsValid(input: string): boolean;

export const morse: {
  encode: typeof morseEncode;
  decode: typeof morseDecode;
  isValid: typeof morseIsValid;
  MORSE_MAP: Record<string, string>;
};

// ─── Roman Numerals ─────────────────────────────────────────────────────────
export function romanToRoman(num: number): string;
export function romanFromRoman(str: string): number;
export function romanIsValid(str: string): boolean;

export const roman: {
  toRoman: typeof romanToRoman;
  fromRoman: typeof romanFromRoman;
  isValidRoman: typeof romanIsValid;
};

// ─── Cron ───────────────────────────────────────────────────────────────────
export interface CronValidationResult {
  valid: boolean;
  error: string | null;
  fields: Record<string, number[] | { alias: string; expanded: string }> | null;
}
export function cronValidate(expression: string): CronValidationResult;
export function cronDescribe(expression: string): string;

export const cron: {
  validate: typeof cronValidate;
  describe: typeof cronDescribe;
  ALIASES: Record<string, string>;
};

// ─── Diff ───────────────────────────────────────────────────────────────────
export interface DiffLine {
  type: 'same' | 'added' | 'removed';
  content: string;
  line: number;
}
export interface DiffResult {
  lines: DiffLine[];
  stats: { added: number; removed: number; unchanged: number };
}
export function diffCheck(oldText: string, newText: string): DiffResult;
export function diffUnified(oldText: string, newText: string, oldLabel?: string, newLabel?: string): string;
export function diffIsSame(a: string, b: string): boolean;

export const diff: {
  diff: typeof diffCheck;
  unifiedDiff: typeof diffUnified;
  isSame: typeof diffIsSame;
};

// ─── Lorem Ipsum ────────────────────────────────────────────────────────────
export function loremWords(count?: number): string;
export function loremSentences(count?: number): string;
export function loremParagraphs(count?: number): string;

export const lorem: {
  words: typeof loremWords;
  sentences: typeof loremSentences;
  paragraphs: typeof loremParagraphs;
};
