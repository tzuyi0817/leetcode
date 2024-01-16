/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var rotateGrid = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const maxLayer = Math.min(m, n) / 2;

    for (let layer = 0; layer < maxLayer; layer++) {
        const rows = m - layer * 2;
        const cols = n - layer * 2;
        const cells = rows * 2 + cols * 2 - 4;
        const steps = k % cells;

        for (let step = 1; step <= steps; step++) {
            const start = grid[layer][layer];

            for (let col = 1; col < cols; col++) {
                grid[layer][layer + col - 1] = grid[layer][layer + col];
            }
            for (let row = 1; row < rows; row++) {
                grid[layer + row - 1][layer + cols - 1] = grid[layer + row][layer + cols - 1];
            }
            for (let col = cols - 1; col > 0; col--) {
                grid[layer + rows - 1][layer + col] = grid[layer + rows - 1][layer + col - 1];
            }
            for (let row = rows - 1; row > 0; row--) {
                grid[layer + row][layer] = grid[layer + row - 1][layer];
            }
            grid[layer + 1][layer] = start;
        }
    }
    return grid; 
};