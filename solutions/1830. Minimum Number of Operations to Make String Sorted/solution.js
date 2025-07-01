/**
 * @param {string} s
 * @return {number}
 */
const makeStringSorted = function (s) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const fact = Array.from({ length: n + 1 }, () => 1n);
  const inv = Array.from({ length: n + 1 }, () => 1n);
  const invFact = Array.from({ length: n + 1 }, () => 1n);
  const counts = Array.from({ length: 26 }, () => 0n);
  let result = 0n;

  for (let count = 1; count <= n; count++) {
    const bigCount = BigInt(count);

    if (count > 1) {
      const multiple = MODULO / bigCount;
      const remainder = MODULO % bigCount;

      inv[count] = MODULO - ((multiple * inv[Number(remainder)]) % MODULO);
    }

    fact[count] = (fact[count - 1] * bigCount) % MODULO;
    invFact[count] = (invFact[count - 1] * inv[count]) % MODULO;
  }

  const getSmallerCharCount = targetCode => {
    let count = 0n;

    for (let code = 0; code < targetCode; code++) {
      count += counts[code];
    }

    return count;
  };

  for (let index = n - 1; index >= 0; index--) {
    const currentCode = s[index].charCodeAt(0) - BASE_CODE;

    counts[currentCode] += 1n;

    const charCount = getSmallerCharCount(currentCode);
    let totalCount = (charCount * fact[n - 1 - index]) % MODULO;

    for (let code = 0; code < 26; code++) {
      totalCount = (totalCount * invFact[counts[code]]) % MODULO;
    }

    result = (result + totalCount) % MODULO;
  }

  return Number(result);
};
