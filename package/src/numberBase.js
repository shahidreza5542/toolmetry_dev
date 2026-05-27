/**
 * toolmetryai — Number Base Converter
 * Convert between binary, octal, decimal, hexadecimal, and custom bases (2-36).
 */

/**
 * Convert a number from one base to another.
 * @param {string} value - The number string in the source base.
 * @param {number} fromBase - Source base (2-36).
 * @param {number} toBase - Target base (2-36).
 * @returns {string} The number in the target base.
 */
function convert(value, fromBase, toBase) {
  if (typeof value !== 'string') {
    throw new TypeError('Value must be a string');
  }
  fromBase = _validateBase(fromBase);
  toBase = _validateBase(toBase);
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) {
    throw new Error(`Invalid number "${value}" for base ${fromBase}`);
  }
  return decimal.toString(toBase).toUpperCase();
}

/**
 * Convert decimal to binary.
 * @param {number|string} value - The decimal number.
 * @returns {string} Binary string.
 */
function toBinary(value) {
  return convert(String(value), 10, 2);
}

/**
 * Convert decimal to octal.
 * @param {number|string} value - The decimal number.
 * @returns {string} Octal string.
 */
function toOctal(value) {
  return convert(String(value), 10, 8);
}

/**
 * Convert decimal to hexadecimal.
 * @param {number|string} value - The decimal number.
 * @returns {string} Hexadecimal string.
 */
function toHex(value) {
  return convert(String(value), 10, 16);
}

/**
 * Convert binary to decimal.
 * @param {string} value - The binary string.
 * @returns {string} Decimal string.
 */
function fromBinary(value) {
  return convert(value, 2, 10);
}

/**
 * Convert hexadecimal to decimal.
 * @param {string} value - The hex string.
 * @returns {string} Decimal string.
 */
function fromHex(value) {
  return convert(value, 16, 10);
}

/**
 * Convert a number to all common bases at once.
 * @param {string|number} value - The number.
 * @param {number} [fromBase=10] - Source base.
 * @returns {{ decimal: string, binary: string, octal: string, hex: string }} All base representations.
 */
function convertAll(value, fromBase = 10) {
  return {
    decimal: convert(String(value), fromBase, 10),
    binary: convert(String(value), fromBase, 2),
    octal: convert(String(value), fromBase, 8),
    hex: convert(String(value), fromBase, 16),
  };
}

function _validateBase(base) {
  const b = Number(base);
  if (!Number.isInteger(b) || b < 2 || b > 36) {
    throw new RangeError('Base must be an integer between 2 and 36');
  }
  return b;
}

module.exports = { convert, toBinary, toOctal, toHex, fromBinary, fromHex, convertAll };
