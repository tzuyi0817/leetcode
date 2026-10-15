/**
 * @param {number[]} nums
 * @return {number}
 */
const sumCounts = function (nums) {
  const n = nums.length;
  let result = 0;

  for (let a = 0; a < n; a++) {
    const numSet = new Set();

    for (let b = a; b >= 0; b--) {
      numSet.add(nums[b]);
      result += numSet.size ** 2;
    }
  }

  return result;
};
