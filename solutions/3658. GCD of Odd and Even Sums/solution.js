/**
 * @param {number} n
 * @return {number}
 */
const gcdOfOddEvenSums = function (n) {
  const sumOdd = ((1 + (2 * n - 1)) * n) / 2;
  const sumEven = sumOdd + n;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  return gcd(sumOdd, sumEven);
};
