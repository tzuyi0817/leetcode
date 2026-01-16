/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
const maximizeSquareArea = function (m, n, hFences, vFences) {
  hFences.sort((a, b) => a - b);
  vFences.sort((a, b) => a - b);

  const MODULO = BigInt(10 ** 9 + 7);
  const rowFences = [1, ...hFences, m];
  const colFences = [1, ...vFences, n];
  const rowWidthSet = new Set();
  let maxWidth = 0;

  for (let a = 0; a < rowFences.length; a++) {
    for (let b = a + 1; b < rowFences.length; b++) {
      const width = rowFences[b] - rowFences[a];

      rowWidthSet.add(width);
    }
  }

  for (let a = 0; a < colFences.length; a++) {
    for (let b = a + 1; b < colFences.length; b++) {
      const width = colFences[b] - colFences[a];

      if (rowWidthSet.has(width)) {
        maxWidth = Math.max(width, maxWidth);
      }
    }
  }

  if (maxWidth === 0) return -1;

  const area = BigInt(maxWidth) ** 2n;

  return Number(area % MODULO);
};
