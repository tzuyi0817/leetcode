/**
 * @param {number[]} candidates
 * @return {number}
 */
const largestCombination = function (candidates) {
  const bits = Array.from({ length: 32 }, () => 0);

  for (let candidate of candidates) {
    let index = 0;

    while (candidate) {
      bits[index] += candidate & 1;
      candidate >>= 1;
      index += 1;
    }
  }
  return Math.max(...bits);
};
