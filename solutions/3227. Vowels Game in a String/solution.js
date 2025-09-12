/**
 * @param {string} s
 * @return {boolean}
 */
const doesAliceWin = function (s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

  for (const char of s) {
    if (vowels.has(char)) return true;
  }

  return false;
};
