/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const minCost = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const points = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      points.push({ row, col, value: grid[row][col] });
    }
  }

  points.sort((a, b) => a.value - b.value);

  const costs = Array.from({ length: m }, () => {
    return new Array(n).fill(Number.MAX_SAFE_INTEGER);
  });

  for (let t = 0; t <= k; t++) {
    let minCost = Number.MAX_SAFE_INTEGER;
    let left = 0;

    for (let index = 0; index < points.length; index++) {
      const { row, col, value } = points[index];
      const next = points[index + 1];

      minCost = Math.min(minCost, costs[row][col]);

      if (index + 1 < points.length && value === next.value) {
        continue;
      }

      for (let r = left; r <= index; r++) {
        costs[points[r].row][points[r].col] = minCost;
      }

      left = index + 1;
    }

    for (let row = m - 1; row >= 0; row--) {
      for (let col = n - 1; col >= 0; col--) {
        if (row === m - 1 && col === n - 1) {
          costs[row][col] = 0;
          continue;
        }

        if (row !== m - 1) {
          const cost = costs[row + 1][col] + grid[row + 1][col];

          costs[row][col] = Math.min(costs[row][col], cost);
        }

        if (col !== n - 1) {
          const cost = costs[row][col + 1] + grid[row][col + 1];

          costs[row][col] = Math.min(costs[row][col], cost);
        }
      }
    }
  }

  return costs[0][0];
};
