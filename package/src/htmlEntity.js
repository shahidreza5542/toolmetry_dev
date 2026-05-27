/**
 * toolmetryai — HTML Entity Encoder/Decoder
 */

const ENCODE_MAP = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};
const DECODE_MAP = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&apos;': "'", '&nbsp;': '\u00A0', '&copy;': '\u00A9', '&reg;': '\u00AE',
  '&trade;': '\u2122', '&mdash;': '\u2014', '&ndash;': '\u2013',
  '&laquo;': '\u00AB', '&raquo;': '\u00BB', '&hellip;': '\u2026',
  '&bull;': '\u2022', '&deg;': '\u00B0', '&plusmn;': '\u00B1',
  '&para;': '\u00B6', '&sect;': '\u00A7', '&euro;': '\u20AC',
  '&pound;': '\u00A3', '&yen;': '\u00A5', '&cent;': '\u00A2',
  '&times;': '\u00D7', '&divide;': '\u00F7',
};

/**
 * Encode HTML special characters to entities.
 * @param {string} input - The string to encode.
 * @returns {string} Encoded string.
 */
function encode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return input.replace(/[&<>"']/g, ch => ENCODE_MAP[ch]);
}

/**
 * Decode HTML entities back to characters.
 * @param {string} input - The string with HTML entities.
 * @returns {string} Decoded string.
 */
function decode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  // Decode named entities
  let result = input.replace(/&[a-zA-Z]+;/g, entity => {
    return DECODE_MAP[entity] || entity;
  });
  // Decode numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_, code) => {
    return String.fromCharCode(parseInt(code, 10));
  });
  // Decode numeric entities (hex)
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => {
    return String.fromCharCode(parseInt(code, 16));
  });
  return result;
}

/**
 * Encode ALL non-ASCII characters as HTML entities.
 * @param {string} input - The string to encode.
 * @returns {string} String with all non-ASCII as numeric entities.
 */
function encodeAll(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return Array.from(input).map(ch => {
    const code = ch.charCodeAt(0);
    return code > 127 ? `&#${code};` : ch;
  }).join('');
}

/**
 * Encode only specific characters.
 * @param {string} input - The string to encode.
 * @param {string[]} chars - Array of characters to encode.
 * @returns {string} Partially encoded string.
 */
function encodeChars(input, chars) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  if (!Array.isArray(chars)) {
    throw new TypeError('chars must be an array');
  }
  const charSet = new Set(chars);
  return Array.from(input).map(ch => {
    if (charSet.has(ch) && ENCODE_MAP[ch]) {
      return ENCODE_MAP[ch];
    }
    return ch;
  }).join('');
}

module.exports = { encode, decode, encodeAll, encodeChars, ENCODE_MAP, DECODE_MAP };
