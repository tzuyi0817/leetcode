/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost = function (nums, cost) {
  const n = nums.length;
  let left = Math.min(...nums);
  let right = Math.max(...nums);
  let result = Number.MAX_SAFE_INTEGER;

  const getCost = target => {
    let totalCost = 0;

    for (let index = 0; index < n; index++) {
      const diff = Math.abs(nums[index] - target);

      totalCost += diff * cost[index];
    }

    return totalCost;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cost1 = getCost(mid);
    const cost2 = getCost(mid + 1);

    cost1 > cost2 ? (left = mid + 1) : (right = mid - 1);
    result = Math.min(cost1, cost2, result);
  }

  return result;
};
