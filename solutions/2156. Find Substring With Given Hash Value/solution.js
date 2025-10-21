/**
 * @param {string} s
 * @param {number} power
 * @param {number} modulo
 * @param {number} k
 * @param {number} hashValue
 * @return {string}
 */
const subStrHash = function (s, power, modulo, k, hashValue) {
  const BASE_POWER = BigInt(power);
  const TARGET_HASH = BigInt(hashValue);
  const MOD = BigInt(modulo);
  const BASE_CODE = 'a'.charCodeAt(0) - 1;
  const n = s.length;
  let hash = 0n;
  let pow = 1n;
  let start = 0;

  for (let index = n - 1; index >= 0; index--) {
    const val = BigInt(s[index].charCodeAt(0) - BASE_CODE);

    hash = (hash * BASE_POWER + val) % MOD;

    if (index + k < n) {
      const removeVal = BigInt(s[index + k].charCodeAt(0) - BASE_CODE);

      hash = (((hash - removeVal * pow) % MOD) + MOD) % MOD;
    } else {
      pow = (pow * BASE_POWER) % MOD;
    }

    if (hash === TARGET_HASH) {
      start = index;
    }
  }

  return s.slice(start, start + k);
};
