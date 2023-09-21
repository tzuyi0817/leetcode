/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function(heights, bricks, ladders) {
    const diffs = heights.map((height, index) => {
        return Math.max((heights[index + 1] ?? 0) - height, 0);
    });
    
    let left = ladders;
    let right = heights.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const current = diffs.slice(0, mid);
        current.sort((a, b) => b - a);
        const sumDiff = current.slice(ladders).reduce((sum, diff) => sum + diff, 0);

        sumDiff > bricks ? right = mid - 1 : left = mid + 1;
    }
    return right;
};
