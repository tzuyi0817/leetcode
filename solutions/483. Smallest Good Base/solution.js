/**
 * @param {string} n
 * @return {string}
 */
const smallestGoodBase = function (n) {
  const num = BigInt(n);
  const maxLogarithm = Math.floor(Math.log2(n));

  for (let logarithm = maxLogarithm; logarithm >= 2; logarithm--) {
    const base = BigInt(Math.floor(Math.pow(n, 1 / logarithm)));
    let current = (sum = BigInt(1));

    for (let index = 0; index < logarithm; index++) {
      current *= base;
      sum += current;
    }
    if (sum === num) return `${base}`;
  }
  return `${num - 1n}`;
};
