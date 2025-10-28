/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countPairs = function (nums, k) {
  const gcdMap = new Map();
  let result = 0;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (const num of nums) {
    const gcdA = gcd(num, k);

    for (const [gcdB, count] of gcdMap) {
      if ((gcdA * gcdB) % k === 0) {
        result += count;
      }
    }

    const count = gcdMap.get(gcdA) ?? 0;

    gcdMap.set(gcdA, count + 1);
  }

  return result;
};
