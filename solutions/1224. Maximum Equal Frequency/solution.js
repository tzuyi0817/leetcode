/**
 * @param {number[]} nums
 * @return {number}
 */
const maxEqualFreq = function (nums) {
  const n = nums.length;
  const freqMap = new Map();
  const countMap = new Map();
  let maxCount = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    let count = countMap.get(num) ?? 0;

    if (count && freqMap.has(count)) {
      freqMap.set(count, freqMap.get(count) - 1);
    }
    count += 1;
    countMap.set(num, count);
    freqMap.set(count, (freqMap.get(count) ?? 0) + 1);
    maxCount = Math.max(maxCount, count);

    if (
      maxCount === 1 ||
      freqMap.get(maxCount) * maxCount === index ||
      (freqMap.get(maxCount - 1) + 1) * (maxCount - 1) === index
    ) {
      result = index + 1;
    }
  }
  return result;
};
