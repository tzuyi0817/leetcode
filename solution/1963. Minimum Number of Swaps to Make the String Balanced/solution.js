/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function(s) {
    let leftBracket = 0;

    for (const bracket of s) {
        if (bracket === '[') {
            leftBracket += 1;
            continue;
        }
        if (!leftBracket) continue;
        leftBracket -= 1;
    }
    return Math.ceil(leftBracket / 2);
};