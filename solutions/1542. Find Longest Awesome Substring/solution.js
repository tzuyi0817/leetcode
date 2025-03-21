/**
 * @param {string} s
 * @return {number}
 */
const longestAwesome = function (s) {
  const n = s.length;
  const prefixIndex = Array.from({ length: 1 << 10 }, () => n);
  let bitmask = 0;
  let result = 0;

  prefixIndex[0] = -1;

  for (let index = 0; index < n; index++) {
    bitmask ^= 1 << Number(s[index]);

    result = Math.max(index - prefixIndex[bitmask], result);

    for (let num = 0; num < 10; num++) {
      const prevIndex = prefixIndex[bitmask ^ (1 << num)];

      result = Math.max(index - prevIndex, result);
    }

    prefixIndex[bitmask] = Math.min(index, prefixIndex[bitmask]);
  }

  return result;
};
