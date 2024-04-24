/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const deque = [];
    const result = [];

    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];

        if (deque.length && deque[0] === index - k) {
            deque.shift();  
        }
        while (deque.length && nums[deque.at(-1)] <= num) {
            deque.pop();
        }
        deque.push(index);
        if (index + 1 < k) continue;
        result.push(nums[deque[0]]);
    }
    return result;
};