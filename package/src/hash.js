/**
 * toolmetry — Hash Generator
 * Pure JS implementation using Node.js crypto (with browser fallback via SubtleCrypto).
 * @module hash
 */

'use strict';

var ALGORITHMS = ['md5', 'sha1', 'sha256', 'sha384', 'sha512'];

/**
 * Get the crypto module (Node.js or browser).
 * @returns {object} Crypto module or SubtleCrypto interface.
 * @private
 */
function _getCrypto() {
  if (typeof require === 'function') {
    try { return require('crypto'); } catch (e) { /* not in Node */ }
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error('No crypto module available');
}

/**
 * Generate a hash of the input string.
 * @param {string} input - The string to hash.
 * @param {'md5'|'sha1'|'sha256'|'sha384'|'sha512'} [algorithm='sha256'] - Hash algorithm.
 * @param {string} [encoding='hex'] - Output encoding ('hex', 'base64', 'base64url').
 * @returns {string} The hash digest.
 */
function hash(input, algorithm, encoding) {
  var algo = algorithm || 'sha256';
  var enc = encoding || 'hex';
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  if (!ALGORITHMS.includes(algo)) {
    throw new TypeError('Unsupported algorithm: ' + algo + '. Supported: ' + ALGORITHMS.join(', '));
  }
  if (!['hex', 'base64', 'base64url'].includes(enc)) {
    throw new TypeError('Unsupported encoding: ' + enc + '. Supported: hex, base64, base64url');
  }

  var crypto = _getCrypto();

  if (crypto.createHash) {
    var h = crypto.createHash(algo).update(input, 'utf8');
    if (enc === 'base64url') {
      return h.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return h.digest(enc);
  }

  throw new Error('Browser environment: use hashAsync() instead for SubtleCrypto support');
}

/**
 * Async hash using SubtleCrypto (browser-compatible).
 * @param {string} input - The string to hash.
 * @param {'sha-1'|'sha-256'|'sha-384'|'sha-512'} [algorithm='SHA-256'] - Algorithm.
 * @param {string} [encoding='hex'] - Output encoding.
 * @returns {Promise<string>} The hash digest.
 */
async function hashAsync(input, algorithm, encoding) {
  var enc = encoding || 'hex';
  var algo = algorithm || 'SHA-256';
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  var subtleAlgo = algo.toUpperCase().replace('SHA1', 'SHA-1').replace('SHA256', 'SHA-256').replace('SHA384', 'SHA-384').replace('SHA512', 'SHA-512');
  var encoder = new TextEncoder();
  var data = encoder.encode(input);
  var crypto = _getCrypto();
  var hashBuffer = await crypto.subtle.digest(subtleAlgo, data);
  return _bufferToHex(hashBuffer, enc);
}

/**
 * Generate HMAC hash.
 * @param {string} input - The data to hash.
 * @param {string} secret - The secret key.
 * @param {'sha256'|'sha512'} [algorithm='sha256'] - Algorithm.
 * @returns {string} HMAC digest in hex.
 */
function hmac(input, secret, algorithm) {
  var algo = algorithm || 'sha256';
  if (typeof input !== 'string' || typeof secret !== 'string') {
    throw new TypeError('Input and secret must be strings');
  }
  var crypto = _getCrypto();
  if (!crypto.createHmac) {
    throw new Error('HMAC requires Node.js crypto module');
  }
  return crypto.createHmac(algo, secret).update(input, 'utf8').digest('hex');
}

/**
 * Generate all supported hashes for a string at once.
 * @param {string} input - The string to hash.
 * @returns {Record<string, string>} Object with all algorithm hashes.
 */
function hashAll(input) {
  var result = {};
  for (var i = 0; i < ALGORITHMS.length; i++) {
    var algo = ALGORITHMS[i];
    try {
      result[algo] = hash(input, algo);
    } catch (e) {
      result[algo] = '(not available)';
    }
  }
  return result;
}

/**
 * Convert buffer to hex or base64 string.
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @param {string} encoding - Output encoding.
 * @returns {string} Encoded string.
 * @private
 */
function _bufferToHex(buffer, encoding) {
  var bytes = new Uint8Array(buffer);
  if (encoding === 'hex') {
    return Array.from(bytes).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }
  if (encoding === 'base64') {
    var binary = '';
    bytes.forEach(function(b) { binary += String.fromCharCode(b); });
    return btoa(binary);
  }
  return Array.from(bytes).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
}

module.exports = { hash: hash, hashAsync: hashAsync, hmac: hmac, hashAll: hashAll, ALGORITHMS: ALGORITHMS };
