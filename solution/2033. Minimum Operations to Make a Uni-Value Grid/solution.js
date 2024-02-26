/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    const m = grid.length;
    const n = grid[0].length;
    const values = [];
    const remainder = grid[0][0] % x;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const value = grid[row][col]; 

            if (value % x !== remainder) return -1;
            values.push(value);
        }
    }
    values.sort((a, b) => a - b);
    const middle = values[Math.floor(m * n / 2)];

    return values.reduce((result, value) => {
        return result + Math.abs(value - middle) / x;
    }, 0);
};