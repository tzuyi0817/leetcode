/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var maximumScore = function(a, b, c) {
    if (!a && !b || !b && !c || !a && !c) return 0;
    if (a <= b && a <= c) return 1 + maximumScore(a, b - 1, c - 1);
    if (b <= a && b <= c) return 1 + maximumScore(a - 1, b, c - 1);
    if (c <= a && c <= b) return 1 + maximumScore(a - 1, b - 1, c);
};
