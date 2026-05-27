/**
 * toolmetryai — JSON Formatter & Validator
 */

/**
 * Format/prettify a JSON string.
 * @param {string} input - The JSON string to format.
 * @param {number} [indent=2] - Indentation spaces.
 * @returns {string} Formatted JSON string.
 */
function format(input, indent = 2) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

/**
 * Minify a JSON string (remove whitespace).
 * @param {string} input - The JSON string to minify.
 * @returns {string} Minified JSON string.
 */
function minify(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

/**
 * Validate if a string is valid JSON.
 * @param {string} input - The string to validate.
 * @returns {{ valid: boolean, error: string|null, position: { line: number, column: number }|null }}
 */
function validate(input) {
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string', position: null };
  }
  try {
    JSON.parse(input);
    return { valid: true, error: null, position: null };
  } catch (e) {
    const match = e.message.match(/position\s+(\d+)/i);
    let position = null;
    if (match) {
      const pos = parseInt(match[1], 10);
      const before = input.slice(0, pos);
      const line = (before.match(/\n/g) || []).length + 1;
      const column = pos - before.lastIndexOf('\n');
      position = { line, column };
    }
    return { valid: false, error: e.message, position };
  }
}

/**
 * Get the type of a JSON value.
 * @param {string} input - JSON string.
 * @returns {string} Type: 'object', 'array', 'string', 'number', 'boolean', 'null'.
 */
function getType(input) {
  const parsed = JSON.parse(input);
  if (parsed === null) return 'null';
  if (Array.isArray(parsed)) return 'array';
  return typeof parsed;
}

/**
 * Get statistics about a JSON structure.
 * @param {string} input - JSON string.
 * @returns {{ type: string, keys: number|null, depth: number, size: number }}
 */
function stats(input) {
  const parsed = JSON.parse(input);
  const type = parsed === null ? 'null' : Array.isArray(parsed) ? 'array' : typeof parsed;
  const keys = type === 'object' ? Object.keys(parsed).length : type === 'array' ? parsed.length : null;
  const depth = _getDepth(parsed);
  return { type, keys, depth, size: new Blob([input]).size };
}

/**
 * Convert JSON to a flat key-value object (dot notation).
 * @param {string} input - JSON string.
 * @returns {Record<string, any>} Flattened object.
 */
function flatten(input) {
  const parsed = JSON.parse(input);
  const result = {};
  _flattenRecursive(parsed, '', result);
  return result;
}

function _getDepth(obj) {
  if (typeof obj !== 'object' || obj === null) return 0;
  let maxDepth = 0;
  for (const val of Object.values(obj)) {
    maxDepth = Math.max(maxDepth, _getDepth(val));
  }
  return maxDepth + 1;
}

function _flattenRecursive(obj, prefix, result) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      _flattenRecursive(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
}

module.exports = { format, minify, validate, getType, stats, flatten };
