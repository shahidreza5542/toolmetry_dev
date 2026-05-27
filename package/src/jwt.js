/**
 * toolmetryai — JWT Decoder
 * Decode and inspect JSON Web Tokens without verification.
 */

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

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: must have 3 parts separated by dots');
  }

  const [headerB64, payloadB64, signature] = parts;

  const header = _decodeBase64JSON(headerB64);
  const payload = _decodeBase64JSON(payloadB64);

  return { header, payload, signature };
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
  const parts = token.split('.');
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
  const parts = token.split('.');
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
function isExpired(token, graceSeconds = 0) {
  const { payload } = decode(token);
  if (!payload.exp) return false;
  return Date.now() / 1000 > payload.exp + graceSeconds;
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
 * @returns {string} The algorithm name (e.g., 'HS256', 'RS256').
 */
function getAlgorithm(token) {
  const header = decodeHeader(token);
  return header.alg || 'unknown';
}

/**
 * Get the time remaining before the JWT expires (in seconds).
 * @param {string} token - The JWT token string.
 * @returns {number|null} Seconds until expiry, or null if no exp claim.
 */
function timeUntilExpiry(token) {
  const { payload } = decode(token);
  if (!payload.exp) return null;
  return Math.max(0, payload.exp - Date.now() / 1000);
}

function _decodeBase64JSON(b64url) {
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) {
    b64 += '=';
  }
  let json;
  if (typeof Buffer !== 'undefined') {
    json = Buffer.from(b64, 'base64').toString('utf8');
  } else {
    json = decodeURIComponent(escape(atob(b64)));
  }
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('Failed to parse JWT part as JSON');
  }
}

module.exports = { decode, decodeHeader, decodePayload, isExpired, isValidFormat, getAlgorithm, timeUntilExpiry };
