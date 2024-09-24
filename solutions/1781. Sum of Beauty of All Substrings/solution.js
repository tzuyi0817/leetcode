/**
 * @param {string} s
 * @return {number}
 */
const beautySum = function (s) {
  const CODE_BASE = 'a'.charCodeAt(0);
  const size = s.length;
  const frequencies = Array(26).fill(0);
  let result = 0;

  for (let a = 0; a < size - 1; a++) {
    frequencies[s.charCodeAt(a) - CODE_BASE] += 1;

    for (let b = a + 1; b < size; b++) {
      let maxCount = 0;
      let minCount = Number.MAX_SAFE_INTEGER;

      frequencies[s.charCodeAt(b) - CODE_BASE] += 1;
      frequencies
        .filter(count => count !== 0)
        .forEach(count => {
          maxCount = Math.max(count, maxCount);
          minCount = Math.min(count, minCount);
        });
      result += maxCount - minCount;
    }
    frequencies.fill(0);
  }
  return result;
};
