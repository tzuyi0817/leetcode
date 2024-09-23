/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function(arr) {
    let odds = 0;

    for (const num of arr) {
        odds = num % 2 ? odds + 1 : 0;
        if (odds === 3) return true;
    }
    return false;
};