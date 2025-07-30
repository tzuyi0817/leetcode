/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const colorTheGrid = function (m, n) {
  const MODULO = BigInt(10 ** 9 + 7);
  const dp = Array.from({ length: n }, () => new Array(2 ** (m * 2)).fill(0));

  const getColor = (row, mask) => {
    return (mask >> (row * 2)) & 3;
  };

  const fillColor = (row, col, prevMask, colorMask) => {
    if (col === n) return 1n;
    if (dp[col][prevMask]) return dp[col][prevMask];
    if (row === m) return fillColor(0, col + 1, colorMask, 0);
    let result = 0n;

    for (let color = 1; color <= 3; color++) {
      if (getColor(row, prevMask) === color) continue;
      if (row && getColor(row - 1, colorMask) === color) continue;
      const nextColorMask = colorMask | (color << (row * 2));

      result = (result + fillColor(row + 1, col, prevMask, nextColorMask)) % MODULO;
    }

    if (row === 0) {
      dp[col][prevMask] = result;
    }

    return result;
  };

  return Number(fillColor(0, 0, 0, 0));
};
