/**
 * @param {number} num
 * @return {number}
 */
const maximumSwap = function (num) {
  const nums = `${num}`.split('');
  const n = nums.length;
  let left = -1;
  let right = n - 1;
  let max = right;

  for (let index = n - 1; index >= 0; index--) {
    const current = nums[index];

    if (current < nums[max]) {
      left = index;
      right = max;
    }
    if (current <= nums[max]) continue;
    max = index;
  }

  if (left === -1) return num;

  [nums[left], nums[right]] = [nums[right], nums[left]];

  return Number(nums.join(''));
};
