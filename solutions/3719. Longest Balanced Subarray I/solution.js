/**
 * @param {number[]} nums
 * @return {number}
 */
const longestBalanced = function (nums) {
  const n = nums.length;
  let result = 0;

  for (let a = 0; a < n; a++) {
    const oddSet = new Set();
    const evenSet = new Set();

    for (let b = a; b < n; b++) {
      const num = nums[b];

      num % 2 ? oddSet.add(num) : evenSet.add(num);

      if (oddSet.size === evenSet.size) {
        const len = b - a + 1;

        result = Math.max(len, result);
      }
    }
  }

  return result;
};
