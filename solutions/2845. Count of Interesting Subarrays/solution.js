/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
const countInterestingSubarrays = function (nums, modulo, k) {
  const countMap = new Map();
  let cnt = 0;
  let result = 0;

  countMap.set(0, 1);

  for (const num of nums) {
    if (num % modulo === k) {
      cnt = (cnt + 1) % modulo;
    }
    const prefix = (cnt - k + modulo) % modulo;

    result += countMap.get(prefix) ?? 0;
    countMap.set(cnt, (countMap.get(cnt) ?? 0) + 1);
  }

  return result;
};
