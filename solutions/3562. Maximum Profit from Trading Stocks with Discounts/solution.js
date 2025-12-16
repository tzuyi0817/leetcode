/**
 * @param {number} n
 * @param {number[]} present
 * @param {number[]} future
 * @param {number[][]} hierarchy
 * @param {number} budget
 * @return {number}
 */
const maxProfit = function (n, present, future, hierarchy, budget) {
  const graph = Array.from({ length: n }, () => []);
  const memo = Array.from({ length: n }, () => [null, null]);

  for (const [u, v] of hierarchy) {
    graph[u - 1].push(v - 1);
  }

  const mergeDp = (a, b) => {
    const result = new Array(budget + 1).fill(Number.MIN_SAFE_INTEGER);

    for (let costA = 0; costA <= budget; costA++) {
      if (a[costA] === Number.MIN_SAFE_INTEGER) continue;

      for (let costB = 0; costB <= budget; costB++) {
        if (b[costB] === Number.MIN_SAFE_INTEGER) continue;

        const cost = costA + costB;

        if (cost > budget) continue;

        const profit = a[costA] + b[costB];

        result[cost] = Math.max(result[cost], profit);
      }
    }

    return result;
  };

  const tradingStock = (employee, bossBought) => {
    const bought = bossBought ? 1 : 0;

    if (memo[employee][bought]) return memo[employee][bought];

    const cost = present[employee];
    const discountCost = Math.floor(cost / 2);
    const realCost = bossBought ? discountCost : cost;
    const profit = future[employee] - realCost;
    let dp = new Array(budget + 1).fill(Number.MIN_SAFE_INTEGER);
    let skipDp = new Array(budget + 1).fill(Number.MIN_SAFE_INTEGER);

    skipDp[0] = 0;

    for (const sub of graph[employee]) {
      const subDp = tradingStock(sub, false);

      skipDp = mergeDp(subDp, skipDp);
    }

    if (realCost <= budget) {
      dp[realCost] = profit;

      for (const sub of graph[employee]) {
        const subDp = tradingStock(sub, true);

        dp = mergeDp(subDp, dp);
      }
    }

    const result = new Array(budget + 1).fill(Number.MIN_SAFE_INTEGER);

    for (let index = 0; index <= budget; index++) {
      result[index] = Math.max(dp[index], skipDp[index]);
    }

    memo[employee][bought] = result;

    return result;
  };

  const dp = tradingStock(0, false);

  return Math.max(...dp);
};
