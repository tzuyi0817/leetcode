/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
const minCost = function (basket1, basket2) {
  const costMap = new Map();
  const costs = [];
  let swapCount = 0;

  for (const cost of basket1) {
    const count = costMap.get(cost) ?? 0;

    costMap.set(cost, count + 1);
  }

  for (const cost of basket2) {
    const count = costMap.get(cost) ?? 0;

    costMap.set(cost, count - 1);
  }

  for (const [cost, count] of costMap) {
    if (count % 2 !== 0) return -1;

    costs.push({ cost, count: Math.abs(count) / 2 });

    if (count > 0) {
      swapCount += count / 2;
    }
  }

  costs.sort((a, b) => a.cost - b.cost);

  const minCost = costs[0].cost;
  let result = 0;

  for (const { cost, count } of costs) {
    const swap = Math.min(swapCount, count);
    const cost1 = minCost * swap * 2;
    const cost2 = cost * swap;

    result += Math.min(cost1, cost2);
    swapCount -= swap;

    if (!swapCount) return result;
  }

  return -1;
};
