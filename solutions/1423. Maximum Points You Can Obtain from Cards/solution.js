/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    const size = cardPoints.length;
    let score = cardPoints.slice(0, k).reduce((total, point) => total + point);
    let result = score;

    if (k === size) return result;

    for (let index = 1; index <= k; index++) {
        score = score + cardPoints[size - index] - cardPoints[k - index];
        result = Math.max(score, result);
    }
    return result;
};
