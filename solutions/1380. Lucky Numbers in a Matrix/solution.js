/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers  = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const findMinCol = (row) => {
        let col = 0;

        for (let index = 1; index < n; index++) {
            if (row[index] >= row[col]) continue;
            col = index;
        }
        return col;
    };

    const findMaxColValue = (col) => {
        let result = 0;

        for (let index = 0; index < m; index++) {
            result = Math.max(matrix[index][col], result);
        }
        return result;
    };

    for (let row = 0; row < m; row++) {
        const col = findMinCol(matrix[row]);
        const current = matrix[row][col];
        const maxValue = findMaxColValue(col);

        if (current === maxValue) return [current];
    }
    return [];
};