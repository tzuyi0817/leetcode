/**
 * @param {number} n
 * @return {number}
 */
const numTilings = function (n) {
  const MODULO = BigInt(10 ** 9 + 7);
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  const putTiling = (col1, col2) => {
    if (col1 > n || col2 > n) return 0n;
    if (col1 === n && col2 === n) return 1n;
    if (dp[col1][col2] !== -1) return dp[col1][col2];
    let result = 0n;

    if (col1 === col2) {
      result = (result + putTiling(col1 + 2, col2 + 2)) % MODULO;
      result = (result + putTiling(col1 + 1, col2 + 1)) % MODULO;
      result = (result + putTiling(col1 + 2, col2 + 1)) % MODULO;
      result = (result + putTiling(col1 + 1, col2 + 2)) % MODULO;
    }

    if (col1 - col2 === 1) {
      result = (result + putTiling(col1, col2 + 2)) % MODULO;
      result = (result + putTiling(col1 + 1, col2 + 2)) % MODULO;
    }

    if (col2 - col1 === 1) {
      result = (result + putTiling(col1 + 2, col2)) % MODULO;
      result = (result + putTiling(col1 + 2, col2 + 1)) % MODULO;
    }

    dp[col1][col2] = result;

    return result;
  };

  return Number(putTiling(0, 0));
};
