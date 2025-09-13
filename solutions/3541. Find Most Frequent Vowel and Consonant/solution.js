/**
 * @param {string} s
 * @return {number}
 */
const maxFreqSum = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let maxVowel = 0;
  let maxConsonant = 0;

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;

    if (vowels.has(char)) {
      maxVowel = Math.max(counts[code], maxVowel);
    } else {
      maxConsonant = Math.max(counts[code], maxConsonant);
    }
  }

  return maxVowel + maxConsonant;
};
