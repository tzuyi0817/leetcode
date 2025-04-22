/**
 * @param {number} n
 * @param {number} maxValue
 * @return {number}
 */
const idealArrays = function (n, maxValue) {
  const MODULO = BigInt(10 ** 9 + 7);
  const maxN = Math.min(n, 14); // 2 ** 14 > 10 ** 4
  const dp = Array.from({ length: maxN + 1 }, () => new Array(maxValue + 1).fill(0n));
  const factors = Array.from({ length: maxValue + 1 }, () => []);
  const comb = Array.from({ length: n }, () => new Array(maxN).fill(-1));
  let result = 0n;

  const nCk = (n, k) => {
    if (!k || n === k) return 1n;
    if (comb[n][k] !== -1) return comb[n][k];
    const count = nCk(n - 1, k) + nCk(n - 1, k - 1);

    comb[n][k] = count;

    return count;
  };

  for (let factor = 1; factor <= maxValue; factor++) {
    for (let value = factor * 2; value <= maxValue; value += factor) {
      factors[value].push(factor);
    }
  }

  for (let value = 1; value <= maxValue; value++) {
    dp[1][value] = 1n;
  }

  for (let len = 2; len <= maxN; len++) {
    for (let value = 1; value <= maxValue; value++) {
      for (const factor of factors[value]) {
        dp[len][value] = (dp[len][value] + dp[len - 1][factor]) % MODULO;
      }
    }
  }

  for (let len = 1; len <= maxN; len++) {
    for (let value = 1; value <= maxValue; value++) {
      dp[len][0] = (dp[len][0] + dp[len][value]) % MODULO;
    }
  }

  for (let len = 1; len <= maxN; len++) {
    result = (result + nCk(n - 1, len - 1) * dp[len][0]) % MODULO;
  }

  return Number(result);
};
