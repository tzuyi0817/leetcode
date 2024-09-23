/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = matrix.map(row => row.map(value => value));
    let result = 0;

    for (let row = 1; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (!dp[row][col]) continue;
            dp[row][col] += dp[row - 1][col];
        }
    }
    for (let row = 0; row < m; row++) {
        dp[row].sort((a, b) => b - a);

        for (let col = 0; col < n; col++) {
            if (!dp[row][col]) break;
            result = Math.max(dp[row][col] * (col + 1), result);
        }
    }
    return result;
};
