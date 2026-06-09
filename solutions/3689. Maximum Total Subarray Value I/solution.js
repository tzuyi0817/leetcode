/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxTotalValue = function (nums, k) {
  const maxNum = Math.max(...nums);
  const minNum = Math.min(...nums);

  return (maxNum - minNum) * k;
};
