/**
 * @param {number[]} candidates
 * @return {number}
 */
const largestCombination = function (candidates) {
  const bits = Array.from({ length: 32 }, () => 0);

  for (const candidate of candidates) {
    let index = 0;
    let current = candidate;

    while (current) {
      bits[index] += current & 1;
      current >>= 1;
      index += 1;
    }
  }
  return Math.max(...bits);
};
