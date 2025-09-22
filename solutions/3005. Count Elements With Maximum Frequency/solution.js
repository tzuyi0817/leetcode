/**
 * @param {number[]} nums
 * @return {number}
 */
const maxFrequencyElements = function (nums) {
  const numMap = new Map();
  let maxFreq = 0;
  let result = 0;

  for (const num of nums) {
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
    maxFreq = Math.max(count + 1, maxFreq);
  }

  for (const count of numMap.values()) {
    if (count === maxFreq) {
      result += count;
    }
  }

  return result;
};
