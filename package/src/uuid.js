/**
 * toolmetry — UUID Generator
 * Generate and validate UUID v4 identifiers.
 * @module uuid
 */

'use strict';

/**
 * Get the crypto module (Node.js or browser).
 * @returns {object} Crypto module.
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
 * Generate a v4 (random) UUID.
 * @returns {string} UUID string (lowercase, with dashes).
 */
function v4() {
  var crypto = _getCrypto();
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback using crypto.getRandomValues
  if (typeof crypto.getRandomValues === 'function') {
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
    var hex = Array.from(bytes, function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
  }
  // Last resort: Math.random (not cryptographically secure)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate a v4 UUID without dashes.
 * @returns {string} 32-character hex string.
 */
function v4Short() {
  return v4().replace(/-/g, '');
}

/**
 * Generate multiple v4 UUIDs at once.
 * @param {number} count - Number of UUIDs to generate.
 * @returns {string[]} Array of UUID strings.
 */
function v4Batch(count) {
  if (typeof count !== 'number' || count < 1) {
    throw new TypeError('Count must be a positive number');
  }
  if (count > 10000) {
    throw new RangeError('Maximum batch size is 10,000');
  }
  return Array.from({ length: count }, function() { return v4(); });
}

/**
 * Validate a UUID string.
 * @param {string} input - The string to validate.
 * @returns {boolean} True if valid UUID format.
 */
function isValid(input) {
  if (typeof input !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}

/**
 * Get the version of a UUID.
 * @param {string} input - The UUID string.
 * @returns {number|null} The version number (1-5), or null if invalid.
 */
function getVersion(input) {
  if (!isValid(input)) return null;
  return parseInt(input.charAt(14), 10);
}

/**
 * Generate a NIL UUID (all zeros).
 * @returns {string} The NIL UUID.
 */
function nil() {
  return '00000000-0000-0000-0000-000000000000';
}

/**
 * Check if a UUID is the NIL UUID.
 * @param {string} input - The UUID string.
 * @returns {boolean} True if it's the NIL UUID.
 */
function isNil(input) {
  return input === '00000000-0000-0000-0000-000000000000';
}

module.exports = { v4: v4, v4Short: v4Short, v4Batch: v4Batch, isValid: isValid, getVersion: getVersion, nil: nil, isNil: isNil };
