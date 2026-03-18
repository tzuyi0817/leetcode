/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const countSubmatrices = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  let preRowSum = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    const currentRow = new Array(n).fill(0);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const topSum = preRowSum[col];
      const leftSum = currentRow[col - 1] ?? 0;
      const cornerSum = preRowSum[col - 1] ?? 0;
      const sum = value + topSum + leftSum - cornerSum;

      currentRow[col] = sum;

      if (sum <= k) {
        result += 1;
      }
    }

    preRowSum = currentRow;
  }

  return result;
};
