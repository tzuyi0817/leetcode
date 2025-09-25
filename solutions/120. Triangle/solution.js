/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = function (triangle) {
  const n = triangle.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(n).fill(Number.MAX_SAFE_INTEGER);
  });

  const getMinimumScore = (row, col) => {
    if (row === n - 1) return triangle[row][col];
    if (dp[row][col] !== Number.MAX_SAFE_INTEGER) return dp[row][col];

    const score = triangle[row][col];
    const nextRow = getMinimumScore(row + 1, col);
    const nextRowCol = getMinimumScore(row + 1, col + 1);
    const total = score + Math.min(nextRow, nextRowCol);

    dp[row][col] = total;

    return total;
  };

  return getMinimumScore(0, 0);
};
