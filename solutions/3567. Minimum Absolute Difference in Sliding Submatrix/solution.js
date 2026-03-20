/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
const minAbsDiff = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const result = Array.from({ length: m - k + 1 }, () => {
    return new Array(n - k + 1).fill(0);
  });

  const getMinAbsoluteDiff = (startRow, startCol) => {
    const valueSet = new Set();

    for (let row = 0; row < k; row++) {
      for (let col = 0; col < k; col++) {
        const value = grid[startRow + row][startCol + col];

        valueSet.add(value);
      }
    }

    if (valueSet.size === 1) return 0;

    const values = [...valueSet].toSorted((a, b) => a - b);
    let minDiff = Number.MAX_SAFE_INTEGER;

    for (let index = 1; index < values.length; index++) {
      const diff = Math.abs(values[index] - values[index - 1]);

      minDiff = Math.min(diff, minDiff);
    }

    return minDiff;
  };

  for (let row = 0; row < m - k + 1; row++) {
    for (let col = 0; col < n - k + 1; col++) {
      result[row][col] = getMinAbsoluteDiff(row, col);
    }
  }

  return result;
};
