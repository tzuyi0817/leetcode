/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    return grid[0].map((_, index) => {
        let row = 0;
        let col = index;

        while (row < m) {
            const value = grid[row][col];
            const nextCol = col + value;

            if (nextCol < 0 || nextCol > n || grid[row][nextCol] !== value) return -1;
            row += 1;
            col = nextCol;
        }
        return col;
    });
};
