/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
    const size = piles.length;
    const pickTimes = size / 3;
    let result = 0;
    let right = size - 2;

    piles.sort((a, b) => a - b);

    for (let index = 0; index < pickTimes; index++) {
        result += piles[right];
        right -= 2;
    }
    return result;
};
