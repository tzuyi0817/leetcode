/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
const rangeAddQueries = function (n, queries) {
  const diffs = Array.from({ length: n + 1 }, () => {
    return new Array(n + 1).fill(0);
  });
  const result = Array.from({ length: n }, () => new Array(n).fill(0));

  for (const [row1, col1, row2, col2] of queries) {
    diffs[row1][col1] += 1;
    diffs[row1][col2 + 1] -= 1;
    diffs[row2 + 1][col1] -= 1;
    diffs[row2 + 1][col2 + 1] += 1;
  }

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      diffs[row][col] += diffs[row - 1]?.[col] ?? 0;
      diffs[row][col] += diffs[row][col - 1] ?? 0;
      diffs[row][col] -= diffs[row - 1]?.[col - 1] ?? 0;
      result[row][col] = diffs[row][col];
    }
  }

  return result;
};
