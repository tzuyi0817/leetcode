/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function(rows, cols, rStart, cStart) {
    const result = [[rStart, cStart]];
    let row = rStart;
    let col = cStart;
    let currentRows = 1;
    let currentCols = 1;
    let rounds = 0;

    while (result.length < rows * cols) {
        const step = rounds < 2 ? 1 : -1;
        const isRow = rounds % 2;
        const distance = isRow ? currentRows : currentCols;

        for (let index = 0; index < distance; index++) {
            isRow ? row += step : col += step;
            if (row >= rows || row < 0 || col >= cols || col < 0) continue;
            result.push([row, col]);
        }
        isRow ? currentRows += 1 : currentCols += 1;
        rounds = (rounds + 1) % 4;
    }
    return result;
};