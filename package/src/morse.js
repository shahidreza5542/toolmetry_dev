/**
 * toolmetryai — Morse Code Encoder/Decoder
 * Convert between text and Morse code.
 */

const MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', "'": '.----.',
};

const REVERSE_MORSE = {};
for (const [key, value] of Object.entries(MORSE_MAP)) {
  REVERSE_MORSE[value] = key;
}

/**
 * Encode text to Morse code.
 * @param {string} input - The text to encode.
 * @returns {string} Morse code string (letters separated by space, words by ' / ').
 */
function encode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  if (!input.trim()) return '';

  return input
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char === ' ') return '/';
      return MORSE_MAP[char] || '';
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * Decode Morse code to text.
 * @param {string} input - The Morse code string.
 * @returns {string} Decoded text.
 */
function decode(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  if (!input.trim()) return '';

  return input
    .trim()
    .split(/\s*\/\s*/) // Split by word separator
    .map((word) =>
      word
        .trim()
        .split(/\s+/) // Split by letter separator
        .map((code) => REVERSE_MORSE[code] || '')
        .join('')
    )
    .join(' ');
}

/**
 * Check if a string is valid Morse code.
 * @param {string} input - The string to check.
 * @returns {boolean} True if valid Morse code.
 */
function isValid(input) {
  if (typeof input !== 'string') return false;
  return /^[\s./-]+$/.test(input);
}

module.exports = { encode, decode, isValid, MORSE_MAP };
