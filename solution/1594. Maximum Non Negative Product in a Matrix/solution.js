/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxProductPath = function(grid) {
    const MODULO = 10 ** 9 + 7;
    const m = grid.length;
    const n = grid[0].length;
    const dpMax = Array(m).fill('').map(_ => Array(n).fill(0));
    const dpMin = Array(m).fill('').map(_ => Array(n).fill(0));

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const value = grid[row][col];
            const maxUpValue = dpMax[row - 1]?.[col] * value;
            const maxLeftValue = dpMax[row][col - 1] * value;
            const minUpValue = dpMin[row - 1]?.[col] * value;
            const minLeftValue = dpMin[row][col - 1] * value;

            if (row === 0 && col === 0) {
                dpMax[row][col] = dpMin[row][col] = grid[0][0];
            } else if (row === 0) {
                dpMax[row][col] = Math.max(maxLeftValue, minLeftValue);
                dpMin[row][col] = Math.min(maxLeftValue, minLeftValue);
            } else if (col === 0) {
                dpMax[row][col] = Math.max(maxUpValue, minUpValue);
                dpMin[row][col] = Math.min(maxUpValue, minUpValue);
            } else {
                const maxUp = Math.max(maxUpValue, minUpValue);
                const maxLeft = Math.max(maxLeftValue, minLeftValue);
                const minUp = Math.min(maxUpValue, minUpValue);
                const minLeft = Math.min(maxLeftValue, minLeftValue);

                dpMax[row][col] = Math.max(maxUp, maxLeft);
                dpMin[row][col] = Math.min(minUp, minLeft);
            }
        }
    }
    return dpMax[m - 1][n - 1] < 0 ? - 1 : dpMax[m - 1][n - 1] % MODULO;
};
