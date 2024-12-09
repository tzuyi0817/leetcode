/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const isArraySpecial = function (nums, queries) {
  const n = nums.length;
  const specials = Array.from({ length: n }, () => 1);

  for (let index = 1; index < n; index++) {
    const isSpecial = nums[index] % 2 !== nums[index - 1] % 2;

    specials[index] = isSpecial ? specials[index - 1] + 1 : 1;
  }

  return queries.map(([from, to]) => {
    const length = to - from + 1;

    return length === specials[to] - specials[from] + 1;
  });
};
