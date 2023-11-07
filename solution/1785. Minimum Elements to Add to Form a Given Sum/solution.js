/**
 * @param {number[]} nums
 * @param {number} limit
 * @param {number} goal
 * @return {number}
 */
var minElements = function(nums, limit, goal) {
    const sum = nums.reduce((result, num) => result + num);

    return Math.ceil(Math.abs(goal - sum) / limit);
};
