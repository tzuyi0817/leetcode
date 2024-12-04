/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
const tilingRectangle = function (n, m) {
  const memo = new Map();
  const heights = Array.from({ length: m }, () => 0);

  const getHeightsHash = () => {
    const BASE_HASH = 13;

    return heights.reduce((hash, height) => hash * BASE_HASH + height, 0);
  };

  const tilingRect = () => {
    const hash = getHeightsHash();

    if (memo.has(hash)) return memo.get(hash);
    const minHeight = Math.min(...heights);

    if (minHeight === n) return 0;
    const start = heights.indexOf(minHeight);
    let result = m * n;

    for (let length = 1; length <= Math.min(m - start, n - minHeight); length++) {
      if (heights.slice(start, start + length).some(height => height !== minHeight)) break;

      for (let index = start; index < start + length; index++) {
        heights[index] += length;
      }
      result = Math.min(tilingRect(), result);

      for (let index = start; index < start + length; index++) {
        heights[index] -= length;
      }
    }
    memo.set(hash, result + 1);
    return result + 1;
  };

  return tilingRect();
};
