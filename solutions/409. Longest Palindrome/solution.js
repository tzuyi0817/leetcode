/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = function (s) {
  const builtMap = new Map();
  let result = 0;

  for (const char of s) {
    const count = builtMap.get(char) ?? 0;

    builtMap.set(char, count + 1);
  }
  for (let count of builtMap.values()) {
    const isOdd = count % 2;

    if (isOdd) count -= 1;
    result += count;
  }
  return result < s.length ? result + 1 : result;
};
