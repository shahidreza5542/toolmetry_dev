/**
 * toolmetry — Text Utilities
 * Case conversion, slugify, counting, and more.
 * @module text
 */

'use strict';

function toCamelCase(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/[\s_-]+/g, '');
}

function toPascalCase(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word) {
    return word.toUpperCase();
  }).replace(/[\s_-]+/g, '');
}

function toSnakeCase(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function toKebabCase(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toConstantCase(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return toSnakeCase(input).toUpperCase();
}

function slugify(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function wordCount(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  var trimmed = input.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function charCount(input, includeSpaces) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  if (includeSpaces) return input.length;
  return input.replace(/\s/g, '').length;
}

function reverse(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.split('').reverse().join('');
}

function truncate(input, maxLength, suffix) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  var max = maxLength || 50;
  var suf = suffix || '...';
  if (input.length <= max) return input;
  return input.slice(0, max - suf.length) + suf;
}

function removeExtraWhitespace(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/\s+/g, ' ').trim();
}

function removeLineBreaks(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/[\r\n]+/g, ' ').trim();
}

function escapeRegex(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  toCamelCase: toCamelCase, toPascalCase: toPascalCase, toSnakeCase: toSnakeCase,
  toKebabCase: toKebabCase, toConstantCase: toConstantCase, slugify: slugify,
  wordCount: wordCount, charCount: charCount, reverse: reverse, truncate: truncate,
  removeExtraWhitespace: removeExtraWhitespace, removeLineBreaks: removeLineBreaks,
  escapeRegex: escapeRegex,
};
