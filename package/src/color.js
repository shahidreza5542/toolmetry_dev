/**
 * toolmetry — Color Converter
 * Convert between HEX, RGB, HSL, and named colors.
 * @module color
 */

'use strict';

var NAMED_COLORS = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff', orange: '#ffa500', purple: '#800080',
  pink: '#ffc0cb', gray: '#808080', grey: '#808080', brown: '#a52a2a', navy: '#000080',
  teal: '#008080', maroon: '#800000', olive: '#808000', lime: '#00ff00', aqua: '#00ffff',
  silver: '#c0c0c0', coral: '#ff7f50', salmon: '#fa8072', gold: '#ffd700', indigo: '#4b0082',
  violet: '#ee82ee', crimson: '#dc143c', turquoise: '#40e0d0', lavender: '#e6e6fa',
};

function hexToRgb(hex) {
  var h = _normalizeHex(hex);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(function(v) {
    var val = Math.max(0, Math.min(255, Math.round(v)));
    return val.toString(16).padStart(2, '0');
  }).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s;
  var l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
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

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;

  var r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    var hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
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

function hexToHsl(hex) {
  var rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

function hslToHex(h, s, l) {
  var rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function convert(input) {
  var hex;
  var trimmed = (input || '').trim().toLowerCase();

  if (trimmed.startsWith('#')) {
    hex = trimmed;
  } else if (NAMED_COLORS[trimmed]) {
    hex = NAMED_COLORS[trimmed];
  } else if (trimmed.startsWith('rgb')) {
    var match = trimmed.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    }
  } else {
    throw new Error('Unsupported color format: ' + input);
  }

  var rgb = hexToRgb(hex);
  var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    hex: hex,
    rgb: rgb,
    hsl: hsl,
    cssRgb: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')',
    cssHsl: 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)',
  };
}

function isValidHex(hex) {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex);
}

function lighten(hex, amount) {
  var hsl = hexToHsl(hex);
  hsl.l = Math.min(100, hsl.l + amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

function darken(hex, amount) {
  var hsl = hexToHsl(hex);
  hsl.l = Math.max(0, hsl.l - amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

function _normalizeHex(hex) {
  var h = hex.replace(/^#/, '').toLowerCase();
  if (h.length === 3) {
    h = h.split('').map(function(c) { return c + c; }).join('');
  }
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length !== 6) throw new Error('Invalid hex color: ' + hex);
  return h;
}

module.exports = {
  hexToRgb: hexToRgb, rgbToHex: rgbToHex, rgbToHsl: rgbToHsl, hslToRgb: hslToRgb,
  hexToHsl: hexToHsl, hslToHex: hslToHex, convert: convert, isValidHex: isValidHex,
  lighten: lighten, darken: darken, NAMED_COLORS: NAMED_COLORS,
};
