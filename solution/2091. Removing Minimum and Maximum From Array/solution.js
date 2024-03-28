/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
    const size = nums.length;
    let min = { value: Number.MAX_SAFE_INTEGER, index: -1 };
    let max = { value: Number.MIN_SAFE_INTEGER, index: -1 };

    for (let index = 0; index < size; index++) {
        const value = nums[index];

        if (value > max.value) max = { value, index };
        if (value < min.value) min = { value, index };
    }
    const maximum = Math.max(min.index, max.index);
    const minimum = Math.min(min.index, max.index);
    const cutLeft = maximum + 1;
    const curRight = size - minimum;
    const cutBilateral = size - maximum + minimum + 1;

    return Math.min(cutLeft, curRight, cutBilateral);
};