/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAlternatingSum = function (nums) {
  let odd = (even = 0);

  for (const num of nums) {
    even = Math.max(odd + num, even);
    odd = even - num;
  }
  return even;
};
