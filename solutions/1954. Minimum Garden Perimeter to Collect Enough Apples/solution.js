/**
 * @param {number} neededApples
 * @return {number}
 */
var minimumPerimeter = function(neededApples) {
    let left = 1;
    let right = 10 ** 15;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const apples = 2 * mid * (mid + 1) * (2 * mid + 1);

        apples >= neededApples ? right = mid : left = mid + 1;
    }
    return left * 8;
};