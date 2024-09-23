/**
 * @param {number[][]} trees
 * @return {number[][]}
 */
var outerTrees = function(trees) {
    const n = trees.length;

    if (n <= 1) return trees;

    const crossProduct = (a, b, c) => {
        const BAx = a[0] - b[0];
        const BAy = a[1] - b[1];
        const BCx = c[0] - b[0];
        const BCy = c[1] - b[1];

        return BAx * BCy - BAy * BCx;
    };

    trees.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const lower = [];
    const upper = [];

    for (const point of trees) {
        while (lower.length >= 2 && crossProduct(lower.at(-2), lower.at(-1), point) < 0) {
            lower.pop();
        }
        lower.push(point);
    }

    for (let index = n - 1; index >= 0; index--) {
        const point = trees[index];

        while (upper.length >= 2 && crossProduct(upper.at(-2), upper.at(-1), point) < 0) {
            upper.pop();
        }
        upper.push(point);
    }

    return [...new Set([...lower, ...upper])];
};