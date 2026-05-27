/**
 * toolmetry — Random Generator
 * Generate random strings, numbers, hex, and more.
 */

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const ALPHANUMERIC = LOWERCASE + UPPERCASE + DIGITS;
const ALL_CHARS = LOWERCASE + UPPERCASE + DIGITS + '!@#$%^&*()_+-=[]{}|;:,.<>?';

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
function string(length = 16, options = {}) {
  const {
    lowercase = true,
    uppercase = true,
    digits = true,
    symbols = false,
  } = options;

  let chars = '';
  if (lowercase) chars += LOWERCASE;
  if (uppercase) chars += UPPERCASE;
  if (digits) chars += DIGITS;
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (chars.length === 0) throw new Error('At least one character set must be selected');

  const result = [];
  for (let i = 0; i < length; i++) {
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
  const range = max - min + 1;
  return min + _randomIndex(range);
}

/**
 * Generate a random hex string.
 * @param {number} [length=32] - Length of the hex string.
 * @returns {string} Random hex string.
 */
function hex(length = 32) {
  if (typeof length !== 'number' || length < 1) {
    throw new TypeError('Length must be a positive number');
  }
  const result = [];
  const hexChars = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    result.push(hexChars[_randomIndex(16)]);
  }
  return result.join('');
}

/**
 * Generate a random alphanumeric string.
 * @param {number} [length=16] - Length of the string.
 * @returns {string} Random alphanumeric string.
 */
function alphanumeric(length = 16) {
  const result = [];
  for (let i = 0; i < length; i++) {
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
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = _randomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
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
function float(min, max, decimals = 4) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Min and max must be numbers');
  }
  const val = min + Math.random() * (max - min);
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

function _randomIndex(max) {
  if (typeof crypto !== 'undefined' && crypto.randomInt) {
    return crypto.randomInt(0, max);
  }
  const array = new Uint32Array(1);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    const nodeCrypto = require('crypto');
    nodeCrypto.randomFillSync(array);
  }
  return array[0] % max;
}

module.exports = { string, int, hex, alphanumeric, pick, shuffle, boolean, float };
