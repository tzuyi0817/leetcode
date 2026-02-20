/**
 * @param {string} s
 * @return {number}
 */
const countAnagrams = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const MODULO = BigInt(10 ** 9 + 7);
  const words = s.split(' ');
  let maxSubLen = 0;
  let result = 1n;

  for (const word of words) {
    maxSubLen = Math.max(word.length, maxSubLen);
  }

  const factors = Array.from({ length: maxSubLen + 1 }, () => 1n);
  const inv = Array.from({ length: maxSubLen + 1 }, () => 1n);
  const invFactors = Array.from({ length: maxSubLen + 1 }, () => 1n);

  for (let num = 2; num <= maxSubLen; num++) {
    const value = BigInt(num);
    const multiple = MODULO / value;
    const remainder = Number(MODULO % value);

    inv[num] = (MODULO - ((multiple * inv[remainder]) % MODULO)) % MODULO;
  }

  for (let num = 2; num <= maxSubLen; num++) {
    const value = BigInt(num);

    factors[num] = (factors[num - 1] * value) % MODULO;
    invFactors[num] = (invFactors[num - 1] * inv[num]) % MODULO;
  }

  for (const word of words) {
    const n = word.length;
    const counts = new Array(26).fill(0);
    let total = factors[n];

    for (const char of word) {
      const code = char.charCodeAt(0) - BASE_CODE;

      counts[code] += 1;
    }

    for (let code = 0; code < 26; code++) {
      const count = counts[code];

      if (count <= 1) continue;

      total = (total * invFactors[count]) % MODULO;
    }

    result = (result * total) % MODULO;
  }

  return Number(result);
};
