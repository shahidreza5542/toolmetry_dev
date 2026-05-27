/**
 * toolmetry — Random Generator
 * Generate random strings, numbers, hex, and more using cryptographically secure randomness.
 * @module random
 */

'use strict';

var LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
var UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS = '0123456789';
var ALPHANUMERIC = LOWERCASE + UPPERCASE + DIGITS;
var ALL_CHARS = LOWERCASE + UPPERCASE + DIGITS + '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Get a secure random index (0 to max-1).
 * @param {number} max - Upper bound (exclusive).
 * @returns {number} Secure random index.
 * @private
 */
function _randomIndex(max) {
  var nodeCrypto;
  if (typeof require === 'function') {
    try { nodeCrypto = require('crypto'); } catch (e) { nodeCrypto = null; }
  }
  if (nodeCrypto && nodeCrypto.randomInt) {
    return nodeCrypto.randomInt(0, max);
  }
  var array = new Uint32Array(1);
  var browserCrypto = (typeof globalThis !== 'undefined' && globalThis.crypto) ? globalThis.crypto : (typeof crypto !== 'undefined' ? crypto : null);
  if (browserCrypto && browserCrypto.getRandomValues) {
    browserCrypto.getRandomValues(array);
  } else if (nodeCrypto) {
    nodeCrypto.randomFillSync(array);
  } else {
    throw new Error('No secure random source available');
  }
  return array[0] % max;
}

/**
 * Generate a random string of specified length.
 * @param {number} [length=16] - Length of the string.
 * @param {object} [options] - Character options.
 * @param {boolean} [options.lowercase=true] - Include lowercase letters.
 * @param {boolean} [options.uppercase=true] - Include uppercase letters.
 * @param {boolean} [options.digits=true] - Include digits.
 * @param {boolean} [options.symbols=false] - Include symbols.
 * @returns {string} Random string.
 */
function string(length, options) {
  var len = length || 16;
  var opts = options || {};
  var lowercase = opts.lowercase !== undefined ? opts.lowercase : true;
  var uppercase = opts.uppercase !== undefined ? opts.uppercase : true;
  var digits = opts.digits !== undefined ? opts.digits : true;
  var symbols = opts.symbols || false;

  var chars = '';
  if (lowercase) chars += LOWERCASE;
  if (uppercase) chars += UPPERCASE;
  if (digits) chars += DIGITS;
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (chars.length === 0) throw new Error('At least one character set must be selected');

  var result = [];
  for (var i = 0; i < len; i++) {
    result.push(chars[_randomIndex(chars.length)]);
  }
  return result.join('');
}

/**
 * Generate a random integer between min and max (inclusive).
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number} Random integer.
 */
function int(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Min and max must be numbers');
  }
  if (min > max) throw new RangeError('Min must be less than or equal to max');
  var range = max - min + 1;
  return min + _randomIndex(range);
}

/**
 * Generate a random hex string.
 * @param {number} [length=32] - Length of the hex string.
 * @returns {string} Random hex string.
 */
function hex(length) {
  var len = length || 32;
  if (typeof len !== 'number' || len < 1) {
    throw new TypeError('Length must be a positive number');
  }
  var result = [];
  var hexChars = '0123456789abcdef';
  for (var i = 0; i < len; i++) {
    result.push(hexChars[_randomIndex(16)]);
  }
  return result.join('');
}

/**
 * Generate a random alphanumeric string.
 * @param {number} [length=16] - Length of the string.
 * @returns {string} Random alphanumeric string.
 */
function alphanumeric(length) {
  var len = length || 16;
  var result = [];
  for (var i = 0; i < len; i++) {
    result.push(ALPHANUMERIC[_randomIndex(ALPHANUMERIC.length)]);
  }
  return result.join('');
}

/**
 * Pick a random element from an array.
 * @param {Array} array - The array to pick from.
 * @returns {*} Random element.
 */
function pick(array) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new TypeError('Input must be a non-empty array');
  }
  return array[_randomIndex(array.length)];
}

/**
 * Shuffle an array (Fisher-Yates).
 * @param {Array} array - The array to shuffle.
 * @returns {Array} New shuffled array.
 */
function shuffle(array) {
  if (!Array.isArray(array)) throw new TypeError('Input must be an array');
  var result = array.slice();
  for (var i = result.length - 1; i > 0; i--) {
    var j = _randomIndex(i + 1);
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Generate a random boolean value.
 * @returns {boolean} Random true or false.
 */
function boolean() {
  return _randomIndex(2) === 1;
}

/**
 * Generate a random float between min and max.
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @param {number} [decimals=4] - Number of decimal places.
 * @returns {number} Random float.
 */
function float(min, max, decimals) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Min and max must be numbers');
  }
  var dec = decimals || 4;
  var val = min + Math.random() * (max - min);
  var factor = Math.pow(10, dec);
  return Math.round(val * factor) / factor;
}

module.exports = { string: string, int: int, hex: hex, alphanumeric: alphanumeric, pick: pick, shuffle: shuffle, boolean: boolean, float: float };
