/**
 * @param {number} primeFactors
 * @return {number}
 */
const maxNiceDivisors = function (primeFactors) {
  if (primeFactors <= 3) return primeFactors;
  const MODULO = BigInt(10 ** 9 + 7);

  const powMod = (base, exponent) => {
    let result = 1n;

    while (exponent) {
      if (exponent % 2n) {
        result = (result * base) % MODULO;
      }

      base = (base * base) % MODULO;
      exponent /= 2n;
    }

    return result;
  };

  const count = BigInt(Math.floor(primeFactors / 3));
  const remainder = primeFactors % 3;

  if (remainder === 0) return Number(powMod(3n, count));
  if (remainder === 1) {
    const result = powMod(3n, count - 1n);

    return Number((result * 4n) % MODULO);
  }

  return Number((powMod(3n, count) * 2n) % MODULO);
};
