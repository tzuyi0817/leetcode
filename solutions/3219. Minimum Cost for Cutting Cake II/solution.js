/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
const minimumCost = function (m, n, horizontalCut, verticalCut) {
  let cutRow = 0;
  let cutCol = 0;
  let result = 0;

  horizontalCut.sort((a, b) => b - a);
  verticalCut.sort((a, b) => b - a);

  for (let index = 0; index < m + n - 2; index++) {
    const cutRowCost = horizontalCut[cutRow] ?? 0;
    const cutColCost = verticalCut[cutCol] ?? 0;

    if (cutRowCost > cutColCost) {
      result += cutRowCost * (cutCol + 1);
      cutRow += 1;
    } else {
      result += cutColCost * (cutRow + 1);
      cutCol += 1;
    }
  }

  return result;
};
