/**
 * toolmetry — Base64 Encode / Decode
 * Pure JS, no dependencies. Works in Node.js and browsers.
 * @module base64
 */

'use strict';

/**
 * Encode a string to Base64.
 * @param {string} input - The string to encode.
 * @param {string} [encoding='utf-8'] - Character encoding.
 * @returns {string} Base64 encoded string.
 */
function encode(input, encoding) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  var enc = encoding || 'utf-8';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, enc).toString('base64');
  }
  return btoa(unescape(encodeURIComponent(input)));
}

/**
 * Decode a Base64 string back to plaintext.
 * @param {string} input - The Base64 string to decode.
 * @param {string} [encoding='utf-8'] - Character encoding.
 * @returns {string} Decoded string.
 */
function decode(input, encoding) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  var enc = encoding || 'utf-8';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'base64').toString(enc);
  }
  return decodeURIComponent(escape(atob(input)));
}

/**
 * Encode a string to Base64URL (URL-safe Base64).
 * @param {string} input - The string to encode.
 * @returns {string} Base64URL encoded string.
 */
function encodeURL(input) {
  return encode(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Decode a Base64URL string back to plaintext.
 * @param {string} input - The Base64URL string to decode.
 * @returns {string} Decoded string.
 */
function decodeURL(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  var padded = input
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  while (padded.length % 4 !== 0) {
    padded += '=';
  }
  return decode(padded);
}

/**
 * Check if a string is valid Base64.
 * @param {string} input - The string to check.
 * @returns {boolean} True if valid Base64.
 */
function isValid(input) {
  if (typeof input !== 'string') return false;
  var regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return regex.test(input) && input.length % 4 === 0;
}

/**
 * Encode an ArrayBuffer/Uint8Array to Base64.
 * @param {ArrayBuffer|Uint8Array} buffer - The buffer to encode.
 * @returns {string} Base64 encoded string.
 */
function encodeBuffer(buffer) {
  var bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  var binary = '';
  for (var i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(binary, 'binary').toString('base64');
  }
  return btoa(binary);
}

/**
 * Decode a Base64 string to Uint8Array.
 * @param {string} input - The Base64 string to decode.
 * @returns {Uint8Array} Decoded byte array.
 */
function decodeToBuffer(input) {
  var binary;
  if (typeof Buffer !== 'undefined') {
    binary = Buffer.from(input, 'base64').toString('binary');
  } else {
    binary = atob(input);
  }
  var bytes = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

module.exports = { encode: encode, decode: decode, encodeURL: encodeURL, decodeURL: decodeURL, isValid: isValid, encodeBuffer: encodeBuffer, decodeToBuffer: decodeToBuffer };
