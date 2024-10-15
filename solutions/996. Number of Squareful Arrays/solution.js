/**
 * @param {number[]} nums
 * @return {number}
 */
const numSquarefulPerms = function (nums) {
  const n = nums.length;
  let result = 0;

  const findSquarefulPrem = (last, used, length) => {
    if (length === n) {
      result += 1;
      return;
    }

    for (let index = 0; index < n; index++) {
      if ((1 << index) & used) continue;
      const num = nums[index];
      const isPreviousUsed = (1 << (index - 1)) & used;

      if (num === nums[index - 1] && !isPreviousUsed) continue;
      const sum = last + num;

      if (!Number.isInteger(Math.sqrt(sum))) continue;
      findSquarefulPrem(num, (1 << index) | used, length + 1);
    }
  };

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === nums[index - 1]) continue;
    findSquarefulPrem(num, 1 << index, 1);
  }
  return result;
};
