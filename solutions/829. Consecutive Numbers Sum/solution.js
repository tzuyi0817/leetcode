/**
 * @param {number} n
 * @return {number}
 */
var consecutiveNumbersSum = function(n) {
    let result = 0;
    let triangleNum = 0; // count * (count - 1) / 2

    for (let count = 1; triangleNum + count <= n; count++) {
        if ((n - triangleNum) % count === 0) {
            result += 1;
        }
        triangleNum += count;
    }
    return result;
};