/**
 * @param {number[][]} grid
 * @return {number}
 */
var matrixScore = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    for (let row = 0; row < m; row++) {
        if (grid[row][0] === 1) continue;
        
        for (let col = 0; col < n; col++) {
            grid[row][col] = grid[row][col] ? 0 : 1;
        }
    }
    for (let col = 1; col < n; col++) {
        let count = 0;

        for (let row = 0; row < m; row++) {
            if (grid[row][col]) count += 1;
        }
        if (count >= m / 2) continue;
        for (let row = 0; row < m; row++) {
            grid[row][col] = grid[row][col] ? 0 : 1;
        }
    }
    return grid.reduce((result, row) => {
        return result + parseInt(row.join(''), 2);
    }, 0);
};