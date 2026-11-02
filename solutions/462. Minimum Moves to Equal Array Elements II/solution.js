/**
 * @param {number[]} nums
 * @return {number}
 */
const minMoves2 = function (nums) {
  const n = nums.length;
  const half = Math.floor((n - 1) / 2);

  nums.sort((a, b) => a - b);

  return nums.reduce((result, num) => {
    return result + Math.abs(num - nums[half]);
  }, 0);
};
