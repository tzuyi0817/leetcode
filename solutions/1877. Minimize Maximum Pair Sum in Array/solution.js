/**
 * @param {number[]} nums
 * @return {number}
 */
const minPairSum = function (nums) {
  nums.sort((a, b) => a - b);

  const size = nums.length;
  let result = 0;

  for (let index = 0; index < size / 2; index++) {
    const sum = nums[index] + nums[size - index - 1];

    result = Math.max(sum, result);
  }
  return result;
};
