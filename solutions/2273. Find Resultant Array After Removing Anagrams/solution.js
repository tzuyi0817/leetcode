/**
 * @param {string[]} words
 * @return {string[]}
 */
const removeAnagrams = function (words) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = words.length;
  const result = [words[0]];

  const getCounts = word => {
    const counts = new Array(26).fill(0);

    for (const char of word) {
      const code = char.charCodeAt(0) - BASE_CODE;

      counts[code] += 1;
    }

    return counts;
  };

  const isAnagram = (a, b) => a.every((count, index) => count === b[index]);

  let prevCounts = getCounts(words[0]);

  for (let index = 1; index < n; index++) {
    const word = words[index];
    const counts = getCounts(word);

    if (isAnagram(counts, prevCounts)) continue;

    result.push(word);
    prevCounts = counts;
  }

  return result;
};
