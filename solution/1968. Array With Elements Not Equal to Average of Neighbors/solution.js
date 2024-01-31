/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function(nums) {
    nums.sort((a, b) => a - b);

    for (let index = 1; index < nums.length; index += 2) {
        [nums[index], nums[index - 1]] = [nums[index - 1], nums[index]];
    }
    return nums;
};