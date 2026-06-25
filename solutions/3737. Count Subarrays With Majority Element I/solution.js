/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const countMajoritySubarrays = function (nums, target) {
  const n = nums.length;
  let result = 0;

  for (let a = 0; a < n; a++) {
    let freq = 0;

    for (let b = a; b < n; b++) {
      const num = nums[b];
      const len = b - a + 1;

      if (num === target) {
        freq += 1;
      }

      if (freq > Math.floor(len / 2)) {
        result += 1;
      }
    }
  }

  return result;
};
