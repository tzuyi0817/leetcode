/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
    const [[a, b], [c, d]] = edges;

    if (a === c || a === d) return a;
    return b;
};
