/**
 * toolmetry — URL Encode / Decode
 * @module url
 */

'use strict';

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
 * @param {string} input - The string to fully encode.
 * @returns {string} Fully encoded string.
 */
function encodeAll(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return Array.from(input)
    .map(function(ch) { return '%' + ch.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase(); })
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
  var entries = Object.entries(params)
    .filter(function(entry) { return entry[1] !== undefined && entry[1] !== null; })
    .map(function(entry) { return encodeURIComponent(entry[0]) + '=' + encodeURIComponent(String(entry[1])); });
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
  var str = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!str) return {};
  var params = {};
  str.split('&').forEach(function(pair) {
    var parts = pair.split('=');
    var key = parts[0];
    var rest = parts.slice(1).join('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(rest);
    }
  });
  return params;
}

module.exports = { encode: encode, decode: decode, encodeAll: encodeAll, buildQuery: buildQuery, parseQuery: parseQuery };
