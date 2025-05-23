/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumValueSum = function (nums, k) {
  let sum = 0;
  let changedCount = 0;
  let minChangeDiff = Number.MAX_SAFE_INTEGER;

  for (const num of nums) {
    const xor = num ^ k;

    sum += Math.max(num, xor);
    changedCount += xor > num ? 1 : 0;
    minChangeDiff = Math.min(Math.abs(num - xor), minChangeDiff);
  }

  return changedCount % 2 ? sum - minChangeDiff : sum;
};
