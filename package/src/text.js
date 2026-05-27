/**
 * toolmetryai — Text Utility Tools
 * Case conversion, slug generation, word/char counting, and more.
 */

/**
 * Convert string to camelCase.
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
  return input
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^[A-Z]/, c => c.toLowerCase());
}

/**
 * Convert string to PascalCase.
 * @param {string} input
 * @returns {string}
 */
function toPascalCase(input) {
  return input
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^[a-z]/, c => c.toUpperCase());
}

/**
 * Convert string to snake_case.
 * @param {string} input
 * @returns {string}
 */
function toSnakeCase(input) {
  return input
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
}

/**
 * Convert string to kebab-case.
 * @param {string} input
 * @returns {string}
 */
function toKebabCase(input) {
  return input
    .replace(/([A-Z])/g, '-$1')
    .replace(/[_\s]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

/**
 * Convert string to CONSTANT_CASE.
 * @param {string} input
 * @returns {string}
 */
function toConstantCase(input) {
  return toSnakeCase(input).toUpperCase();
}

/**
 * Generate a URL-safe slug from a string.
 * @param {string} input
 * @returns {string}
 */
function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Count words in a string.
 * @param {string} input
 * @returns {number}
 */
function wordCount(input) {
  if (!input || !input.trim()) return 0;
  return input.trim().split(/\s+/).length;
}

/**
 * Count characters in a string (with/without spaces).
 * @param {string} input
 * @param {boolean} [includeSpaces=true]
 * @returns {number}
 */
function charCount(input, includeSpaces = true) {
  if (!input) return 0;
  return includeSpaces ? input.length : input.replace(/\s/g, '').length;
}

/**
 * Reverse a string.
 * @param {string} input
 * @returns {string}
 */
function reverse(input) {
  return [...input].reverse().join('');
}

/**
 * Truncate a string to a maximum length, adding ellipsis.
 * @param {string} input
 * @param {number} maxLength
 * @param {string} [suffix='...']
 * @returns {string}
 */
function truncate(input, maxLength, suffix = '...') {
  if (!input || input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove extra whitespace from a string.
 * @param {string} input
 * @returns {string}
 */
function removeExtraWhitespace(input) {
  return input.replace(/\s+/g, ' ').trim();
}

/**
 * Remove all line breaks from a string.
 * @param {string} input
 * @returns {string}
 */
function removeLineBreaks(input) {
  return input.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * Escape a string for use in a regular expression.
 * @param {string} input
 * @returns {string}
 */
function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  toCamelCase, toPascalCase, toSnakeCase, toKebabCase, toConstantCase,
  slugify, wordCount, charCount, reverse, truncate,
  removeExtraWhitespace, removeLineBreaks, escapeRegex,
};
