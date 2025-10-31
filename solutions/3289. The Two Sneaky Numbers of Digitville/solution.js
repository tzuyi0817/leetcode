/**
 * @param {number[]} nums
 * @return {number[]}
 */
const getSneakyNumbers = function (nums) {
  const n = nums.length;
  const counts = Array.from({ length: n }, () => 0);
  const result = [];

  for (const num of nums) {
    counts[num] += 1;

    if (counts[num] === 2) {
      result.push(num);
    }

    if (result.length === 2) {
      return result;
    }
  }

  return result;
};
