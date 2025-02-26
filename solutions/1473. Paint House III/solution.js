/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
const minCost = function (houses, cost, m, n, target) {
  const dp = Array.from({ length: m }, () => {
    return new Array(target + 1).fill('').map(_ => new Array(n + 1).fill(null));
  });

  const paintHouse = (index, neighborhoods, neighborColor) => {
    if (neighborhoods > target) return -1;
    if (index >= m) return neighborhoods === target ? 0 : -1;
    if (dp[index][neighborhoods][neighborColor] !== null) {
      return dp[index][neighborhoods][neighborColor];
    }

    if (houses[index] !== 0) {
      const color = houses[index];
      const nextNeighborhoods = neighborhoods + (color === neighborColor ? 0 : 1);

      return paintHouse(index + 1, nextNeighborhoods, color);
    }

    let result = Number.MAX_SAFE_INTEGER;

    for (let color = 1; color <= n; color++) {
      const needCost = cost[index][color - 1];
      const nextNeighborhoods = neighborhoods + (color === neighborColor ? 0 : 1);
      const nextCost = paintHouse(index + 1, nextNeighborhoods, color);

      if (nextCost === -1) continue;

      result = Math.min(needCost + nextCost, result);
    }

    dp[index][neighborhoods][neighborColor] = result === Number.MAX_SAFE_INTEGER ? -1 : result;

    return dp[index][neighborhoods][neighborColor];
  };

  return paintHouse(0, 0, 0);
};
