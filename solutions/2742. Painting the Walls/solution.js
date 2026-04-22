/**
 * @param {number[]} cost
 * @param {number[]} time
 * @return {number}
 */
const paintWalls = function (cost, time) {
  const n = cost.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  const getPaintCost = (index, remainedWalls) => {
    if (remainedWalls <= 0) return 0;
    if (index >= n) return Number.MAX_SAFE_INTEGER;
    if (dp[index][remainedWalls] !== -1) return dp[index][remainedWalls];

    const nextRemainedWalls = remainedWalls - time[index] - 1;
    const paintCost = cost[index] + getPaintCost(index + 1, nextRemainedWalls);
    const skipCost = getPaintCost(index + 1, remainedWalls);
    const result = Math.min(paintCost, skipCost);

    dp[index][remainedWalls] = result;

    return result;
  };

  return getPaintCost(0, n);
};
