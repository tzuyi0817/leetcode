/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const getLengthOfOptimalCompression = function (s, k) {
  const n = s.length;
  const memo = new Map();

  const getLength = count => 1 + (count > 1 ? `${count}`.length : 0);

  const getMinCompressLength = (index, remove, prevStr, count) => {
    if (index >= n) return count <= k - remove ? 0 : getLength(count);
    const key = `${index},${remove},${prevStr},${count}`;

    if (memo.has(key)) return memo.get(key);
    const str = s[index];
    const isConcatenation = str === prevStr;
    let result =
      !prevStr || isConcatenation
        ? getMinCompressLength(index + 1, remove, str, count + 1)
        : getLength(count) + getMinCompressLength(index + 1, remove, str, 1);

    if (remove < k) {
      const removeLength = getMinCompressLength(index + 1, remove + 1, prevStr, count);

      result = Math.min(removeLength, result);
    }

    memo.set(key, result);

    return result;
  };

  return getMinCompressLength(0, 0, '', 0);
};
