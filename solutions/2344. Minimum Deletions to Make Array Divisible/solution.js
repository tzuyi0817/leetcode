/**
 * @param {number[]} nums
 * @param {number[]} numsDivide
 * @return {number}
 */
const minOperations = function (nums, numsDivide) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const divideGcd = numsDivide.reduce((result, num) => {
    return gcd(num, result);
  });

  const n = nums.length;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (divideGcd % num === 0) {
      return index;
    }
  }

  return -1;
};
