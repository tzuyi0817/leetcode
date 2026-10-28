/**
 * @param {number[][]} grid
 * @return {number}
 */
const minCost = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const maxValue = Math.max(...grid.map(row => Math.max(...row)));
  const maxBit = 32 - Math.clz32(maxValue);
  const maxMask = (1 << maxBit) - 1;
  const dp = Array.from({ length: m * n }, () => {
    return new Array(maxMask + 1).fill(-1);
  });

  const getMinXor = (row, col, mask) => {
    if (row >= m || col >= n) return Number.MAX_SAFE_INTEGER;

    const cell = row * n + col;

    if (dp[cell][mask] !== -1) return dp[cell][mask];

    const value = grid[row][col];
    const nextMask = mask ^ value;

    if (row === m - 1 && col === n - 1) return nextMask;

    const downXor = getMinXor(row + 1, col, nextMask);
    const rightXor = getMinXor(row, col + 1, nextMask);
    const result = Math.min(downXor, rightXor);

    dp[cell][mask] = result;

    return result;
  };

  return getMinXor(0, 0, 0);
};
