/**
 * toolmetry — JSON Utilities
 * Format, minify, validate, and analyze JSON data.
 * @module json
 */

'use strict';

function format(input, indent) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  var ind = indent !== undefined ? indent : 2;
  try {
    return JSON.stringify(JSON.parse(input), null, ind);
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
}

function minify(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  try {
    return JSON.stringify(JSON.parse(input));
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
}

function validate(input) {
  if (typeof input !== 'string') return { valid: false, error: 'Input must be a string', position: null };
  try {
    JSON.parse(input);
    return { valid: true, error: null, position: null };
  } catch (e) {
    var match = e.message.match(/position\s+(\d+)/i);
    var position = null;
    if (match) {
      var pos = parseInt(match[1], 10);
      var lines = input.slice(0, pos).split('\n');
      position = { line: lines.length, column: lines[lines.length - 1].length + 1 };
    }
    return { valid: false, error: e.message, position: position };
  }
}

function getType(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  try {
    var parsed = JSON.parse(input);
    if (parsed === null) return 'null';
    if (Array.isArray(parsed)) return 'array';
    return typeof parsed;
  } catch (e) {
    return 'invalid';
  }
}

function stats(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  try {
    var parsed = JSON.parse(input);
    var type = Array.isArray(parsed) ? 'array' : (parsed === null ? 'null' : typeof parsed);
    var depth = _getDepth(parsed);
    var keys = type === 'object' ? Object.keys(parsed).length : (type === 'array' ? parsed.length : null);
    var size = typeof Blob !== 'undefined' ? new Blob([input]).size : Buffer.byteLength(input, 'utf8');
    return { type: type, keys: keys, depth: depth, size: size };
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
}

function flatten(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  try {
    var parsed = JSON.parse(input);
    var result = {};
    _flattenRecursive(parsed, '', result);
    return result;
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
}

function _getDepth(obj) {
  if (typeof obj !== 'object' || obj === null) return 0;
  var maxDepth = 0;
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var d = _getDepth(obj[keys[i]]);
    if (d > maxDepth) maxDepth = d;
  }
  return maxDepth + 1;
}

function _flattenRecursive(obj, prefix, result) {
  if (typeof obj !== 'object' || obj === null) {
    result[prefix] = obj;
    return;
  }
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var newKey = prefix ? prefix + '.' + key : key;
    _flattenRecursive(obj[key], newKey, result);
  }
}

module.exports = { format: format, minify: minify, validate: validate, getType: getType, stats: stats, flatten: flatten };
