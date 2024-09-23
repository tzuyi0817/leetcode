/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function(n, edges) {
    const vertices = new Set(Array(n).fill('').map((_, index) => index));

    edges.forEach(([from, to]) => vertices.delete(to));

    return [...vertices];
};
