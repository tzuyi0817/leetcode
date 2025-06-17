/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const MODULO = BigInt(10 ** 9 + 7);
const MAX = 10 ** 5;
const fact = new Array(MAX).fill(1n);
const invFact = new Array(MAX).fill(1n);

function modPow(base, exponent) {
  let result = 1n;

  base = BigInt(base);
  exponent = BigInt(exponent);

  while (exponent > 0n) {
    if (exponent % 2n) {
      result = (result * base) % MODULO;
    }

    base = (base * base) % MODULO;
    exponent /= 2n;
  }

  return result;
}

for (let index = 1; index < MAX; index++) {
  fact[index] = (fact[index - 1] * BigInt(index)) % MODULO;
}

invFact[MAX - 1] = modPow(fact[MAX - 1], MODULO - 2n);

for (let index = MAX - 2; index >= 0; index--) {
  invFact[index] = (invFact[index + 1] * BigInt(index + 1)) % MODULO;
}

const countGoodArrays = function (n, m, k) {
  const total = (BigInt(m) * modPow(m - 1, n - k - 1)) % MODULO;

  const nCk = (n, k) => {
    if (k < 0 || k > n) return 0n;

    return (((fact[n] * invFact[k]) % MODULO) * invFact[n - k]) % MODULO;
  };

  return Number((total * nCk(n - 1, k)) % MODULO);
};
