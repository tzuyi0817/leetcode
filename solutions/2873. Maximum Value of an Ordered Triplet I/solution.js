/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumTripletValue = function (nums) {
  let maxNum = 0;
  let maxDiff = 0;
  let result = 0;

  for (const num of nums) {
    result = Math.max(maxDiff * num, result);
    maxDiff = Math.max(maxNum - num, maxDiff);
    maxNum = Math.max(num, maxNum);
  }

  return result;
};
