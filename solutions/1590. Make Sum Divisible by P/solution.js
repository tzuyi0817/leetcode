/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
const minSubarray = function (nums, p) {
  const sum = nums.reduce((result, num) => result + num);
  const remainder = sum % p;

  if (!remainder) return 0;
  const n = nums.length;
  const remainderMap = new Map();
  let currentRemainder = 0;
  let result = n;

  remainderMap.set(0, -1);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    currentRemainder = (currentRemainder + num) % p;
    const target = (currentRemainder - remainder + p) % p;

    if (remainderMap.has(target)) {
      result = Math.min(index - remainderMap.get(target), result);
    }
    remainderMap.set(currentRemainder, index);
  }
  return result === n ? -1 : result;
};
