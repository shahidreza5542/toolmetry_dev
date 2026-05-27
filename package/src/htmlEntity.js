/**
 * toolmetry — HTML Entity Encoder / Decoder
 * @module htmlEntity
 */

'use strict';

var ENCODE_MAP = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};
var DECODE_MAP = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'",
};

function encode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/[&<>"']/g, function(ch) { return ENCODE_MAP[ch]; });
}

function decode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, function(entity) { return DECODE_MAP[entity] || entity; });
}

function encodeAll(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/[\u00A0-\u9999<>&]/gim, function(ch) {
    return '&#' + ch.charCodeAt(0) + ';';
  });
}

function encodeChars(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return ENCODE_MAP;
}

module.exports = { encode: encode, decode: decode, encodeAll: encodeAll, encodeChars: encodeChars };
