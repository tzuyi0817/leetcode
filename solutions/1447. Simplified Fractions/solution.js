/**
 * @param {number} n
 * @return {string[]}
 */
const simplifiedFractions = function (n) {
  const result = [];
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (let denominator = 2; denominator <= n; denominator++) {
    for (let molecular = 1; molecular < denominator; molecular++) {
      if (gcd(denominator, molecular) > 1) continue;
      result.push(`${molecular}/${denominator}`);
    }
  }
  return result;
};
