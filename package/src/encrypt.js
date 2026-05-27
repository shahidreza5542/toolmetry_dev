/**
 * toolmetry — AES-256 Encrypt / Decrypt
 * Secure text encryption and decryption using AES-256-GCM.
 * Uses Node.js crypto module (with SubtleCrypto browser fallback for async).
 * @module encrypt
 */

'use strict';

/**
 * Get the Node.js crypto module.
 * @returns {object|null} Node.js crypto module or null.
 * @private
 */
function _getNodeCrypto() {
  if (typeof require === 'function') {
    try { return require('crypto'); } catch (e) { return null; }
  }
  return null;
}

/**
 * Get the browser/global crypto object.
 * @returns {object} Crypto object (SubtleCrypto).
 * @private
 */
function _getBrowserCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  if (typeof crypto !== 'undefined') {
    return crypto;
  }
  throw new Error('No crypto module available');
}

/**
 * Encrypt a string using AES-256-GCM.
 * @param {string} plaintext - The text to encrypt.
 * @param {string} secret - The encryption secret (will be derived into a 256-bit key via PBKDF2).
 * @returns {string} Encrypted string in format "iv:authTag:ciphertext" (all Base64).
 */
function encrypt(plaintext, secret) {
  if (typeof plaintext !== 'string') {
    throw new TypeError('Plaintext must be a string');
  }
  if (typeof secret !== 'string' || secret.length < 1) {
    throw new TypeError('Secret must be a non-empty string');
  }

  var crypto = _getNodeCrypto();
  if (!crypto || !crypto.createCipheriv) {
    throw new Error('Synchronous AES encryption requires Node.js crypto. Use encryptAsync() for browser support.');
  }

  var key = _deriveKeySync(secret, crypto);
  var iv = crypto.randomBytes(12);
  var cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  var ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  var authTag = cipher.getAuthTag();

  return iv.toString('base64') + ':' + authTag.toString('base64') + ':' + ciphertext;
}

/**
 * Decrypt a string encrypted with AES-256-GCM.
 * @param {string} encrypted - The encrypted string in format "iv:authTag:ciphertext".
 * @param {string} secret - The encryption secret used during encryption.
 * @returns {string} Decrypted plaintext.
 */
function decrypt(encrypted, secret) {
  if (typeof encrypted !== 'string') {
    throw new TypeError('Encrypted text must be a string');
  }
  if (typeof secret !== 'string' || secret.length < 1) {
    throw new TypeError('Secret must be a non-empty string');
  }

  var crypto = _getNodeCrypto();
  if (!crypto || !crypto.createDecipheriv) {
    throw new Error('Synchronous AES decryption requires Node.js crypto. Use decryptAsync() for browser support.');
  }

  var parts = encrypted.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted format. Expected "iv:authTag:ciphertext"');
  }

  var ivB64 = parts[0];
  var authTagB64 = parts[1];
  var ciphertext = parts[2];
  var key = _deriveKeySync(secret, crypto);
  var iv = Buffer.from(ivB64, 'base64');
  var authTag = Buffer.from(authTagB64, 'base64');

  var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  var plaintext = decipher.update(ciphertext, 'base64', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}

/**
 * Async encrypt using SubtleCrypto (browser-compatible).
 * @param {string} plaintext - The text to encrypt.
 * @param {string} secret - The encryption secret.
 * @returns {Promise<string>} Encrypted string in format "iv:ciphertext" (all Base64url).
 */
async function encryptAsync(plaintext, secret) {
  if (typeof plaintext !== 'string') throw new TypeError('Plaintext must be a string');
  if (typeof secret !== 'string' || secret.length < 1) throw new TypeError('Secret must be a non-empty string');

  var browserCrypto = _getBrowserCrypto();
  var encoder = new TextEncoder();
  var keyMaterial = await _importKey(secret, browserCrypto);
  var iv = browserCrypto.getRandomValues(new Uint8Array(12));
  var encoded = encoder.encode(plaintext);

  var ciphertext = await browserCrypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    keyMaterial,
    encoded
  );

  var ivB64 = _bufferToBase64url(iv);
  var ctB64 = _bufferToBase64url(new Uint8Array(ciphertext));
  return ivB64 + ':' + ctB64;
}

/**
 * Async decrypt using SubtleCrypto (browser-compatible).
 * @param {string} encrypted - The encrypted string in format "iv:ciphertext".
 * @param {string} secret - The encryption secret.
 * @returns {Promise<string>} Decrypted plaintext.
 */
async function decryptAsync(encrypted, secret) {
  if (typeof encrypted !== 'string') throw new TypeError('Encrypted text must be a string');
  if (typeof secret !== 'string' || secret.length < 1) throw new TypeError('Secret must be a non-empty string');

  var parts = encrypted.split(':');
  if (parts.length !== 2) throw new Error('Invalid encrypted format. Expected "iv:ciphertext"');

  var ivB64 = parts[0];
  var ctB64 = parts[1];
  var browserCrypto = _getBrowserCrypto();
  var keyMaterial = await _importKey(secret, browserCrypto);
  var iv = _base64urlToBuffer(ivB64);
  var ciphertext = _base64urlToBuffer(ctB64);

  var decrypted = await browserCrypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    keyMaterial,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Derive a 256-bit key from a secret using PBKDF2 (Node.js sync).
 * @param {string} secret - The secret string.
 * @param {object} crypto - Node.js crypto module.
 * @returns {Buffer} Derived key.
 * @private
 */
function _deriveKeySync(secret, crypto) {
  var salt = crypto.createHash('sha256').update('toolmetry-aes-salt').digest();
  return crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256');
}

/**
 * Import a key for SubtleCrypto (browser async).
 * @param {string} secret - The secret string.
 * @param {object} browserCrypto - Browser crypto object.
 * @returns {Promise<CryptoKey>} Imported key.
 * @private
 */
async function _importKey(secret, browserCrypto) {
  var encoder = new TextEncoder();
  var keyData = encoder.encode(secret);
  var hash = await browserCrypto.subtle.digest('SHA-256', keyData);
  return browserCrypto.subtle.importKey(
    { name: 'AES-GCM' },
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Convert buffer to Base64URL string.
 * @param {Uint8Array} buffer - The buffer to convert.
 * @returns {string} Base64URL encoded string.
 * @private
 */
function _bufferToBase64url(buffer) {
  var bytes = new Uint8Array(buffer);
  var binary = '';
  for (var i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Convert Base64URL string to Uint8Array.
 * @param {string} b64url - Base64URL encoded string.
 * @returns {Uint8Array} Decoded byte array.
 * @private
 */
function _base64urlToBuffer(b64url) {
  var b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  var binary = atob(b64);
  var bytes = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

module.exports = { encrypt: encrypt, decrypt: decrypt, encryptAsync: encryptAsync, decryptAsync: decryptAsync };
