/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  let maxDouble = 0;
  let result = 0;

  for (let num of nums) {
    let double = 0;

    while (num) {
      if (num % 2) {
        num -= 1;
        result += 1;
      } else {
        num /= 2;
        double += 1;
      }
    }
    maxDouble = Math.max(maxDouble, double);
  }
  return result + maxDouble;
};
