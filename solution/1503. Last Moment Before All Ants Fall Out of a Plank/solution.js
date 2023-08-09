/**
 * @param {number} n
 * @param {number[]} left
 * @param {number[]} right
 * @return {number}
 */
var getLastMoment = function(n, left, right) {
    const maxLeft = Math.max(...left);
    const minRight = Math.min(...right);

    return Math.max(maxLeft, n - minRight);
};
