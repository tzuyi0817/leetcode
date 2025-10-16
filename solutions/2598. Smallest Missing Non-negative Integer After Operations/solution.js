/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
const findSmallestInteger = function (nums, value) {
  const counts = Array.from({ length: value }, () => 0);
  let minCount = Number.MAX_SAFE_INTEGER;
  let result = Number.MAX_SAFE_INTEGER;

  for (const num of nums) {
    const mod = ((num % value) + value) % value;

    counts[mod] += 1;
  }

  for (let num = 0; num < value; num++) {
    minCount = Math.min(counts[num], minCount);
    result = Math.min(num + value * minCount, result);
  }

  return result;
};
