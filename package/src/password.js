/**
 * toolmetryai — Password Generator
 * Generate secure random passwords with customizable options.
 */

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generate a random password.
 * @param {object} [options] - Password options.
 * @param {number} [options.length=16] - Password length.
 * @param {boolean} [options.lowercase=true] - Include lowercase letters.
 * @param {boolean} [options.uppercase=true] - Include uppercase letters.
 * @param {boolean} [options.digits=true] - Include digits.
 * @param {boolean} [options.symbols=true] - Include symbols.
 * @param {boolean} [options.excludeAmbiguous=false] - Exclude ambiguous chars (0Oo1lI).
 * @returns {string} Generated password.
 */
function generate(options = {}) {
  const {
    length = 16,
    lowercase = true,
    uppercase = true,
    digits = true,
    symbols = true,
    excludeAmbiguous = false,
  } = options;

  if (length < 1) throw new RangeError('Password length must be at least 1');
  if (length > 1024) throw new RangeError('Password length must be at most 1024');

  let chars = '';
  const required = [];

  if (lowercase) {
    let set = LOWERCASE;
    if (excludeAmbiguous) set = set.replace(/[ol]/g, '');
    chars += set;
    required.push(set);
  }
  if (uppercase) {
    let set = UPPERCASE;
    if (excludeAmbiguous) set = set.replace(/[OI]/g, '');
    chars += set;
    required.push(set);
  }
  if (digits) {
    let set = DIGITS;
    if (excludeAmbiguous) set = set.replace(/[01]/g, '');
    chars += set;
    required.push(set);
  }
  if (symbols) {
    chars += SYMBOLS;
    required.push(SYMBOLS);
  }

  if (chars.length === 0) throw new Error('At least one character set must be selected');

  const result = [];
  // Ensure at least one char from each required set
  for (const set of required) {
    result.push(set[_randomIndex(set.length)]);
  }
  // Fill remaining length with random chars from combined set
  for (let i = result.length; i < length; i++) {
    result.push(chars[_randomIndex(chars.length)]);
  }
  // Shuffle the result
  for (let i = result.length - 1; i > 0; i--) {
    const j = _randomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

/**
 * Generate a passphrase (multiple random words separated by dashes).
 * @param {object} [options] - Passphrase options.
 * @param {number} [options.words=4] - Number of words.
 * @param {string} [options.separator='-'] - Word separator.
 * @param {boolean} [options.capitalize=false] - Capitalize first letter of each word.
 * @returns {string} Generated passphrase.
 */
function passphrase(options = {}) {
  const { words = 4, separator = '-', capitalize = false } = options;
  // Built-in word list (Efficient short list)
  const wordList = [
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

  const result = [];
  for (let i = 0; i < words; i++) {
    const word = wordList[_randomIndex(wordList.length)];
    result.push(capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word);
  }
  return result.join(separator);
}

/**
 * Check password strength.
 * @param {string} password - The password to check.
 * @returns {{ score: number, label: string, suggestions: string[] }} Strength info.
 */
function strength(password) {
  if (typeof password !== 'string') throw new TypeError('Input must be a string');

  let score = 0;
  const suggestions = [];

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

  // Penalize common patterns
  if (/^[a-zA-Z]+$/.test(password)) { score -= 1; suggestions.push('Mix letters with numbers and symbols'); }
  if (/^[0-9]+$/.test(password)) { score -= 1; suggestions.push('Add letters and symbols'); }
  if (/(.)\1{2,}/.test(password)) { score -= 1; suggestions.push('Avoid repeating characters'); }
  if (/^(123|abc|qwerty|password)/i.test(password)) { score -= 2; suggestions.push('Avoid common patterns'); }

  score = Math.max(0, Math.min(7, score));

  const labels = ['Very Weak', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent'];

  return { score, label: labels[score], suggestions };
}

/**
 * Generate multiple passwords at once.
 * @param {number} count - Number of passwords to generate.
 * @param {object} [options] - Same options as generate().
 * @returns {string[]} Array of generated passwords.
 */
function generateBatch(count, options = {}) {
  if (typeof count !== 'number' || count < 1) throw new TypeError('Count must be a positive number');
  if (count > 100) throw new RangeError('Maximum batch size is 100');
  return Array.from({ length: count }, () => generate(options));
}

function _randomIndex(max) {
  if (typeof crypto !== 'undefined' && crypto.randomInt) {
    return crypto.randomInt(0, max);
  }
  // Browser fallback
  const array = new Uint32Array(1);
  (typeof crypto !== 'undefined' ? crypto : require('crypto')).getRandomValues(array);
  return array[0] % max;
}

module.exports = { generate, passphrase, strength, generateBatch };
