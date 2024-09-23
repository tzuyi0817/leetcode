/**
 * @param {number[]} nums
 * @return {number}
 */
var reductionOperations = function(nums) {
    let level = result = 0;

    nums.sort((a, b) => a - b);

    for (let index = 1; index < nums.length; index++) {
        if (nums[index] !== nums[index - 1]) level += 1;

        result += level;
    }
    return result;
};