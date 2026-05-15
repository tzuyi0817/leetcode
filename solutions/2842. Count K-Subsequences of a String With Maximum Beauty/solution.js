/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const countKSubsequencesWithMaxBeauty = function (s, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const charMap = new Map();

  for (const char of s) {
    const count = charMap.get(char) ?? 0;

    charMap.set(char, count + 1);
  }

  if (charMap.size < k) return 0;

  const countMap = new Map();

  for (const count of charMap.values()) {
    const numChars = countMap.get(count) ?? 0;

    countMap.set(count, numChars + 1);
  }

  const sortedFreqPairs = [...countMap.entries()].toSorted((a, b) => b[0] - a[0]);
  let result = 1n;

  for (const [freq, numChars] of sortedFreqPairs) {
    if (k >= numChars) {
      const count = modPow(BigInt(freq), BigInt(numChars), MODULO);

      result = (result * count) % MODULO;
      k -= numChars;
    } else {
      const combinations = nCk(numChars, k, MODULO);
      const powers = modPow(BigInt(freq), BigInt(k), MODULO);

      result = (result * combinations) % MODULO;
      result = (result * powers) % MODULO;
      k = 0;
    }

    if (k === 0) return Number(result);
  }

  return 0;
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

function nCk(n, k, mod) {
  if (!n || n === k) return 1n;

  let numerator = 1n;
  let denominator = 1n;

  for (let index = 0; index < k; index++) {
    numerator = (numerator * BigInt(n - index)) % mod;
    denominator = (denominator * BigInt(index + 1)) % mod;
  }

  return (numerator * modPow(denominator, mod - 2n, mod)) % mod;
}
