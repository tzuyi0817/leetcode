/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function(points) {
    let result = 0;

    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    for (let index = 1; index < points.length; index++) {
        result = Math.max(points[index][0] - points[index - 1][0], result);
    }
    return result;
};
