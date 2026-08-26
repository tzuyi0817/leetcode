/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumDifference = function (nums, k) {
  let prevSet = new Set();
  let result = Number.MAX_SAFE_INTEGER;

  for (const num of nums) {
    const nextSet = new Set([num]);

    for (const prev of prevSet) {
      nextSet.add(prev | num);
    }

    for (const value of nextSet) {
      const diff = Math.abs(k - value);

      result = Math.min(diff, result);
    }

    prevSet = nextSet;
  }

  return result;
};
