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

  for (const count of builtMap.values()) {
    const palindromeCount = count % 2 ? count - 1 : count;

    result += palindromeCount;
  }

  return result < s.length ? result + 1 : result;
};
