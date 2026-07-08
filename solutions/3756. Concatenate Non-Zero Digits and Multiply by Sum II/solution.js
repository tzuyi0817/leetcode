/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
const sumAndMultiply = function (s, queries) {
  const n = s.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const power10 = Array.from({ length: n + 1 }, () => 1n);
  const prefixInteger = Array.from({ length: n + 1 }, () => 0n);
  const prefixSum = Array.from({ length: n + 1 }, () => 0n);

  for (let index = 1; index <= n; index++) {
    const digit = BigInt(s[index - 1]);
    const power = digit ? 10n : 1n;

    power10[index] = (power10[index - 1] * power) % MODULO;
    prefixInteger[index] = (prefixInteger[index - 1] * power + digit) % MODULO;
    prefixSum[index] = (prefixSum[index - 1] + digit) % MODULO;
  }

  return queries.map(([l, r]) => {
    const inv = modPow(power10[l], MODULO - 2n, MODULO);
    const power = (power10[r + 1] * inv) % MODULO;
    const prevInteger = (prefixInteger[l] * power) % MODULO;
    const integer = (prefixInteger[r + 1] - prevInteger + MODULO) % MODULO;
    const sum = prefixSum[r + 1] - prefixSum[l];

    return Number((integer * sum) % MODULO);
  });
};

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
