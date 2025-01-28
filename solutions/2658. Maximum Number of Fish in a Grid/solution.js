/**
 * @param {number[][]} grid
 * @return {number}
 */
const findMaxFish = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const findFish = (row, col) => {
    if (row >= m || col >= n || row < 0 || col < 0) return 0;
    const value = grid[row][col];

    if (!value) return 0;

    grid[row][col] = 0;
    const leftFish = findFish(row, col - 1);
    const rightFish = findFish(row, col + 1);
    const upperFish = findFish(row - 1, col);
    const lowerFish = findFish(row + 1, col);

    return value + leftFish + rightFish + upperFish + lowerFish;
  };

  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (!value) continue;

      result = Math.max(findFish(row, col), result);
    }
  }
  return result;
};
