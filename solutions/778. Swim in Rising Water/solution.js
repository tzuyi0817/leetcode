/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
    const n = grid.length;
    let visited = [];

    const isReach = (row, col, elevation) => {
        const key = row * n + col;

        if (row < 0 || col < 0 || row >= n || col >= n) return false;
        if (visited[key] || grid[row][col] > elevation) return false;
        if (row === n - 1 && col === n - 1) return true;

        visited[key] = true;

        const up = isReach(row - 1, col, elevation);
        const down = isReach(row + 1, col, elevation);
        const left = isReach(row, col - 1, elevation);
        const right = isReach(row, col + 1, elevation);

        return up || down || left || right;
    };

    let left = 0;
    let right = n * n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        isReach(0, 0, mid) ? right = mid : left = mid + 1;
        visited = [];
    }
    return left;
};