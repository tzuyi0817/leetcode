/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar = function (s, dictionary) {
  const n = s.length;
  const dp = new Array(n).fill(n);

  dp[-1] = 0;

  for (let a = 0; a < n; a++) {
    dp[a] = dp[a - 1] + 1;

    for (let b = 0; b <= a; b++) {
      const word = s.slice(b, a + 1);

      if (!dictionary.includes(word)) continue;

      dp[a] = Math.min(dp[b - 1], dp[a]);
    }
  }
  return dp[n - 1];
};
