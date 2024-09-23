/**
 * @param {number} n
 * @return {number}
 */
var minOperations = function(n) {
    const operations = Math.floor(n / 2);

    return n % 2
        ? (operations + 1) * operations
        : operations ** 2;
};
