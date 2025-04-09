/**
 * @param {number[][]} cost
 * @return {number}
 */
const connectTwoGroups = function (cost) {
  const m = cost.length;
  const n = cost[0].length;
  const connected = (1 << n) - 1;
  const minCosts = Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);
  const dp = Array.from({ length: m }, () => {
    return new Array(connected + 1).fill(Number.MAX_SAFE_INTEGER);
  });

  for (let a = 0; a < m; a++) {
    for (let b = 0; b < n; b++) {
      minCosts[b] = Math.min(cost[a][b], minCosts[b]);
    }
  }

  const getRemainCost = mask => {
    if (mask === connected) return 0;
    let result = 0;

    for (let b = 0; b < n; b++) {
      if ((mask & (1 << b)) !== 0) continue;

      result += minCosts[b];
    }

    return result;
  };

  const getConnectCost = (group1, mask) => {
    if (group1 >= m) return getRemainCost(mask);
    if (dp[group1][mask] !== Number.MAX_SAFE_INTEGER) return dp[group1][mask];
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = 0; index < n; index++) {
      const currentCost = cost[group1][index];
      const nextMask = mask | (1 << index);
      const totalCost = currentCost + getConnectCost(group1 + 1, nextMask);

      result = Math.min(totalCost, result);
    }

    dp[group1][mask] = result;

    return result;
  };

  return getConnectCost(0, 0);
};
