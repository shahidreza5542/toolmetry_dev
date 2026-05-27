/**
 * toolmetry — Morse Code Encoder / Decoder
 * @module morse
 */

'use strict';

var MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
};

var REVERSE_MORSE = {};
Object.keys(MORSE_MAP).forEach(function(key) {
  REVERSE_MORSE[MORSE_MAP[key]] = key;
});

function encode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.toUpperCase().split('').map(function(ch) {
    if (ch === ' ') return '/';
    return MORSE_MAP[ch] || ch;
  }).join(' ');
}

function decode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.split(' ').map(function(code) {
    if (code === '/') return ' ';
    return REVERSE_MORSE[code] || code;
  }).join('');
}

function isValid(input) {
  if (typeof input !== 'string') return false;
  var codes = input.split(' ');
  return codes.every(function(code) {
    return code === '/' || /^[.\-/]+$/.test(code);
  });
}

module.exports = { encode: encode, decode: decode, isValid: isValid, MORSE_MAP: MORSE_MAP };
