/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let result = 0;

    const isMagicSquare = (row, col) => {
        const upperLeft = grid[row - 1][col - 1];
        const upper = grid[row - 1][col];
        const upperRight = grid[row - 1][col + 1];
        const left = grid[row][col - 1];
        const current = grid[row][col];
        const right = grid[row][col + 1];
        const lowerLeft = grid[row + 1][col - 1];
        const lower = grid[row + 1][col];
        const lowerRight = grid[row + 1][col + 1];
        const nums = new Set([upperLeft, upper, upperRight, left, current, right, lowerLeft, lower, lowerRight]);

        if (nums.size !== 9) return false;
        
        for (const num of nums) {
            if (num > 9 || num < 1) return false;
        }
        if (upperLeft + upper + upperRight !== 15) return false;
        if (lowerLeft + lower + lowerRight !== 15) return false;
        if (upperLeft + left + lowerLeft !== 15) return false;
        if (upper + current + lower !== 15) return false;
        if (upperRight + right + lowerRight !== 15) return false;
        if (upperLeft + current + lowerRight !== 15) return false;
        if (upperRight + current + lowerLeft !== 15) return false;
        return true;
    };

    for (let row = 1; row < n - 1; row++) {
        for (let col = 1; col < m - 1; col++) {
            if (grid[row][col] !== 5) continue;
            if (isMagicSquare(row, col)) result += 1;
        }
    }
    return result;
};