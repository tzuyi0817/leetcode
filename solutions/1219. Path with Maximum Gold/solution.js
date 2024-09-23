/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const collectGold = (row, col) => {
        if (row < 0 || col < 0 || row >= m || col >= n) return 0;
        const gold = grid[row][col];

        if (!gold) return 0;
        grid[row][col] = 0;
        const left = collectGold(row, col - 1);
        const right = collectGold(row, col + 1);
        const up = collectGold(row - 1, col);
        const down = collectGold(row + 1, col);

        grid[row][col] = gold;
        return gold + Math.max(left, right, up, down);
    };
    let result = 0;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const gold = grid[row][col];

            if (!gold) continue;
            const total = collectGold(row, col);

            result = Math.max(total, result);
        }
    }
    return result;
};