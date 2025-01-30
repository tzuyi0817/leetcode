/**
 * @param {number[]} stoneValue
 * @return {string}
 */
const stoneGameIII = function (stoneValue) {
  const n = stoneValue.length;
  const dp = Array.from({ length: n }, () => null);

  const choosePiles = start => {
    if (start >= n) return 0;
    if (dp[start] !== null) return dp[start];

    let score = 0;
    let result = Number.MIN_SAFE_INTEGER;

    for (let index = start; index < Math.min(start + 3, n); index++) {
      score += stoneValue[index];

      result = Math.max(score - choosePiles(index + 1), result);
    }
    dp[start] = result;

    return result;
  };

  const aliceAdvantage = choosePiles(0);

  if (aliceAdvantage > 0) return 'Alice';
  if (aliceAdvantage < 0) return 'Bob';

  return 'Tie';
};
