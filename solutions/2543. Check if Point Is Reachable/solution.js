/**
 * @param {number} targetX
 * @param {number} targetY
 * @return {boolean}
 */
const isReachable = function (targetX, targetY) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  let value = gcd(targetX, targetY);

  while (value % 2 === 0) {
    value /= 2;
  }

  return value === 1;
};
