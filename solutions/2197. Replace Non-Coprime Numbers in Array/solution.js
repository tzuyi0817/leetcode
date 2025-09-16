/**
 * @param {number[]} nums
 * @return {number[]}
 */
const replaceNonCoprimes = function (nums) {
  const result = [];

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

  for (const num of nums) {
    let current = num;

    while (result.length && gcd(result.at(-1), current) > 1) {
      const target = result.pop();

      current = lcm(target, current);
    }

    result.push(current);
  }

  return result;
};
