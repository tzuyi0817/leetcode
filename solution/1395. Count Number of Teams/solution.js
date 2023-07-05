/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    let result = 0;

    for (let index = 1; index < rating.length - 1; index++) {
        const rate = rating[index];
        let leftBigger = leftSmaller = 0;
        let rightBigger = rightSmaller = 0;

        for (let left = 0; left < index; left++) {
            rate < rating[left] ? leftBigger += 1 : leftSmaller += 1;
        }
        for (let right = index + 1; right < rating.length; right++) {
            rate < rating[right] ? rightBigger += 1 : rightSmaller += 1;
        }
        result += leftBigger * rightSmaller + leftSmaller * rightBigger;
    }
    return result;
};
