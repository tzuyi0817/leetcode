/**
 * @param {string} binary
 * @return {number}
 */
const numberOfUniqueGoodSubsequences = function (binary) {
  const MODULO = BigInt(10 ** 9 + 7);
  let endsZero = 0n;
  let endsOne = 0n;

  for (const str of binary) {
    if (str === '0') {
      endsZero = (endsZero + endsOne) % MODULO;
    } else {
      endsOne = (endsZero + endsOne) % MODULO;
      endsOne += 1n;
    }
  }

  const count = Number((endsZero + endsOne) % MODULO);

  return binary.includes('0') ? 1 + count : count;
};
