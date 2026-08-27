/**
 * @param {number[]} startPos
 * @param {number[]} homePos
 * @param {number[]} rowCosts
 * @param {number[]} colCosts
 * @return {number}
 */
const minCost = function (startPos, homePos, rowCosts, colCosts) {
  const [homeRow, homeCol] = homePos;
  let [row, col] = startPos;
  let result = 0;

  while (row !== homeRow) {
    result += rowCosts[row > homeRow ? --row : ++row];
  }
  while (col !== homeCol) {
    result += colCosts[col > homeCol ? --col : ++col];
  }
  return result;
};
