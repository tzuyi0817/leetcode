/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const numSubseq = function (nums, target) {
  const MODULO = 10 ** 9 + 7;
  const subseqCount = [];
  let left = (result = 0);
  let right = nums.length - 1;

  nums.sort((a, b) => a - b);
  nums.forEach((_, index) => {
    subseqCount[index] = index === 0 ? 1 : (subseqCount[index - 1] * 2) % MODULO;
  });

  while (left <= right) {
    const sum = nums[left] + nums[right];

    if (sum > target) right -= 1;
    else {
      result = (result + subseqCount[right - left]) % MODULO;
      left += 1;
    }
  }
  return result;
};
