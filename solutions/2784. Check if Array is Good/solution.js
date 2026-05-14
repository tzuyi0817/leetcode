/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isGood = function (nums) {
  const n = nums.length;
  const counts = Array.from({ length: n }, () => 0);

  for (const num of nums) {
    if (num >= n) return false;

    counts[num] += 1;
  }

  for (let num = 1; num < n - 1; num++) {
    if (counts[num] > 1) return false;
  }

  return counts[n - 1] === 2;
};
