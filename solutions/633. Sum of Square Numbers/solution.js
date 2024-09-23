/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let left = 0;
    let right = Math.floor(Math.sqrt(c));

    while (left <= right) {
        const sum = left ** 2 + right ** 2;

        if (sum === c) return true;
        sum > c ? right -= 1 : left += 1;
    }
    return false;
};