/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function(grid) {
    const n = grid.length;
    const dp = [...grid[0]]; 

    for (let row = 1; row < n; row++) {
        let first = second = Number.MAX_SAFE_INTEGER;
        let index = -1;

        for (let col = 0; col < n; col++) {
            if (dp[col] < first) {
                second = first;
                first = dp[col];
                index = col;
            } 
            else if (dp[col] < second) second = dp[col];
        }
        for (let col = 0; col < n; col++) {
            const value = grid[row][col];

            dp[col] = index === col ? value + second : value + first;
        }
    }
    return Math.min(...dp);
};