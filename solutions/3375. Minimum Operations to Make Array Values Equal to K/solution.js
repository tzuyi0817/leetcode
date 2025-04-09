/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, k) {
  const numSet = new Set();

  for (const num of nums) {
    if (num < k) return -1;
    if (num === k) continue;

    numSet.add(num);
  }

  return numSet.size;
};
