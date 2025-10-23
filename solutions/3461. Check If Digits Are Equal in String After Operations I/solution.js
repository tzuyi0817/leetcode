/**
 * @param {string} s
 * @return {boolean}
 */
const hasSameDigits = function (s) {
  const n = s.length;
  const MODULO = 10n;
  // 二項係數 (C(n, k) = C(n, k−1) × (n − k + 1) / k)
  const binomialCoeff = Array.from({ length: n - 1 }, () => 1n);
  let left = 0n;
  let right = 0n;

  for (let index = 1; index < n - 1; index++) {
    const coeff = BigInt(n - 2 - index + 1);
    const value = (binomialCoeff[index - 1] * coeff) / BigInt(index);

    binomialCoeff[index] = value;
  }

  for (let index = 0; index < n - 1; index++) {
    left += BigInt(s[index]) * binomialCoeff[index];
    left %= MODULO;
  }

  for (let index = 0; index < n - 1; index++) {
    right += BigInt(s[index + 1]) * binomialCoeff[index];
    right %= MODULO;
  }

  return left === right;
};
