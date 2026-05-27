/**
 * toolmetry — JWT Decoder
 * Decode and inspect JSON Web Tokens without verification.
 * @module jwt
 */

'use strict';

/**
 * Decode a JWT token and return its header, payload, and signature.
 * Does NOT verify the token — only decodes it.
 * @param {string} token - The JWT token string.
 * @returns {{ header: object, payload: object, signature: string }} Decoded JWT parts.
 */
function decode(token) {
  if (typeof token !== 'string') {
    throw new TypeError('Token must be a string');
  }
  var parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: must have 3 parts separated by dots');
  }
  var headerB64 = parts[0];
  var payloadB64 = parts[1];
  var signature = parts[2];
  var header = _decodeBase64JSON(headerB64);
  var payload = _decodeBase64JSON(payloadB64);
  return { header: header, payload: payload, signature: signature };
}

/**
 * Decode only the header of a JWT.
 * @param {string} token - The JWT token string.
 * @returns {object} Decoded header.
 */
function decodeHeader(token) {
  if (typeof token !== 'string') {
    throw new TypeError('Token must be a string');
  }
  var parts = token.split('.');
  if (parts.length < 1) {
    throw new Error('Invalid JWT format');
  }
  return _decodeBase64JSON(parts[0]);
}

/**
 * Decode only the payload of a JWT.
 * @param {string} token - The JWT token string.
 * @returns {object} Decoded payload.
 */
function decodePayload(token) {
  if (typeof token !== 'string') {
    throw new TypeError('Token must be a string');
  }
  var parts = token.split('.');
  if (parts.length < 2) {
    throw new Error('Invalid JWT format');
  }
  return _decodeBase64JSON(parts[1]);
}

/**
 * Check if a JWT is expired.
 * @param {string} token - The JWT token string.
 * @param {number} [graceSeconds=0] - Grace period in seconds.
 * @returns {boolean} True if the token is expired.
 */
function isExpired(token, graceSeconds) {
  var grace = graceSeconds || 0;
  var result = decode(token);
  if (!result.payload.exp) return false;
  return Date.now() / 1000 > result.payload.exp + grace;
}

/**
 * Check if a string looks like a valid JWT format.
 * @param {string} token - The string to check.
 * @returns {boolean} True if the format matches JWT pattern.
 */
function isValidFormat(token) {
  if (typeof token !== 'string') return false;
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(token);
}

/**
 * Get the algorithm used in the JWT header.
 * @param {string} token - The JWT token string.
 * @returns {string|null} The algorithm name (e.g., 'HS256', 'RS256').
 */
function getAlgorithm(token) {
  try {
    var header = decodeHeader(token);
    return header.alg || null;
  } catch (e) {
    return null;
  }
}

/**
 * Get the time remaining before the JWT expires (in seconds).
 * @param {string} token - The JWT token string.
 * @returns {number|null} Seconds until expiry, or null if no exp claim.
 */
function timeUntilExpiry(token) {
  var result = decode(token);
  if (!result.payload.exp) return null;
  return Math.max(0, result.payload.exp - Date.now() / 1000);
}

/**
 * Decode Base64URL JSON.
 * @param {string} b64url - Base64URL encoded string.
 * @returns {object} Parsed JSON object.
 * @private
 */
function _decodeBase64JSON(b64url) {
  var b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) {
    b64 += '=';
  }
  var json;
  if (typeof Buffer !== 'undefined') {
    json = Buffer.from(b64, 'base64').toString('utf8');
  } else {
    json = decodeURIComponent(escape(atob(b64)));
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error('Failed to parse JWT part as JSON');
  }
}

module.exports = { decode: decode, decodeHeader: decodeHeader, decodePayload: decodePayload, isExpired: isExpired, isValidFormat: isValidFormat, getAlgorithm: getAlgorithm, timeUntilExpiry: timeUntilExpiry };
