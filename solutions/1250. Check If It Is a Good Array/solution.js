/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isGoodArray = function (nums) {
  let result = nums[0];

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (const num of nums) {
    result = gcd(result, num);
  }
  return result === 1;
};
