/**
 * toolmetry — Comprehensive Developer Tools Library
 * Built by ToolmetryAI | https://toolmetryai.com
 *
 * A collection of essential developer tools for web development:
 * - Base64 encode/decode
 * - URL encode/decode
 * - Hash generator (MD5, SHA-1, SHA-256, SHA-384, SHA-512)
 * - JWT decoder
 * - UUID generator
 * - AES-256 encrypt/decrypt
 * - Random generator (string, int, hex, alphanumeric, pick, shuffle, boolean, float)
 * - Color converter (HEX, RGB, HSL)
 * - HTML entity encoder/decoder
 * - Number base converter
 * - Text utilities (case conversion, slugify, counting, etc.)
 * - JSON formatter/validator
 * - Password generator
 * - Morse code encoder/decoder
 * - Roman numeral converter
 * - Cron expression validator
 * - Diff checker
 * - Lorem ipsum generator
 *
 * @module toolmetry
 * @version 3.1.0
 */

'use strict';

var base64 = require('./base64');
var url = require('./url');
var hash = require('./hash');
var jwt = require('./jwt');
var uuid = require('./uuid');
var encrypt = require('./encrypt');
var random = require('./random');
var color = require('./color');
var htmlEntity = require('./htmlEntity');
var numberBase = require('./numberBase');
var text = require('./text');
var json = require('./json');
var password = require('./password');
var morse = require('./morse');
var roman = require('./roman');
var cron = require('./cron');
var diff = require('./diff');
var lorem = require('./lorem');

module.exports = {
  // ─── Base64 ─────────────────────────────────────────────────────────────
  base64: base64,
  base64Encode: base64.encode,
  base64Decode: base64.decode,
  base64EncodeURL: base64.encodeURL,
  base64DecodeURL: base64.decodeURL,
  base64IsValid: base64.isValid,
  base64EncodeBuffer: base64.encodeBuffer,
  base64DecodeToBuffer: base64.decodeToBuffer,

  // ─── URL ────────────────────────────────────────────────────────────────
  url: url,
  urlEncode: url.encode,
  urlDecode: url.decode,
  urlBuildQuery: url.buildQuery,
  urlParseQuery: url.parseQuery,

  // ─── Hash ───────────────────────────────────────────────────────────────
  hash: hash,
  hashGenerate: hash.hash,
  hashAsync: hash.hashAsync,
  hmacGenerate: hash.hmac,
  hashAll: hash.hashAll,
  ALGORITHMS: hash.ALGORITHMS,

  // ─── JWT ────────────────────────────────────────────────────────────────
  jwt: jwt,
  jwtDecode: jwt.decode,
  jwtDecodeHeader: jwt.decodeHeader,
  jwtDecodePayload: jwt.decodePayload,
  jwtIsExpired: jwt.isExpired,
  jwtIsValidFormat: jwt.isValidFormat,
  jwtGetAlgorithm: jwt.getAlgorithm,
  jwtTimeUntilExpiry: jwt.timeUntilExpiry,

  // ─── UUID ───────────────────────────────────────────────────────────────
  uuid: uuid,
  uuidV4: uuid.v4,
  uuidV4Short: uuid.v4Short,
  uuidV4Batch: uuid.v4Batch,
  uuidIsValid: uuid.isValid,
  uuidGetVersion: uuid.getVersion,
  uuidNil: uuid.nil,
  uuidIsNil: uuid.isNil,

  // ─── AES-256 Encrypt/Decrypt ────────────────────────────────────────────
  encrypt: encrypt,
  aesEncrypt: encrypt.encrypt,
  aesDecrypt: encrypt.decrypt,
  aesEncryptAsync: encrypt.encryptAsync,
  aesDecryptAsync: encrypt.decryptAsync,

  // ─── Random ─────────────────────────────────────────────────────────────
  random: random,
  randomString: random.string,
  randomInt: random.int,
  randomHex: random.hex,
  randomAlphanumeric: random.alphanumeric,
  randomPick: random.pick,
  randomShuffle: random.shuffle,
  randomBoolean: random.boolean,
  randomFloat: random.float,

  // ─── Color ──────────────────────────────────────────────────────────────
  color: color,
  colorConvert: color.convert,
  colorIsValidHex: color.isValidHex,
  colorLighten: color.lighten,
  colorDarken: color.darken,
  hexToRgb: color.hexToRgb,
  rgbToHex: color.rgbToHex,
  rgbToHsl: color.rgbToHsl,
  hslToRgb: color.hslToRgb,
  hexToHsl: color.hexToHsl,
  hslToHex: color.hslToHex,

  // ─── HTML Entity ────────────────────────────────────────────────────────
  htmlEntity: htmlEntity,
  htmlEntityEncode: htmlEntity.encode,
  htmlEntityDecode: htmlEntity.decode,
  htmlEntityEncodeAll: htmlEntity.encodeAll,
  htmlEntityEncodeChars: htmlEntity.encodeChars,

  // ─── Number Base ────────────────────────────────────────────────────────
  numberBase: numberBase,
  baseConvert: numberBase.convert,
  toBinary: numberBase.toBinary,
  toOctal: numberBase.toOctal,
  toHex: numberBase.toHex,
  fromBinary: numberBase.fromBinary,
  fromHex: numberBase.fromHex,
  convertAllBases: numberBase.convertAll,

  // ─── Text ───────────────────────────────────────────────────────────────
  text: text,
  toCamelCase: text.toCamelCase,
  toPascalCase: text.toPascalCase,
  toSnakeCase: text.toSnakeCase,
  toKebabCase: text.toKebabCase,
  toConstantCase: text.toConstantCase,
  slugify: text.slugify,
  wordCount: text.wordCount,
  charCount: text.charCount,
  reverse: text.reverse,
  truncate: text.truncate,
  removeExtraWhitespace: text.removeExtraWhitespace,
  removeLineBreaks: text.removeLineBreaks,
  escapeRegex: text.escapeRegex,

  // ─── JSON ───────────────────────────────────────────────────────────────
  json: json,
  jsonFormat: json.format,
  jsonMinify: json.minify,
  jsonValidate: json.validate,
  jsonGetType: json.getType,
  jsonStats: json.stats,
  jsonFlatten: json.flatten,

  // ─── Password ───────────────────────────────────────────────────────────
  password: password,
  passwordGenerate: password.generate,
  passwordPassphrase: password.passphrase,
  passwordStrength: password.strength,
  passwordGenerateBatch: password.generateBatch,

  // ─── Morse Code ─────────────────────────────────────────────────────────
  morse: morse,
  morseEncode: morse.encode,
  morseDecode: morse.decode,
  morseIsValid: morse.isValid,

  // ─── Roman Numerals ─────────────────────────────────────────────────────
  roman: roman,
  romanToRoman: roman.toRoman,
  romanFromRoman: roman.fromRoman,
  romanIsValid: roman.isValidRoman,

  // ─── Cron ───────────────────────────────────────────────────────────────
  cron: cron,
  cronValidate: cron.validate,
  cronDescribe: cron.describe,

  // ─── Diff ───────────────────────────────────────────────────────────────
  diff: diff,
  diffCheck: diff.diff,
  diffUnified: diff.unifiedDiff,
  diffIsSame: diff.isSame,

  // ─── Lorem Ipsum ────────────────────────────────────────────────────────
  lorem: lorem,
  loremWords: lorem.words,
  loremSentences: lorem.sentences,
  loremParagraphs: lorem.paragraphs,
};
