/**
 * @param {string[]} pizza
 * @param {number} k
 * @return {number}
 */
const ways = function (pizza, k) {
  const MODULO = 10 ** 9 + 7;
  const m = pizza.length;
  const n = pizza[0].length;
  const prefixSum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(_ => new Array(k).fill(-1));
  });

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const count = pizza[row][col] === 'A' ? 1 : 0;
      const prefixRow = prefixSum[row + 1][col];
      const prefixCol = prefixSum[row][col + 1];

      prefixSum[row][col] = prefixRow + prefixCol - prefixSum[row + 1][col + 1] + count;
    }
  }

  const cutPizza = (startRow, startCol, cuts) => {
    if (prefixSum[startRow][startCol] === 0) return 0;
    if (cuts === k - 1) return 1;
    if (dp[startRow][startCol][cuts] !== -1) {
      return dp[startRow][startCol][cuts];
    }
    let result = 0;

    for (let row = startRow + 1; row < m; row++) {
      if (prefixSum[startRow][startCol] - prefixSum[row][startCol] > 0) {
        result = (result + cutPizza(row, startCol, cuts + 1)) % MODULO;
      }
    }

    for (let col = startCol + 1; col < n; col++) {
      if (prefixSum[startRow][startCol] - prefixSum[startRow][col] > 0) {
        result = (result + cutPizza(startRow, col, cuts + 1)) % MODULO;
      }
    }

    dp[startRow][startCol][cuts] = result;

    return result;
  };

  return cutPizza(0, 0, 0);
};
