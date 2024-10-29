/**
 * @param {number[]} nums
 * @return {number}
 */
const bestRotation = function (nums) {
  const n = nums.length;
  const change = new Array(n).fill(0);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    change[(index - num + n + 1) % n] -= 1;
  }
  for (let index = 1; index < n; index++) {
    change[index] += change[index - 1] + 1;

    if (change[index] <= change[result]) continue;
    result = index;
  }
  return result;
};
