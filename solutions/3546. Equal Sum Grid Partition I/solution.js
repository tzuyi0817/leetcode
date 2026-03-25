/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let totalSum = 0;
  let currentSum = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      totalSum += grid[row][col];
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      currentSum += grid[row][col];
    }

    if (totalSum - currentSum === currentSum) return true;
  }

  currentSum = 0;

  for (let col = 0; col < n; col++) {
    for (let row = 0; row < m; row++) {
      currentSum += grid[row][col];
    }

    if (totalSum - currentSum === currentSum) return true;
  }

  return false;
};
