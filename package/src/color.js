/**
 * toolmetryai — Color Converter
 * Convert between HEX, RGB, HSL, and named colors.
 */

const NAMED_COLORS = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff', orange: '#ffa500', purple: '#800080',
  pink: '#ffc0cb', gray: '#808080', grey: '#808080', brown: '#a52a2a', navy: '#000080',
  teal: '#008080', maroon: '#800000', olive: '#808000', lime: '#00ff00', aqua: '#00ffff',
  silver: '#c0c0c0', coral: '#ff7f50', salmon: '#fa8072', gold: '#ffd700', indigo: '#4b0082',
  violet: '#ee82ee', crimson: '#dc143c', turquoise: '#40e0d0', lavender: '#e6e6fa',
};

/**
 * Convert HEX to RGB.
 * @param {string} hex - Hex color string (with or without #).
 * @returns {{ r: number, g: number, b: number }} RGB values (0-255).
 */
function hexToRgb(hex) {
  const h = _normalizeHex(hex);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * Convert RGB to HEX.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} Hex color string with #.
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => {
    const val = Math.max(0, Math.min(255, Math.round(v)));
    return val.toString(16).padStart(2, '0');
  }).join('');
}

/**
 * Convert RGB to HSL.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {{ h: number, s: number, l: number }} HSL values (h: 0-360, s/l: 0-100).
 */
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB.
 * @param {number} h - Hue (0-360).
 * @param {number} s - Saturation (0-100).
 * @param {number} l - Lightness (0-100).
 * @returns {{ r: number, g: number, b: number }} RGB values (0-255).
 */
function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert HEX to HSL.
 * @param {string} hex - Hex color string.
 * @returns {{ h: number, s: number, l: number }} HSL values.
 */
function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

/**
 * Convert HSL to HEX.
 * @param {number} h - Hue (0-360).
 * @param {number} s - Saturation (0-100).
 * @param {number} l - Lightness (0-100).
 * @returns {string} Hex color string with #.
 */
function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/**
 * Get all format conversions for a color.
 * @param {string} input - Color in any supported format (hex, rgb, named).
 * @returns {{ hex: string, rgb: object, hsl: object, cssRgb: string, cssHsl: string }} All formats.
 */
function convert(input) {
  let hex;
  const trimmed = (input || '').trim().toLowerCase();

  if (trimmed.startsWith('#')) {
    hex = trimmed;
  } else if (NAMED_COLORS[trimmed]) {
    hex = NAMED_COLORS[trimmed];
  } else if (trimmed.startsWith('rgb')) {
    const match = trimmed.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    }
  } else {
    throw new Error(`Unsupported color format: ${input}`);
  }

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb,
    hsl,
    cssRgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    cssHsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

/**
 * Validate a hex color string.
 * @param {string} hex - The hex string to validate.
 * @returns {boolean} True if valid hex color.
 */
function isValidHex(hex) {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex);
}

/**
 * Lighten a hex color by a percentage.
 * @param {string} hex - Hex color.
 * @param {number} amount - Percentage to lighten (0-100).
 * @returns {string} Lightened hex color.
 */
function lighten(hex, amount) {
  const hsl = hexToHsl(hex);
  hsl.l = Math.min(100, hsl.l + amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Darken a hex color by a percentage.
 * @param {string} hex - Hex color.
 * @param {number} amount - Percentage to darken (0-100).
 * @returns {string} Darkened hex color.
 */
function darken(hex, amount) {
  const hsl = hexToHsl(hex);
  hsl.l = Math.max(0, hsl.l - amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

function _normalizeHex(hex) {
  let h = hex.replace(/^#/, '').toLowerCase();
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  if (h.length === 8) h = h.slice(0, 6); // strip alpha
  if (h.length !== 6) throw new Error(`Invalid hex color: ${hex}`);
  return h;
}

module.exports = {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex,
  convert, isValidHex, lighten, darken, NAMED_COLORS,
};
