/**
 * @param {number[]} baseCosts
 * @param {number[]} toppingCosts
 * @param {number} target
 * @return {number}
 */
const closestCost = function (baseCosts, toppingCosts, target) {
  let result = Number.MAX_SAFE_INTEGER;
  const toppingSize = toppingCosts.length;
  const addTopping = (cost, index) => {
    if (Math.abs(target - cost) < Math.abs(target - result)) result = cost;
    if (Math.abs(target - cost) === Math.abs(target - result) && cost < result) {
      result = cost;
    }
    if (index >= toppingSize) return;
    const toppingCost = toppingCosts[index];

    addTopping(cost, index + 1);
    addTopping(cost + toppingCost, index + 1);
    addTopping(cost + toppingCost * 2, index + 1);
  };

  for (const cost of baseCosts) {
    addTopping(cost, 0);
  }
  return result;
};
