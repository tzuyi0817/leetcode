/**
 * @param {number[]} nums
 * @return {number}
 */
const countDifferentSubsequenceGCDs = function (nums) {
  const maxNum = Math.max(...nums);
  const factors = Array.from({ length: maxNum + 1 }, () => 0);
  let result = 0;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (const num of nums) {
    for (let a = 1; a ** 2 <= num; a++) {
      if (num % a) continue;
      const b = num / a;

      factors[a] = gcd(num, factors[a]);
      factors[b] = gcd(num, factors[b]);
    }
  }

  for (let num = 1; num <= maxNum; num++) {
    if (num === factors[num]) {
      result += 1;
    }
  }

  return result;
};
