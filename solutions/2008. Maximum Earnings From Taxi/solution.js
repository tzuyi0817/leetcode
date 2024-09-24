/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
const maxTaxiEarnings = function (n, rides) {
  const dp = Array(n + 1).fill(0);
  const earningsMap = rides.reduce((map, [start, end, tip]) => {
    const endEarnings = map.get(end) ?? [];
    const earnings = end - start + tip;

    endEarnings.push({ start, earnings });
    return map.set(end, endEarnings);
  }, new Map());

  for (let point = 1; point <= n; point++) {
    const endEarnings = earningsMap.get(point) ?? [];

    dp[point] = dp[point - 1];
    for (const { start, earnings } of endEarnings) {
      dp[point] = Math.max(dp[start] + earnings, dp[point]);
    }
  }
  return dp[n];
};
