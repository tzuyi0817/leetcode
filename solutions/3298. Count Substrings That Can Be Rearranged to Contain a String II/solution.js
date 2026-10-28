/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const validSubstringCount = function (word1, word2) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = word1.length;
  const counts = Array.from({ length: 26 }, () => 0);
  const targetCounts = Array.from({ length: 26 }, () => 0);
  let uniqueCount = 0;
  let left = 0;
  let isValid = false;
  let result = 0;

  for (const char of word2) {
    const code = char.charCodeAt(0) - BASE_CODE;

    targetCounts[code] += 1;

    if (targetCounts[code] === 1) {
      uniqueCount += 1;
    }
  }

  for (let index = 0; index < n; index++) {
    const char = word1[index];
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;

    if (counts[code] === targetCounts[code]) {
      uniqueCount -= 1;
    }

    while (!uniqueCount) {
      const leftChar = word1[left];
      const leftCode = leftChar.charCodeAt(0) - BASE_CODE;

      counts[leftCode] -= 1;
      left += 1;
      isValid = true;

      if (targetCounts[leftCode] - counts[leftCode] === 1) {
        uniqueCount += 1;
      }
    }

    if (isValid) {
      result += left;
    }
  }

  return result;
};
