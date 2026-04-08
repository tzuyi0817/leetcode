/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const xorAfterQueries = function (nums, queries) {
  const MODULO = 10 ** 9 + 7;

  for (const [l, r, k, v] of queries) {
    for (let index = l; index <= r; index += k) {
      nums[index] = (nums[index] * v) % MODULO;
    }
  }

  return nums.reduce((result, num) => result ^ num);
};
