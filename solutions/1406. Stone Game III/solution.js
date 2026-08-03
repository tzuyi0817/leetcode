/**
 * @param {number[]} stoneValue
 * @return {string}
 */
const stoneGameIII = function (stoneValue) {
  const n = stoneValue.length;
  const dp = Array.from({ length: n }, () => null);

  const getGameScore = index => {
    if (index >= n) return 0;

    if (dp[index] !== null) return dp[index];

    const current = stoneValue[index];

    let result = current - getGameScore(index + 1);

    if (index + 2 <= n) {
      const score = current + stoneValue[index + 1];
      const pickTwo = score - getGameScore(index + 2);

      result = Math.max(pickTwo, result);
    }

    if (index + 3 <= n) {
      const score = current + stoneValue[index + 1] + stoneValue[index + 2];
      const pickThree = score - getGameScore(index + 3);

      result = Math.max(pickThree, result);
    }

    dp[index] = result;

    return result;
  };

  const score = getGameScore(0);

  if (score === 0) return 'Tie';

  return score > 0 ? 'Alice' : 'Bob';
};
