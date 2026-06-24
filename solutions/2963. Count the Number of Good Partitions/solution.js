/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfGoodPartitions = function (nums) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const lastMap = new Map();
  let maxRight = 0;
  let result = 1;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    lastMap.set(num, index);
  }

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (index > maxRight) {
      result = (result * 2) % MODULO;
    }

    maxRight = Math.max(lastMap.get(num), maxRight);
  }

  return result;
};
