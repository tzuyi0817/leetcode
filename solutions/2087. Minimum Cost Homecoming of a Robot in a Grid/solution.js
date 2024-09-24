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
    result += row > homeRow ? rowCosts[--row] : rowCosts[++row];
  }
  while (col !== homeCol) {
    result += col > homeCol ? colCosts[--col] : colCosts[++col];
  }
  return result;
};
