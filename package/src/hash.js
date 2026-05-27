/**
 * toolmetryai — Hash Generator
 * Pure JS implementation using Node.js crypto (with browser fallback via SubtleCrypto).
 */

const ALGORITHMS = ['md5', 'sha1', 'sha256', 'sha384', 'sha512'];

/**
 * Generate a hash of the input string.
 * @param {string} input - The string to hash.
 * @param {'md5'|'sha1'|'sha256'|'sha384'|'sha512'} [algorithm='sha256'] - Hash algorithm.
 * @param {string} [encoding='hex'] - Output encoding ('hex', 'base64', 'base64url').
 * @returns {string} The hash digest.
 */
function hash(input, algorithm = 'sha256', encoding = 'hex') {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  if (!ALGORITHMS.includes(algorithm)) {
    throw new TypeError(`Unsupported algorithm: ${algorithm}. Supported: ${ALGORITHMS.join(', ')}`);
  }
  if (!['hex', 'base64', 'base64url'].includes(encoding)) {
    throw new TypeError(`Unsupported encoding: ${encoding}. Supported: hex, base64, base64url`);
  }

  const crypto = _getCrypto();

  if (crypto.createHash) {
    // Node.js
    const h = crypto.createHash(algorithm).update(input, 'utf8');
    if (encoding === 'base64url') {
      return h.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return h.digest(encoding);
  }

  // Browser — SubtleCrypto (async, but we wrap synchronously is not possible)
  throw new Error('Browser environment: use hashAsync() instead for SubtleCrypto support');
}

/**
 * Async hash using SubtleCrypto (browser-compatible).
 * @param {string} input - The string to hash.
 * @param {'sha-1'|'sha-256'|'sha-384'|'sha-512'} [algorithm='SHA-256'] - Algorithm.
 * @param {string} [encoding='hex'] - Output encoding.
 * @returns {Promise<string>} The hash digest.
 */
async function hashAsync(input, algorithm = 'SHA-256', encoding = 'hex') {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const subtleAlgo = algorithm.toUpperCase().replace('SHA1', 'SHA-1').replace('SHA256', 'SHA-256').replace('SHA384', 'SHA-384').replace('SHA512', 'SHA-512');
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const crypto = _getCrypto();
  const hashBuffer = await crypto.subtle.digest(subtleAlgo, data);
  return _bufferToHex(hashBuffer, encoding);
}

/**
 * Generate HMAC hash.
 * @param {string} input - The data to hash.
 * @param {string} secret - The secret key.
 * @param {'sha256'|'sha512'} [algorithm='sha256'] - Algorithm.
 * @returns {string} HMAC digest in hex.
 */
function hmac(input, secret, algorithm = 'sha256') {
  if (typeof input !== 'string' || typeof secret !== 'string') {
    throw new TypeError('Input and secret must be strings');
  }
  const crypto = _getCrypto();
  if (!crypto.createHmac) {
    throw new Error('HMAC requires Node.js crypto module');
  }
  return crypto.createHmac(algorithm, secret).update(input, 'utf8').digest('hex');
}

/**
 * Generate all supported hashes for a string at once.
 * @param {string} input - The string to hash.
 * @returns {Record<string, string>} Object with all algorithm hashes.
 */
function hashAll(input) {
  const result = {};
  for (const algo of ALGORITHMS) {
    try {
      result[algo] = hash(input, algo);
    } catch {
      result[algo] = '(not available)';
    }
  }
  return result;
}

function _getCrypto() {
  if (typeof require === 'function') {
    try { return require('crypto'); } catch { /* not in Node */ }
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error('No crypto module available');
}

function _bufferToHex(buffer, encoding) {
  const bytes = new Uint8Array(buffer);
  if (encoding === 'hex') {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  if (encoding === 'base64') {
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

module.exports = { hash, hashAsync, hmac, hashAll, ALGORITHMS };
