/**
 * @param {number} p
 * @return {number}
 */
const minNonZeroProduct = function (p) {
  /**
   * 2 ** p - 1 -> 1 times
   * 2 ** p - 2 -> 2 ** (p - 1) - 1 times
   * 1 -> 2 ** (p - 1) - 1 times
   */
  const MODULO = BigInt(10 ** 9 + 7);
  const x = 2n ** BigInt(p) - 1n;
  const y = 2n ** BigInt(p) - 2n;
  const times = 2n ** BigInt(p - 1) - 1n;

  function pow(base, exponent) {
    let result = 1n;

    if (exponent === 0n) return result;
    result *= pow(base, exponent >> 1n);
    result *= result;
    if (exponent % 2n) result *= base;
    return result % MODULO;
  }
  return (x * pow(y, times)) % MODULO;
};
