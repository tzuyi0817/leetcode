/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    const m = heights.length;
    const n = heights[0].length;
    const visited = new Set();
    const isMiniEffort = (row, col, limit, preHeight) => {
        if (row >= m || col >= n || row < 0 | col < 0) return false;
        const position = `${row}_${col}`;
        const height = heights[row][col];

        if (visited.has(position)) return false;
        if (Math.abs(height - preHeight) > limit) return false;
        if (row === m - 1 && col === n - 1) return true;
        visited.add(position);
        return isMiniEffort(row - 1, col, limit, height) ||
        isMiniEffort(row + 1, col, limit, height) ||
        isMiniEffort(row, col - 1, limit, height) ||
        isMiniEffort(row, col + 1, limit, height);
    };
    let left = 0;
    let right = 10 ** 6;  

    while (left < right) {
        const mid =  Math.floor((left + right) / 2);

        visited.clear();
        isMiniEffort(0, 0, mid, heights[0][0]) 
            ? right = mid
            : left = mid + 1
    }
    return left;
};
