/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
const minNumberOfFrogs = function (croakOfFrogs) {
  const croakMap = new Map();
  const indexMap = { c: 0, r: 1, o: 2, a: 3, k: 4 };
  const croak = ['c', 'r', 'o', 'a', 'k'];
  let result = 0;
  let frog = 0;

  for (const char of croakOfFrogs) {
    const count = croakMap.get(char) ?? 0;

    char === 'k' ? (frog -= 1) : croakMap.set(char, count + 1);
    if (char === 'c') {
      frog += 1;
      result = Math.max(frog, result);
      continue;
    }
    const index = indexMap[char];
    const preChar = croak[index - 1];
    const preCharCount = croakMap.get(preChar) ?? 0;

    if (preCharCount < 1) return -1;
    croakMap.set(preChar, preCharCount - 1);
  }
  return frog ? -1 : result;
};
