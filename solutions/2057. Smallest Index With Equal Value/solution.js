/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestEqual = function(nums) {
    return nums.findIndex((num, index) => index % 10 === num);
};