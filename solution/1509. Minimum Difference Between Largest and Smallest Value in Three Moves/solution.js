/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function(nums) {
    if (nums.length < 5) return 0;
    let result = Number.MAX_SAFE_INTEGER;

    nums.sort((a, b) => a - b);

    for (let index = 0; index < 4; index++) {
        result = Math.min(result, nums[nums.length - 4 + index] - nums[index]);
    }
    return result;
};
