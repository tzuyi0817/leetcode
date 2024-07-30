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

/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    const n = rating.length;
    const sortedRating = [...rating].sort((a, b) => a - b);
    const bit = Array(n + 2).fill(0);

    const getIndex = (value) => {
        let left = 0;
        let right = n - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            sortedRating[mid] >= value ? right = mid : left = mid + 1;
        }
        return left;
    };

    const updateBit = (index) => {
        while (index < bit.length) {
            bit[index] += 1;
            index += index & -index;
        }
    };

    const queryBit = (index) => {
        let count = 0;

        while (index > 0) {
            count += bit[index];
            index -= index & -index;
        }
        return count;
    };
    let result = 0;

    for (const value of rating) {
        const index = getIndex(value);
        const leftSmallerCount = queryBit(index);
        const leftBiggerCount = queryBit(n) - queryBit(index + 1);
        const rightSmallerCount = index - leftSmallerCount;
        const rightBiggerCount = n - index - 1 - leftBiggerCount;

        updateBit(index + 1);
        result += leftSmallerCount * rightBiggerCount + leftBiggerCount * rightSmallerCount;
    }
    return result;
};
