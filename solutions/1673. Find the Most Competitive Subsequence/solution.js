/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var mostCompetitive = function(nums, k) {
    const stack = [];
    const size = nums.length;

    for (let index = 0; index < size; index++) {
        const num = nums[index];

        while (stack.length && stack.at(-1) > num && stack.length + size - index > k) {
            stack.pop();
        }
        stack.length < k && stack.push(num);
    }
    return stack;
};
