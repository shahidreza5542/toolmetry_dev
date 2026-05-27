/**
 * toolmetry — Roman Numeral Converter
 * Convert between Arabic numbers and Roman numerals.
 * @module roman
 */

'use strict';

var ROMAN_MAP = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

function toRoman(num) {
  if (typeof num !== 'number' || num < 1 || num > 3999) {
    throw new TypeError('Input must be a number between 1 and 3999');
  }
  if (!Number.isInteger(num)) throw new TypeError('Input must be an integer');
  var result = '';
  for (var i = 0; i < ROMAN_MAP.length; i++) {
    var value = ROMAN_MAP[i][0];
    var symbol = ROMAN_MAP[i][1];
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

function fromRoman(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  var romanValues = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
  var result = 0;
  var upper = str.toUpperCase();
  for (var i = 0; i < upper.length; i++) {
    var current = romanValues[upper[i]];
    if (!current) throw new Error('Invalid Roman numeral character: ' + upper[i]);
    var next = romanValues[upper[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

function isValidRoman(str) {
  if (typeof str !== 'string') return false;
  return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str.toUpperCase());
}

module.exports = { toRoman: toRoman, fromRoman: fromRoman, isValidRoman: isValidRoman };
