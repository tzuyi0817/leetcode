/**
 * @param {number[]} nums
 * @return {number}
 */
const minSwaps = function (nums) {
  const n = nums.length;
  const totalOnes = nums.reduce((sum, num) => sum + num);
  let ones = 0;
  let maxOnes = 0;

  for (let index = 0; index < n * 2; index++) {
    if (nums[index % n]) ones += 1;
    if (index >= totalOnes && nums[(index - totalOnes) % n]) {
      ones -= 1;
    }
    maxOnes = Math.max(ones, maxOnes);
  }
  return totalOnes - maxOnes;
};
