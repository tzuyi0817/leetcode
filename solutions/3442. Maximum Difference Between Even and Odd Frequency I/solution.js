/**
 * @param {string} s
 * @return {number}
 */
const maxDifference = function (s) {
  const countMap = new Map();
  let maxOddFrequency = Number.MIN_SAFE_INTEGER;
  let minEvenFrequency = Number.MAX_SAFE_INTEGER;

  for (const letter of s) {
    const count = countMap.get(letter) ?? 0;

    countMap.set(letter, count + 1);
  }

  for (const count of countMap.values()) {
    if (count % 2) {
      maxOddFrequency = Math.max(count, maxOddFrequency);
    } else {
      minEvenFrequency = Math.min(count, minEvenFrequency);
    }
  }

  return maxOddFrequency - minEvenFrequency;
};
