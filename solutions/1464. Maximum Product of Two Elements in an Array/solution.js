/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function (nums) {
  let max = 0;
  let second = 0;

  for (const num of nums) {
    if (num > max) {
      second = max;
      max = num;
    } else if (num > second) {
      second = num;
    }
  }

  return (max - 1) * (second - 1);
};
