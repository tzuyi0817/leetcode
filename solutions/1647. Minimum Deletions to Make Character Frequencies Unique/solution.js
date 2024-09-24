/**
 * @param {string} s
 * @return {number}
 */
const minDeletions = function (s) {
  const charMap = {};

  for (const char of s) {
    charMap[char] = (charMap[char] ?? 0) + 1;
  }
  const frequencies = Object.values(charMap);

  frequencies.sort((a, b) => b - a);

  return frequencies.reduce((result, frequency, index) => {
    if (index === 0) return result;
    const diff = frequencies[index - 1] - frequency;

    if (diff <= 0) {
      const deletion = frequencies[index - 1] === 0 ? frequency : 1 - diff;

      frequencies[index] -= deletion;
      return result + deletion;
    }
    return result;
  }, 0);
};
