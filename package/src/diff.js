/**
 * toolmetryai — Diff Checker
 * Compare two strings and find differences line by line.
 */

/**
 * Compare two strings and return line-by-line diff.
 * @param {string} oldText - The original text.
 * @param {string} newText - The modified text.
 * @returns {{ lines: Array<{type: 'same'|'added'|'removed', content: string, line: number}>, stats: {added: number, removed: number, unchanged: number} }}
 */
function diff(oldText, newText) {
  if (typeof oldText !== 'string' || typeof newText !== 'string') {
    throw new TypeError('Both inputs must be strings');
  }

  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  // Simple LCS-based diff
  const lcs = _lcs(oldLines, newLines);

  const result = [];
  let oldIdx = 0;
  let newIdx = 0;
  let lcsIdx = 0;
  let added = 0;
  let removed = 0;
  let unchanged = 0;
  let lineNum = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    if (lcsIdx < lcs.length && oldIdx < oldLines.length && oldLines[oldIdx] === lcs[lcsIdx] && newIdx < newLines.length && newLines[newIdx] === lcs[lcsIdx]) {
      lineNum++;
      result.push({ type: 'same', content: oldLines[oldIdx], line: lineNum });
      unchanged++;
      oldIdx++;
      newIdx++;
      lcsIdx++;
    } else if (newIdx < newLines.length && (lcsIdx >= lcs.length || newLines[newIdx] !== lcs[lcsIdx])) {
      lineNum++;
      result.push({ type: 'added', content: newLines[newIdx], line: lineNum });
      added++;
      newIdx++;
    } else if (oldIdx < oldLines.length && (lcsIdx >= lcs.length || oldLines[oldIdx] !== lcs[lcsIdx])) {
      result.push({ type: 'removed', content: oldLines[oldIdx], line: lineNum });
      removed++;
      oldIdx++;
    }
  }

  return {
    lines: result,
    stats: { added, removed, unchanged },
  };
}

/**
 * Generate a unified diff string.
 * @param {string} oldText - The original text.
 * @param {string} newText - The modified text.
 * @param {string} [oldLabel='original'] - Label for old text.
 * @param {string} [newLabel='modified'] - Label for new text.
 * @returns {string} Unified diff string.
 */
function unifiedDiff(oldText, newText, oldLabel = 'original', newLabel = 'modified') {
  const result = diff(oldText, newText);
  const lines = [`--- ${oldLabel}`, `+++ ${newLabel}`];

  for (const line of result.lines) {
    if (line.type === 'added') lines.push(`+ ${line.content}`);
    else if (line.type === 'removed') lines.push(`- ${line.content}`);
    else lines.push(`  ${line.content}`);
  }

  return lines.join('\n');
}

/**
 * Check if two strings are identical.
 * @param {string} a - First string.
 * @param {string} b - Second string.
 * @returns {boolean} True if identical.
 */
function isSame(a, b) {
  return a === b;
}

function _lcs(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const result = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

module.exports = { diff, unifiedDiff, isSame };
