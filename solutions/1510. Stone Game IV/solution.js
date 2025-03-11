/**
 * @param {number} n
 * @return {boolean}
 */
const winnerSquareGame = function (n) {
  const dp = Array.from({ length: n + 1 }, () => null);

  const removeStones = stones => {
    if (!stones) return false;
    if (dp[stones] !== null) return dp[stones];

    const maxValue = Math.floor(Math.sqrt(stones));

    for (let value = maxValue; value >= 1; value--) {
      if (removeStones(stones - value ** 2)) continue;

      dp[stones] = true;

      return true;
    }

    dp[stones] = false;

    return false;
  };

  return removeStones(n);
};
