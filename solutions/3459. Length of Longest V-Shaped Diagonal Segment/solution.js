/**
 * @param {number[][]} grid
 * @return {number}
 */
const lenOfVDiagonal = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];
  const dp = new Array(m * n * 4 * 2).fill(-1);
  let result = 0;

  const getVDiagonalSegment = (row, col, dir, turned, target) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return 0;
    if (grid[row][col] !== target) return 0;

    const hashKey = ((row * n + col) * 4 + dir) * 2 + turned;

    if (dp[hashKey] !== -1) return dp[hashKey];

    const [moveRow, moveCol] = directions[dir];
    const nextRow = row + moveRow;
    const nextCol = col + moveCol;
    const nextValue = target ? 0 : 2;
    let maxSegment = 1 + getVDiagonalSegment(nextRow, nextCol, dir, turned, nextValue);

    if (!turned) {
      const turnDir = (dir + 1) % 4;
      const [moveRow, moveCol] = directions[turnDir];
      const turnRow = row + moveRow;
      const turnCol = col + moveCol;
      const len = 1 + getVDiagonalSegment(turnRow, turnCol, turnDir, 1, nextValue);

      maxSegment = Math.max(len, maxSegment);
    }

    dp[hashKey] = maxSegment;

    return maxSegment;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== 1) continue;

      for (let index = 0; index < 4; index++) {
        const [moveRow, moveCol] = directions[index];
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;
        const len = 1 + getVDiagonalSegment(nextRow, nextCol, index, 0, 2);

        result = Math.max(len, result);
      }
    }
  }

  return result;
};
