/**
 * @param {number[][]} grid
 * @return {number}
 */
var gridGame = function(grid) {
    const n = grid[0].length;
    let prefixTopSum = grid[0].reduce((sum, point) => sum + point);
    let prefixBottomSum = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let col = 0; col < n; col++) {
        prefixTopSum -= grid[0][col];
        const maxCollectPoint = Math.max(prefixTopSum, prefixBottomSum);

        result = Math.min(result, maxCollectPoint);
        prefixBottomSum += grid[1][col];
    }
    return result;
};