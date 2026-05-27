/**
 * toolmetryai — Cron Expression Validator
 * Parse and validate cron expressions.
 */

const CRON_ALIASES = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *',
};

const FIELD_NAMES = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];

const FIELD_RANGES = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  dayOfMonth: { min: 1, max: 31 },
  month: { min: 1, max: 12 },
  dayOfWeek: { min: 0, max: 7 }, // 0 and 7 both = Sunday
};

const MONTH_NAMES = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

const DAY_NAMES = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

/**
 * Validate a cron expression.
 * @param {string} expression - The cron expression to validate.
 * @returns {{ valid: boolean, error: string|null, fields: object|null }}
 */
function validate(expression) {
  if (typeof expression !== 'string') {
    return { valid: false, error: 'Expression must be a string', fields: null };
  }

  const trimmed = expression.trim();

  // Check aliases
  if (trimmed.startsWith('@')) {
    if (CRON_ALIASES[trimmed]) {
      return { valid: true, error: null, fields: { alias: trimmed, expanded: CRON_ALIASES[trimmed] } };
    }
    return { valid: false, error: `Unknown alias: ${trimmed}`, fields: null };
  }

  const parts = trimmed.split(/\s+/);

  if (parts.length < 5 || parts.length > 6) {
    return { valid: false, error: `Expected 5 or 6 fields, got ${parts.length}`, fields: null };
  }

  const hasSeconds = parts.length === 6;
  const fields = {};

  for (let i = 0; i < 5; i++) {
    const partIndex = hasSeconds ? i + 1 : i;
    const fieldName = FIELD_NAMES[i];
    const range = FIELD_RANGES[fieldName];
    const result = _parseField(parts[partIndex], range, fieldName);

    if (!result.valid) {
      return { valid: false, error: `Field "${fieldName}": ${result.error}`, fields: null };
    }
    fields[fieldName] = result.values;
  }

  if (hasSeconds) {
    const secondsResult = _parseField(parts[0], { min: 0, max: 59 }, 'second');
    if (!secondsResult.valid) {
      return { valid: false, error: `Field "second": ${secondsResult.error}`, fields: null };
    }
    fields.second = secondsResult.values;
  }

  return { valid: true, error: null, fields };
}

/**
 * Get a human-readable description of a cron expression.
 * @param {string} expression - The cron expression.
 * @returns {string} Human-readable description.
 */
function describe(expression) {
  const result = validate(expression);
  if (!result.valid) return `Invalid: ${result.error}`;

  if (result.fields.alias) {
    const descriptions = {
      '@yearly': 'Runs once a year (January 1st at midnight)',
      '@annually': 'Runs once a year (January 1st at midnight)',
      '@monthly': 'Runs once a month (1st at midnight)',
      '@weekly': 'Runs once a week (Sunday at midnight)',
      '@daily': 'Runs once a day (at midnight)',
      '@midnight': 'Runs once a day (at midnight)',
      '@hourly': 'Runs once an hour (at minute 0)',
    };
    return descriptions[result.fields.alias] || result.fields.alias;
  }

  const f = result.fields;
  const parts = [];

  if (f.minute && f.minute.length === 1 && f.minute[0] === 0) parts.push('at minute 0');
  else if (f.minute && f.minute.length > 1) parts.push(`at minutes ${f.minute.join(', ')}`);

  if (f.hour && f.hour.length === 1) parts.push(`at hour ${f.hour[0]}`);
  else if (f.hour && f.hour.length > 1) parts.push(`at hours ${f.hour.join(', ')}`);

  return `Cron: ${expression}` + (parts.length > 0 ? ` (${parts.join(', ')})` : '');
}

/**
 * Expand a cron field value into individual numbers.
 */
function _parseField(field, range, fieldName) {
  const values = new Set();

  // Handle month/day names
  let normalized = field.toLowerCase();
  if (fieldName === 'month') {
    for (const [name, num] of Object.entries(MONTH_NAMES)) {
      normalized = normalized.replace(new RegExp(name, 'gi'), String(num));
    }
  }
  if (fieldName === 'dayOfWeek') {
    for (const [name, num] of Object.entries(DAY_NAMES)) {
      normalized = normalized.replace(new RegExp(name, 'gi'), String(num));
    }
  }

  const segments = normalized.split(',');

  for (const segment of segments) {
    const stepMatch = segment.match(/^(.+)\/(\d+)$/);
    const step = stepMatch ? parseInt(stepMatch[2], 10) : 1;
    const rangePart = stepMatch ? stepMatch[1] : segment;

    let start, end;

    if (rangePart === '*') {
      start = range.min;
      end = range.max;
    } else if (rangePart.includes('-')) {
      const [s, e] = rangePart.split('-').map(Number);
      start = s;
      end = e;
    } else {
      start = end = parseInt(rangePart, 10);
    }

    if (isNaN(start) || isNaN(end)) {
      return { valid: false, error: `Invalid value in "${segment}"`, values: null };
    }

    for (let i = start; i <= end; i += step) {
      if (i < range.min || i > range.max) {
        return { valid: false, error: `Value ${i} out of range (${range.min}-${range.max})`, values: null };
      }
      values.add(i);
    }
  }

  // Normalize dayOfWeek: 7 = 0 (Sunday)
  if (fieldName === 'dayOfWeek' && values.has(7)) {
    values.delete(7);
    values.add(0);
  }

  return { valid: true, values: Array.from(values).sort((a, b) => a - b) };
}

module.exports = { validate, describe, CRON_ALIASES, FIELD_NAMES, FIELD_RANGES };
