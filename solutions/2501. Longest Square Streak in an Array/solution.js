/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSquareStreak = function (nums) {
  const memo = new Map();
  let result = 0;

  nums.sort((a, b) => a - b);

  for (const num of nums) {
    const sqrt = Math.sqrt(num);
    const length = memo.has(sqrt) ? memo.get(sqrt) + 1 : 1;

    memo.set(num, length);
    result = Math.max(length, result);
  }
  return result > 1 ? result : -1;
};
