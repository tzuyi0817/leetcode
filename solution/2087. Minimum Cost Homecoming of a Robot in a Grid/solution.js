/**
 * @param {number[]} startPos
 * @param {number[]} homePos
 * @param {number[]} rowCosts
 * @param {number[]} colCosts
 * @return {number}
 */
var minCost = function(startPos, homePos, rowCosts, colCosts) {
    const m = rowCosts.length;
    const n = colCosts.length;
    const [homeRow, homeCol] = homePos;
    let [startRow, startCol] = startPos;
    let result = 0;

    while (startRow !== homeRow) {
        result += startRow > homeRow ? rowCosts[--startRow] : rowCosts[++startRow];
    }
    while (startCol !== homeCol) {
        result += startCol > homeCol ? colCosts[--startCol] : colCosts[++startCol];
    }
    return result;
};