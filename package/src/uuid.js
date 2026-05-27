/**
 * toolmetryai — UUID Generator
 */

/**
 * Generate a v4 (random) UUID.
 * @returns {string} UUID string (lowercase, with dashes).
 */
function v4() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: manual v4 UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate a v4 UUID without dashes.
 * @returns {string} 32-character hex string.
 */
function v4Short() {
  return v4().replace(/-/g, '');
}

/**
 * Generate multiple v4 UUIDs at once.
 * @param {number} count - Number of UUIDs to generate.
 * @returns {string[]} Array of UUID strings.
 */
function v4Batch(count) {
  if (typeof count !== 'number' || count < 1) {
    throw new TypeError('Count must be a positive number');
  }
  if (count > 10000) {
    throw new RangeError('Maximum batch size is 10,000');
  }
  return Array.from({ length: count }, () => v4());
}

/**
 * Validate a UUID string.
 * @param {string} input - The string to validate.
 * @returns {boolean} True if valid UUID format.
 */
function isValid(input) {
  if (typeof input !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}

/**
 * Get the version of a UUID.
 * @param {string} input - The UUID string.
 * @returns {number|null} The version number (1-5), or null if invalid.
 */
function getVersion(input) {
  if (!isValid(input)) return null;
  return parseInt(input.charAt(14), 10);
}

/**
 * Generate a NIL UUID (all zeros).
 * @returns {string} The NIL UUID.
 */
function nil() {
  return '00000000-0000-0000-0000-000000000000';
}

/**
 * Check if a UUID is the NIL UUID.
 * @param {string} input - The UUID string.
 * @returns {boolean} True if it's the NIL UUID.
 */
function isNil(input) {
  return input === '00000000-0000-0000-0000-000000000000';
}

module.exports = { v4, v4Short, v4Batch, isValid, getVersion, nil, isNil };
