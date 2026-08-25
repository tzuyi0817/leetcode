/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const missingMultiple = function (nums, k) {
  const numSet = new Set(nums);
  let current = k;

  while (numSet.has(current)) {
    current += k;
  }

  return current;
};
