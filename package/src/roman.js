/**
 * toolmetryai — Roman Numeral Converter
 * Convert between Arabic numbers and Roman numerals.
 */

const ROMAN_VALUES = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' },
];

/**
 * Convert an Arabic number to a Roman numeral.
 * @param {number} num - The number to convert (1-3999).
 * @returns {string} Roman numeral string.
 */
function toRoman(num) {
  if (typeof num !== 'number' || !Number.isInteger(num)) {
    throw new TypeError('Input must be an integer');
  }
  if (num < 1 || num > 3999) {
    throw new RangeError('Number must be between 1 and 3999');
  }

  let result = '';
  let remaining = num;

  for (const { value, symbol } of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

/**
 * Convert a Roman numeral to an Arabic number.
 * @param {string} str - The Roman numeral string.
 * @returns {number} The Arabic number.
 */
function fromRoman(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  const upper = str.toUpperCase().trim();
  if (!/^[MDCLXVI]+$/.test(upper)) {
    throw new TypeError('Invalid Roman numeral');
  }

  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;

  for (let i = 0; i < upper.length; i++) {
    const current = map[upper[i]];
    const next = map[upper[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  // Verify by converting back
  if (toRoman(result) !== upper) {
    throw new TypeError('Invalid Roman numeral');
  }

  return result;
}

/**
 * Check if a string is a valid Roman numeral.
 * @param {string} str - The string to check.
 * @returns {boolean} True if valid.
 */
function isValidRoman(str) {
  try {
    fromRoman(str);
    return true;
  } catch {
    return false;
  }
}

module.exports = { toRoman, fromRoman, isValidRoman };
