/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    const queue = [];
    const size = nums.length;
    let max = min = nums[0];

    for (let index = 0; index < size; index++) {
        const value = nums[index];

        max = Math.max(value, max);
        min = Math.min(value, min);
        queue.push(value);
        if (max - min <= limit) continue;
        const leftValue = queue.shift();

        leftValue === max && (max = Math.max(...queue));
        leftValue === min && (min = Math.min(...queue));
    }
    return queue.length;
};
