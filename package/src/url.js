/**
 * toolmetryai — URL Encode / Decode
 */

/**
 * Encode a string for use in URL query parameters.
 * @param {string} input - The string to encode.
 * @returns {string} URL-encoded string.
 */
function encode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return encodeURIComponent(input);
}

/**
 * Decode a URL-encoded string.
 * @param {string} input - The URL-encoded string.
 * @returns {string} Decoded string.
 */
function decode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return decodeURIComponent(input);
}

/**
 * Encode all characters (including unreserved ones like A-Z, 0-9).
 * Useful for maximum encoding.
 * @param {string} input - The string to fully encode.
 * @returns {string} Fully encoded string.
 */
function encodeAll(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return Array.from(input)
    .map(ch => '%' + ch.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
    .join('');
}

/**
 * Build a query string from an object.
 * @param {Record<string, string|number|boolean>} params - Key-value pairs.
 * @returns {string} URL query string (with leading ? if non-empty).
 */
function buildQuery(params) {
  if (!params || typeof params !== 'object') {
    throw new TypeError('Input must be an object');
  }
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return entries.length > 0 ? '?' + entries.join('&') : '';
}

/**
 * Parse a query string into an object.
 * @param {string} qs - The query string (with or without leading ?).
 * @returns {Record<string, string>} Parsed key-value pairs.
 */
function parseQuery(qs) {
  if (typeof qs !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const str = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!str) return {};
  const params = {};
  str.split('&').forEach(pair => {
    const [key, ...rest] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(rest.join('='));
    }
  });
  return params;
}

module.exports = { encode, decode, encodeAll, buildQuery, parseQuery };
