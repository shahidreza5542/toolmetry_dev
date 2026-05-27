/**
 * toolmetry — Cron Expression Validator
 * Validate and describe cron expressions.
 * @module cron
 */

'use strict';

var ALIASES = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *',
};

var MONTH_NAMES = {
  'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
  'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
};

var DAY_NAMES = {
  'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6,
};

var FIELD_NAMES = ['minute', 'hour', 'day of month', 'month', 'day of week'];

var FIELD_RANGES = [
  { min: 0, max: 59 },
  { min: 0, max: 23 },
  { min: 1, max: 31 },
  { min: 1, max: 12 },
  { min: 0, max: 7 },
];

function validate(expression) {
  if (typeof expression !== 'string') {
    return { valid: false, error: 'Expression must be a string', fields: null };
  }

  var expr = expression.trim();

  if (ALIASES[expr]) {
    return { valid: true, error: null, fields: { alias: expr, expanded: ALIASES[expr] } };
  }

  var parts = expr.split(/\s+/);
  if (parts.length !== 5) {
    return { valid: false, error: 'Cron expression must have exactly 5 fields, got ' + parts.length, fields: null };
  }

  var fields = {};
  for (var i = 0; i < 5; i++) {
    var result = _validateField(parts[i], i);
    if (!result.valid) {
      return { valid: false, error: 'Field ' + FIELD_NAMES[i] + ': ' + result.error, fields: null };
    }
    fields[FIELD_NAMES[i]] = result.values;
  }

  return { valid: true, error: null, fields: fields };
}

function describe(expression) {
  var result = validate(expression);
  if (!result.valid) return 'Invalid: ' + result.error;

  var expr = expression.trim();
  if (ALIASES[expr]) {
    var descriptions = {
      '@yearly': 'Run once a year (midnight, January 1st)',
      '@annually': 'Run once a year (midnight, January 1st)',
      '@monthly': 'Run once a month (midnight, 1st)',
      '@weekly': 'Run once a week (midnight, Sunday)',
      '@daily': 'Run once a day (midnight)',
      '@midnight': 'Run once a day (midnight)',
      '@hourly': 'Run once an hour',
    };
    return descriptions[expr] || expr;
  }

  var parts = expr.split(/\s+/);
  var desc = [];
  desc.push('Minute: ' + _describeField(parts[0], 0));
  desc.push('Hour: ' + _describeField(parts[1], 1));
  desc.push('Day: ' + _describeField(parts[2], 2));
  desc.push('Month: ' + _describeField(parts[3], 3));
  desc.push('Weekday: ' + _describeField(parts[4], 4));
  return desc.join(', ');
}

function _validateField(field, index) {
  var range = FIELD_RANGES[index];
  var values = [];

  var parts = field.split(',');
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].toLowerCase();

    part = _replaceNames(part, index);

    if (part === '*') {
      for (var v = range.min; v <= range.max; v++) values.push(v);
      continue;
    }

    var stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
      var base = stepMatch[1];
      var step = parseInt(stepMatch[2], 10);
      if (step < 1) return { valid: false, error: 'Step must be at least 1' };

      var rangeMatch = base.match(/^(\d+)-(\d+)$/);
      var start, end;
      if (rangeMatch) {
        start = parseInt(rangeMatch[1], 10);
        end = parseInt(rangeMatch[2], 10);
      } else if (base === '*') {
        start = range.min;
        end = range.max;
      } else {
        start = parseInt(base, 10);
        end = range.max;
      }

      if (isNaN(start) || isNaN(end)) return { valid: false, error: 'Invalid range' };
      for (var j = start; j <= end; j += step) values.push(j);
      continue;
    }

    var rangeMatch2 = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch2) {
      var s = parseInt(rangeMatch2[1], 10);
      var e = parseInt(rangeMatch2[2], 10);
      if (s < range.min || e > range.max) return { valid: false, error: 'Value out of range (' + range.min + '-' + range.max + ')' };
      for (var k = s; k <= e; k++) values.push(k);
      continue;
    }

    var num = parseInt(part, 10);
    if (isNaN(num)) return { valid: false, error: 'Invalid value: ' + part };
    if (num < range.min || num > range.max) return { valid: false, error: 'Value ' + num + ' out of range (' + range.min + '-' + range.max + ')' };
    values.push(num);
  }

  return { valid: true, values: values };
}

function _replaceNames(part, index) {
  var result = part;
  if (index === 3) {
    Object.keys(MONTH_NAMES).forEach(function(name) {
      result = result.replace(new RegExp(name, 'g'), String(MONTH_NAMES[name]));
    });
  }
  if (index === 4) {
    Object.keys(DAY_NAMES).forEach(function(name) {
      result = result.replace(new RegExp(name, 'g'), String(DAY_NAMES[name]));
    });
  }
  return result;
}

function _describeField(field, index) {
  if (field === '*') return 'every';
  return field;
}

module.exports = { validate: validate, describe: describe, ALIASES: ALIASES };
