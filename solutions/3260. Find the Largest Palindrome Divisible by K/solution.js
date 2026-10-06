/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const largestPalindrome = function (n, k) {
  const half = Math.ceil(n / 2);
  const pow10 = Array.from({ length: n }, () => 0);
  const contribution = Array.from({ length: half }, () => 0);

  pow10[0] = 1 % k;

  for (let index = 1; index < n; index++) {
    pow10[index] = (pow10[index - 1] * 10) % k;
  }

  for (let index = 0; index < half; index++) {
    const pair = n - 1 - index;
    const pairContribution = index === pair ? 0 : pow10[pair];

    contribution[index] = (pow10[index] + pairContribution) % k;
  }

  const dp = Array.from({ length: half }, () => new Array(k).fill(-1));

  const dfs = (index, mod) => {
    if (index === half) return mod === 0;

    if (dp[index][mod] !== -1) {
      return dp[index][mod] !== 10;
    }

    const limit = index === 0 ? 1 : 0;

    for (let num = 9; num >= limit; num--) {
      const nextMod = (num * contribution[index] + mod) % k;

      if (dfs(index + 1, nextMod)) {
        dp[index][mod] = num;

        return true;
      }
    }

    dp[index][mod] = 10;

    return false;
  };

  dfs(0, 0);

  const isOdd = Boolean(n % 2);
  const start = half - 1 - isOdd;
  let prefix = '';
  let mod = 0;
  let suffix = '';

  for (let index = 0; index < half; index++) {
    const num = dp[index][mod];

    mod = (mod + num * contribution[index]) % k;
    prefix += num;
  }

  for (let index = start; index >= 0; index--) {
    suffix += prefix[index];
  }

  return `${prefix}${suffix}`;
};
