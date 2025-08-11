/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
const productQueries = function (n, queries) {
  const MODULO = BigInt(10 ** 9 + 7);
  const powers = [];
  const bits = Math.ceil(Math.log2(n));

  for (let index = 0; index <= bits; index++) {
    if ((n >> index) & 1) {
      const power = BigInt(1 << index);

      powers.push(power);
    }
  }

  const len = powers.length;
  const prefixProd = Array.from({ length: len + 1 }, () => 1n);

  for (let index = 1; index <= len; index++) {
    prefixProd[index] = prefixProd[index - 1] * powers[index - 1];
  }

  return queries.map(([left, right]) => {
    const product = (prefixProd[right + 1] / prefixProd[left]) % MODULO;

    return Number(product);
  });
};
