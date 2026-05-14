/**
 * @param {number[]} receiver
 * @param {number} k
 * @return {number}
 */
const getMaxFunctionValue = function (receiver, k) {
  const m = Math.ceil(Math.log2(k));
  const n = receiver.length;
  const jumps = Array.from({ length: m + 1 }, () => new Array(n).fill(0));
  const sums = Array.from({ length: m + 1 }, () => new Array(n).fill(0));
  let result = 0;

  for (let index = 0; index < n; index++) {
    const value = receiver[index];

    jumps[0][index] = value;
    sums[0][index] = value;
  }

  for (let binary = 1; binary <= m; binary++) {
    for (let index = 0; index < n; index++) {
      const prevPos = jumps[binary - 1][index];
      const prevSum = sums[binary - 1][prevPos];

      jumps[binary][index] = jumps[binary - 1][prevPos];
      sums[binary][index] = sums[binary - 1][index] + prevSum;
    }
  }

  for (let index = 0; index < n; index++) {
    let sum = index;
    let pos = index;
    let binary = 0;
    let binaryK = k;

    while (binaryK) {
      if (binaryK % 2 === 1) {
        sum += sums[binary][pos];
        pos = jumps[binary][pos];
      }

      binaryK = Math.floor(binaryK / 2);
      binary += 1;
    }

    result = Math.max(sum, result);
  }

  return result;
};
