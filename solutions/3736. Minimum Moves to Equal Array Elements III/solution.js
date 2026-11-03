/**
 * @param {number[]} nums
 * @return {number}
 */
const minMoves = function (nums) {
  const maxNum = Math.max(...nums);

  return nums.reduce((result, num) => {
    return result + maxNum - num;
  }, 0);
};
