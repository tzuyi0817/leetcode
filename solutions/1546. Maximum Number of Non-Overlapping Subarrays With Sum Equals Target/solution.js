/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const maxNonOverlapping = function (nums, target) {
  const prefixSum = new Set([0]);
  let result = 0;
  let current = 0;

  for (const num of nums) {
    current += num;

    if (prefixSum.has(current - target)) {
      result += 1;
      current = 0;
      prefixSum.clear();
      prefixSum.add(0);
    } else {
      prefixSum.add(current);
    }
  }
  return result;
};
