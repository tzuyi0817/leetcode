/**
 * @param {number[]} stones
 * @return {number}
 */
const stoneGameVIII = function (stones) {
  const n = stones.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => null);

  for (let index = 1; index <= n; index++) {
    const value = stones[index - 1];

    prefixSum[index] = prefixSum[index - 1] + value;
  }

  const getScoreDiff = index => {
    if (index === n - 1) return prefixSum[n];

    if (dp[index] !== null) return dp[index];

    const score = prefixSum[index + 1];
    const diff = getScoreDiff(index + 1);
    const result = Math.max(score - diff, diff);

    dp[index] = result;

    return result;
  };

  return getScoreDiff(1);
};
