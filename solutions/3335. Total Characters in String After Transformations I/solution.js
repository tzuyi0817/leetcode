/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
const lengthAfterTransformations = function (s, t) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const memo = new Map();
  let result = 0n;

  const getTransformCharSize = code => {
    if (code < 26) return 1n;
    if (memo.has(code)) return memo.get(code);
    const nextT = code - 26;
    const a = getTransformCharSize(0 + nextT);
    const b = getTransformCharSize(1 + nextT);
    const total = (a + b) % MODULO;

    memo.set(code, total);

    return total;
  };

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;
    const length = getTransformCharSize(code + t);

    result = (result + length) % MODULO;
  }

  return Number(result);
};
