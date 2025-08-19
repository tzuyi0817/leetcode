/**
 * @param {string} num
 * @return {number}
 */
const numberOfCombinations = function (num) {
  if (num[0] === '0') return 0;

  const MODULO = BigInt(10 ** 9 + 7);
  const n = num.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(0n));
  const lcs = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  for (let a = n - 1; a >= 0; a--) {
    for (let b = a + 1; b < n; b++) {
      if (num[a] !== num[b]) continue;

      lcs[a][b] = lcs[a + 1][b + 1] + 1;
    }
  }

  for (let index = 0; index < n; index++) {
    for (let len = 1; len <= index + 1; len++) {
      const start = index - len + 1;

      dp[index][len] += dp[index][len - 1];
      dp[index][len] %= MODULO;

      if (num[start] === '0') continue;
      if (start === 0) {
        dp[index][len] += 1n;
        continue;
      }

      if (start < len) {
        dp[index][len] += dp[start - 1][start];
        continue;
      }

      const lc = lcs[start - len][start];

      if (lc >= len || num[start - len + lc] <= num[start + lc]) {
        dp[index][len] += dp[start - 1][len];
      } else {
        dp[index][len] += dp[start - 1][len - 1];
      }
    }
  }

  return Number(dp[n - 1][n] % MODULO);
};
