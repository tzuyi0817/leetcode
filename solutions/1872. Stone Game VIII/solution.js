/**
 * @param {number[]} stones
 * @return {number}
 */
const stoneGameVIII = function (stones) {
  const n = stones.length;
  const prefixScores = Array.from({ length: n }, () => 0);
  const dp = Array.from({ length: n }, () => Number.MIN_SAFE_INTEGER);

  prefixScores[0] = stones[0];

  for (let index = 1; index < n; index++) {
    prefixScores[index] += stones[index] + prefixScores[index - 1];
  }

  const chooseStones = index => {
    if (index === n - 1) return prefixScores[index];
    if (dp[index] !== Number.MIN_SAFE_INTEGER) return dp[index];
    const skipScores = chooseStones(index + 1);
    const pickScores = prefixScores[index] - chooseStones(index + 1);
    const result = Math.max(skipScores, pickScores);

    dp[index] = result;

    return result;
  };

  return chooseStones(1);
};
