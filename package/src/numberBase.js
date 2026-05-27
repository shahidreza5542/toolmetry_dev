/**
 * toolmetry — Number Base Converter
 * Convert between binary, octal, decimal, hexadecimal, and any base 2-36.
 * @module numberBase
 */

'use strict';

function convert(value, fromBase, toBase) {
  if (typeof value !== 'string' && typeof value !== 'number') throw new TypeError('Value must be a string or number');
  var decimal = parseInt(String(value), fromBase);
  if (isNaN(decimal)) throw new Error('Invalid value for base ' + fromBase);
  return decimal.toString(toBase);
}

function toBinary(value) { return convert(value, 10, 2); }
function toOctal(value) { return convert(value, 10, 8); }
function toHex(value) { return convert(value, 10, 16); }
function fromBinary(binary) { return parseInt(String(binary), 2); }
function fromHex(hex) { return parseInt(String(hex), 16); }

function convertAll(value) {
  var str = String(value);
  var decimal = parseInt(str, 10);
  if (isNaN(decimal)) throw new Error('Invalid decimal value');
  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: str,
    hexadecimal: decimal.toString(16),
    base32: decimal.toString(32),
    base36: decimal.toString(36),
  };
}

module.exports = { convert: convert, toBinary: toBinary, toOctal: toOctal, toHex: toHex, fromBinary: fromBinary, fromHex: fromHex, convertAll: convertAll };
