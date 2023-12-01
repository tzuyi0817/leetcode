/**
 * @param {number[][]} points
 * @param {number[][]} queries
 * @return {number[]}
 */
var countPoints = function(points, queries) {
    return queries.map(([x, y, r]) => {
        return points.reduce((result, [pointX, pointY]) => {
            const isInside = (pointX - x) ** 2 + (pointY - y) ** 2 <= r ** 2;

            return result + (isInside ? 1 : 0);
        }, 0);
    });
};
