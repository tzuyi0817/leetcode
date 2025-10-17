/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxPartitionsAfterOperations = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const memo = new Map();

  function getPartitions(index, isChange, mask, bit) {
    const nextMask = mask | bit;

    if (popcount(nextMask) > k) {
      return 1 + getMaxPartitions(index + 1, isChange, bit);
    }

    return getMaxPartitions(index + 1, isChange, nextMask);
  }

  function getMaxPartitions(index, isChange, mask) {
    if (index >= n) return 0;

    const key = `${index},${((isChange ? 1 : 0) << 26) | mask}`;

    if (memo.has(key)) return memo.get(key);

    const bit = 1 << (s[index].charCodeAt(0) - BASE_CODE);
    let result = getPartitions(index, isChange, mask, bit);

    if (!isChange) {
      for (let code = 0; code < 26; code++) {
        const partitions = getPartitions(index, true, mask, 1 << code);

        result = Math.max(partitions, result);
      }
    }

    memo.set(key, result);

    return result;
  }

  return getMaxPartitions(0, false, 0) + 1;
};

function popcount(x) {
  let count = 0;

  while (x) {
    x &= x - 1;
    count += 1;
  }

  return count;
}
