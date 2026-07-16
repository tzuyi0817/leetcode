/**
 * @param {number[]} nums
 * @return {number}
 */
const gcdSum = function (nums) {
  const n = nums.length;
  const half = Math.floor(n / 2);
  const prefixGcd = [];
  let maxNum = 0;
  let result = 0;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (const num of nums) {
    maxNum = Math.max(num, maxNum);
    prefixGcd.push(gcd(num, maxNum));
  }

  prefixGcd.sort((a, b) => a - b);

  for (let index = 0; index < half; index++) {
    const a = prefixGcd[index];
    const b = prefixGcd[n - index - 1];

    result += gcd(a, b);
  }

  return result;
};
