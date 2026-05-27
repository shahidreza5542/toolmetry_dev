/**
 * toolmetry — Diff Checker
 * Compare text and generate diffs using LCS algorithm.
 * @module diff
 */

'use strict';

function diff(oldText, newText) {
  if (typeof oldText !== 'string' || typeof newText !== 'string') {
    throw new TypeError('Both inputs must be strings');
  }

  var oldLines = oldText.split('\n');
  var newLines = newText.split('\n');
  var lcs = _lcs(oldLines, newLines);

  var result = [];
  var stats = { added: 0, removed: 0, unchanged: 0 };
  var oi = 0, ni = 0, li = 0;

  while (oi < oldLines.length || ni < newLines.length) {
    if (li < lcs.length && oi < oldLines.length && ni < newLines.length &&
        oldLines[oi] === lcs[li] && newLines[ni] === lcs[li]) {
      result.push({ type: 'same', content: oldLines[oi], line: oi + 1 });
      stats.unchanged++;
      oi++; ni++; li++;
    } else if (li < lcs.length && oi < oldLines.length && oldLines[oi] !== lcs[li]) {
      result.push({ type: 'removed', content: oldLines[oi], line: oi + 1 });
      stats.removed++;
      oi++;
    } else if (li < lcs.length && ni < newLines.length && newLines[ni] !== lcs[li]) {
      result.push({ type: 'added', content: newLines[ni], line: ni + 1 });
      stats.added++;
      ni++;
    } else if (oi < oldLines.length) {
      result.push({ type: 'removed', content: oldLines[oi], line: oi + 1 });
      stats.removed++;
      oi++;
    } else if (ni < newLines.length) {
      result.push({ type: 'added', content: newLines[ni], line: ni + 1 });
      stats.added++;
      ni++;
    }
  }

  return { lines: result, stats: stats };
}

function unifiedDiff(oldText, newText, oldLabel, newLabel) {
  var ol = oldLabel || 'original';
  var nl = newLabel || 'modified';
  var result = diff(oldText, newText);
  var lines = ['--- ' + ol, '+++ ' + nl];
  for (var i = 0; i < result.lines.length; i++) {
    var line = result.lines[i];
    var prefix = line.type === 'added' ? '+' : (line.type === 'removed' ? '-' : ' ');
    lines.push(prefix + line.content);
  }
  return lines.join('\n');
}

function isSame(a, b) {
  return a === b;
}

function _lcs(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) {
    dp[i] = [];
    for (var j = 0; j <= n; j++) {
      dp[i][j] = 0;
    }
  }
  for (var i2 = 1; i2 <= m; i2++) {
    for (var j2 = 1; j2 <= n; j2++) {
      if (a[i2 - 1] === b[j2 - 1]) {
        dp[i2][j2] = dp[i2 - 1][j2 - 1] + 1;
      } else {
        dp[i2][j2] = Math.max(dp[i2 - 1][j2], dp[i2][j2 - 1]);
      }
    }
  }

  var result = [];
  var i3 = m, j3 = n;
  while (i3 > 0 && j3 > 0) {
    if (a[i3 - 1] === b[j3 - 1]) {
      result.unshift(a[i3 - 1]);
      i3--; j3--;
    } else if (dp[i3 - 1][j3] > dp[i3][j3 - 1]) {
      i3--;
    } else {
      j3--;
    }
  }
  return result;
}

module.exports = { diff: diff, unifiedDiff: unifiedDiff, isSame: isSame };
