/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfBeauties = function(nums) {
    const size = nums.length;
    const rightMinValues = Array(size).fill(0);
    let maxValue = nums[0];
    let result = 0;

    rightMinValues[size - 1] = nums[size - 1];
    for (let index = size - 2; index >= 0; index--) {
        rightMinValues[index] = Math.min(rightMinValues[index + 1], nums[index]);
    }
    for (let index = 1; index < size - 1; index++) {
        const value = nums[index];

        if (value > maxValue && value < rightMinValues[index + 1]) {
            result += 2;
            maxValue = value;
            continue;
        }
        maxValue = Math.max(value, maxValue);
        if (value <= nums[index - 1]) continue;
        if (value >= nums[index + 1]) continue;
        result += 1;
    }
    return result;
};