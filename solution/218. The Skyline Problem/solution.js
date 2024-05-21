/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) {
    const result = [];
    const heights = [0];
    const builds = buildings.reduce((result, [left, right, height]) => {
        result.push({ point: left, height }, { point: right, height: -height });
        return result;
    }, []);
    let previousHeight = -1;

    builds.sort((a, b) => a.point - b.point || b.height - a.height);

    const findHeight = (height) => {
        let left = 0;
        let right = heights.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            heights[mid] >= height ? right = mid - 1: left = mid + 1;
        }
        return left;
    };

    for (const { point, height } of builds) {
        const index = findHeight(Math.abs(height));

        height > 0
            ? heights.splice(index, 0, height)
            : heights.splice(index, 1);

        const currentHeight = heights.at(-1);

        if (previousHeight === currentHeight) continue;
        result.push([point, currentHeight]);
        previousHeight = currentHeight;
    }
    return result;
};