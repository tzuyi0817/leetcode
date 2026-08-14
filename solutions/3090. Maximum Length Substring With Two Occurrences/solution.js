/**
 * @param {string} s
 * @return {number}
 */
const maximumLengthSubstring = function (s) {
  const n = s.length;
  const countMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = s[index];
    const count = countMap.get(char) ?? 0;

    countMap.set(char, count + 1);

    while (countMap.get(char) > 2) {
      const leftChar = s[left];
      const leftCount = countMap.get(leftChar);

      if (leftCount === 1) {
        countMap.delete(leftChar);
      } else {
        countMap.set(leftChar, leftCount - 1);
      }

      left += 1;
    }

    const len = index - left + 1;

    result = Math.max(len, result);
  }

  return result;
};
