/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean}
 */
const isZeroArray = function (nums, queries) {
  const n = nums.length;
  const differences = Array.from({ length: n + 1 }, () => 0);

  for (const [l, r] of queries) {
    differences[l] -= 1;
    differences[r + 1] += 1;
  }

  for (let index = 1; index < n; index++) {
    differences[index] += differences[index - 1];
  }

  return nums.every((num, index) => num + differences[index] <= 0);
};
