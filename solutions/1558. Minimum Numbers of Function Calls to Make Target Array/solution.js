/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  let maxDouble = 0;
  let result = 0;

  for (const num of nums) {
    let double = 0;
    let currentNum = num;

    while (currentNum) {
      if (currentNum % 2) {
        currentNum -= 1;
        result += 1;
      } else {
        currentNum /= 2;
        double += 1;
      }
    }
    maxDouble = Math.max(maxDouble, double);
  }
  return result + maxDouble;
};
