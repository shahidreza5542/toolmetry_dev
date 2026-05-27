/**
 * toolmetry — AES-256 Encrypt / Decrypt
 * Secure text encryption and decryption using AES-256-GCM.
 * Uses Node.js crypto module (with SubtleCrypto browser fallback for async).
 */

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

  const crypto = _getCrypto();
  if (!crypto.createCipheriv) {
    throw new Error('Synchronous AES encryption requires Node.js crypto. Use encryptAsync() for browser support.');
  }

  const key = _deriveKeySync(secret, crypto);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  const authTag = cipher.getAuthTag();

  return `${iv.toString('base64')}:${authTag.toString('base64')}:${ciphertext}`;
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

  const crypto = _getCrypto();
  if (!crypto.createDecipheriv) {
    throw new Error('Synchronous AES decryption requires Node.js crypto. Use decryptAsync() for browser support.');
  }

  const parts = encrypted.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted format. Expected "iv:authTag:ciphertext"');
  }

  const [ivB64, authTagB64, ciphertext] = parts;
  const key = _deriveKeySync(secret, crypto);
  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(authTagB64, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
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

  const encoder = new TextEncoder();
  const keyMaterial = await _importKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    keyMaterial,
    encoded
  );

  const ivB64 = _bufferToBase64url(iv);
  const ctB64 = _bufferToBase64url(new Uint8Array(ciphertext));
  return `${ivB64}:${ctB64}`;
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

  const parts = encrypted.split(':');
  if (parts.length !== 2) throw new Error('Invalid encrypted format. Expected "iv:ciphertext"');

  const [ivB64, ctB64] = parts;
  const keyMaterial = await _importKey(secret);
  const iv = _base64urlToBuffer(ivB64);
  const ciphertext = _base64urlToBuffer(ctB64);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    keyMaterial,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

function _deriveKeySync(secret, crypto) {
  const salt = crypto.createHash('sha256').update('toolmetry-aes-salt').digest();
  return crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256');
}

async function _importKey(secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  return crypto.subtle.importKey(
    { name: 'AES-GCM' },
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

function _bufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function _base64urlToBuffer(b64url) {
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
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

module.exports = { encrypt, decrypt, encryptAsync, decryptAsync };
