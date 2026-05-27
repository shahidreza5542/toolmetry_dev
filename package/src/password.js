/**
 * toolmetry — Password Generator
 * Generate secure random passwords with customizable options.
 * @module password
 */

'use strict';

var LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
var UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS = '0123456789';
var SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

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

function generate(options) {
  var opts = options || {};
  var length = opts.length || 16;
  var lowercase = opts.lowercase !== undefined ? opts.lowercase : true;
  var uppercase = opts.uppercase !== undefined ? opts.uppercase : true;
  var digits = opts.digits !== undefined ? opts.digits : true;
  var symbols = opts.symbols !== undefined ? opts.symbols : true;
  var excludeAmbiguous = opts.excludeAmbiguous || false;

  if (length < 1) throw new RangeError('Password length must be at least 1');
  if (length > 1024) throw new RangeError('Password length must be at most 1024');

  var chars = '';
  var required = [];

  if (lowercase) {
    var set = LOWERCASE;
    if (excludeAmbiguous) set = set.replace(/[ol]/g, '');
    chars += set;
    required.push(set);
  }
  if (uppercase) {
    var set2 = UPPERCASE;
    if (excludeAmbiguous) set2 = set2.replace(/[OI]/g, '');
    chars += set2;
    required.push(set2);
  }
  if (digits) {
    var set3 = DIGITS;
    if (excludeAmbiguous) set3 = set3.replace(/[01]/g, '');
    chars += set3;
    required.push(set3);
  }
  if (symbols) {
    chars += SYMBOLS;
    required.push(SYMBOLS);
  }

  if (chars.length === 0) throw new Error('At least one character set must be selected');

  var result = [];
  for (var i = 0; i < required.length; i++) {
    result.push(required[i][_randomIndex(required[i].length)]);
  }
  for (var j = result.length; j < length; j++) {
    result.push(chars[_randomIndex(chars.length)]);
  }
  for (var k = result.length - 1; k > 0; k--) {
    var l = _randomIndex(k + 1);
    var temp = result[k];
    result[k] = result[l];
    result[l] = temp;
  }

  return result.join('');
}

function passphrase(options) {
  var opts = options || {};
  var words = opts.words || 4;
  var separator = opts.separator || '-';
  var capitalize = opts.capitalize || false;
  var wordList = [
    'apple', 'brave', 'cloud', 'dance', 'eagle', 'flame', 'grace', 'heart',
    'ivory', 'joker', 'karma', 'lemon', 'magic', 'noble', 'ocean', 'pearl',
    'quest', 'raven', 'storm', 'tiger', 'ultra', 'vivid', 'whale', 'xenon',
    'yacht', 'zebra', 'alpha', 'blaze', 'coral', 'drift', 'ember', 'frost',
    'globe', 'haven', 'index', 'jewel', 'kneel', 'lunar', 'maple', 'nexus',
    'orbit', 'pixel', 'quilt', 'roost', 'solar', 'trail', 'unity', 'valor',
    'wrist', 'youth', 'zonal', 'amber', 'bloom', 'crisp', 'delta', 'exert',
    'flock', 'grain', 'haste', 'inner', 'jolly', 'knack', 'latch', 'merit',
    'nerve', 'onset', 'plumb', 'quiet', 'reign', 'spawn', 'thumb', 'usher',
    'verse', 'wheat', 'xerox', 'yield', 'zilch', 'apex', 'bond', 'clip',
    'dome', 'echo', 'flux', 'grid', 'helm', 'iris', 'jade', 'kite',
    'loop', 'mist', 'neon', 'opal', 'prism', 'ridge', 'surf', 'tent',
    'urge', 'vale', 'wave', 'axon', 'yoga', 'zero',
  ];

  var result = [];
  for (var i = 0; i < words; i++) {
    var word = wordList[_randomIndex(wordList.length)];
    result.push(capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word);
  }
  return result.join(separator);
}

function strength(password) {
  if (typeof password !== 'string') throw new TypeError('Input must be a string');

  var score = 0;
  var suggestions = [];

  if (password.length >= 8) score += 1;
  else suggestions.push('Use at least 8 characters');
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  else suggestions.push('Add lowercase letters');
  if (/[A-Z]/.test(password)) score += 1;
  else suggestions.push('Add uppercase letters');
  if (/[0-9]/.test(password)) score += 1;
  else suggestions.push('Add numbers');
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else suggestions.push('Add special characters');
  if (/^[a-zA-Z]+$/.test(password)) { score -= 1; suggestions.push('Mix letters with numbers and symbols'); }
  if (/^[0-9]+$/.test(password)) { score -= 1; suggestions.push('Add letters and symbols'); }
  if (/(.)\1{2,}/.test(password)) { score -= 1; suggestions.push('Avoid repeating characters'); }
  if (/^(123|abc|qwerty|password)/i.test(password)) { score -= 2; suggestions.push('Avoid common patterns'); }

  score = Math.max(0, Math.min(7, score));
  var labels = ['Very Weak', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent'];
  return { score: score, label: labels[score], suggestions: suggestions };
}

function generateBatch(count, options) {
  if (typeof count !== 'number' || count < 1) throw new TypeError('Count must be a positive number');
  if (count > 100) throw new RangeError('Maximum batch size is 100');
  return Array.from({ length: count }, function() { return generate(options); });
}

module.exports = { generate: generate, passphrase: passphrase, strength: strength, generateBatch: generateBatch };
