/**
 * @param {number[]} nums
 * @return {number}
 */
const subsetXORSum = function (nums) {
  const n = nums.length;
  const total = nums.reduce((result, num) => result | num);

  // Each "bit that has occurred" will be summed 2**(n-1) Second-rate.
  return total * (1 << (n - 1));
};
