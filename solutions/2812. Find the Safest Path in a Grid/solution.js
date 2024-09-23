/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function(grid) {
    const n = grid.length;
    const distances = Array(n).fill('').map(_ => Array(n).fill(Number.MAX_SAFE_INTEGER));
    const safeness = Array(n).fill('').map(_ => Array(n).fill(0));
    const moves = [[0, 1], [0 , -1], [1, 0], [-1, 0]];
    const isOutOfBounds = (row, col) => row >= n || col >= n || row < 0 || col < 0;
    let queue = [];

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (!grid[row][col]) continue;
            distances[row][col] = 0;
            queue.push({ row, col });
        }
    }
    while (queue.length) {
        const nextQueue = [];

        for (const { row, col } of queue) {
            const distance = distances[row][col];

            for (const [moveRow, moveCol] of moves) {
                const nextRow = row + moveRow;
                const nextCol = col + moveCol;

                if (isOutOfBounds(nextRow, nextCol)) continue;
                if (distances[nextRow][nextCol] !== Number.MAX_SAFE_INTEGER) continue;
                distances[nextRow][nextCol] = distance + 1;
                nextQueue.push({ row: nextRow, col: nextCol });
            }
        }
        queue = nextQueue;
    }
    safeness[0][0] = distances[0][0];
    queue.push({ row: 0, col: 0 });

    while (queue.length) {
        const nextQueue = [];

        for (const { row, col } of queue) {
            for (const [moveRow, moveCol] of moves) {
                const nextRow = row + moveRow;
                const nextCol = col + moveCol;

                if (isOutOfBounds(nextRow, nextCol)) continue;
                const distance = Math.min(distances[nextRow][nextCol], safeness[row][col]);

                if (distance <= safeness[nextRow][nextCol]) continue;
                safeness[nextRow][nextCol] = distance;
                nextQueue.push({ row: nextRow, col: nextCol });
            }
        }
        queue = nextQueue
    }
    return safeness[n - 1][n - 1];
};