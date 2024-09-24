/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSubsequence = function (nums, k) {
  const numsIndex = nums.map((num, index) => ({ num, index }));

  numsIndex.sort((a, b) => b.num - a.num);

  return numsIndex
    .slice(0, k)
    .sort((a, b) => a.index - b.index)
    .map(({ num }) => num);
};
