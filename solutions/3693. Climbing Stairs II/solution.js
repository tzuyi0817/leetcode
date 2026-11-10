/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
const climbStairs = function (n, costs) {
  const dp = Array.from({ length: n + 1 }, () => -1);

  const getMinCost = index => {
    if (index === n) return 0;

    if (dp[index] !== -1) return dp[index];

    let result = Number.MAX_SAFE_INTEGER;

    for (let step = 1; step <= 3; step++) {
      const next = index + step;

      if (next > n) continue;

      const cost = step ** 2 + costs[next - 1] + getMinCost(next);

      result = Math.min(cost, result);
    }

    dp[index] = result;

    return result;
  };

  return getMinCost(0);
};
