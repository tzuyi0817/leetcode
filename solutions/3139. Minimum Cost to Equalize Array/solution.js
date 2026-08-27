/**
 * @param {number[]} nums
 * @param {number} cost1
 * @param {number} cost2
 * @return {number}
 */
const minCostToEqualizeArray = function (nums, cost1, cost2) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const sum = nums.reduce((total, num) => total + BigInt(num), 0n);
  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  const bigCost1 = BigInt(cost1);
  const bigCost2 = BigInt(cost2);

  if (cost1 * 2 <= cost2 || n < 3) {
    const diff = BigInt(maxNum * n) - sum;

    return Number((diff * bigCost1) % MODULO);
  }

  let result = -1n;

  for (let target = maxNum; target <= maxNum * 2; target++) {
    const maxGap = BigInt(target - minNum);
    const totalGap = BigInt(target * n) - sum;
    const limit1 = totalGap / 2n;
    const limit2 = totalGap - maxGap;
    const pairs = Math.min(limit1, limit2);
    const totalCost1 = bigCost1 * (totalGap - 2n * pairs);
    const totalCost2 = bigCost2 * pairs;
    const cost = totalCost1 + totalCost2;

    if (result === -1n || (result !== -1n && result > cost)) {
      result = cost;
    }
  }

  return Number(result % MODULO);
};
