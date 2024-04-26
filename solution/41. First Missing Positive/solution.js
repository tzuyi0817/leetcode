/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const n = nums.length;

    for (let index = 0; index < n; index++) {
        while (nums[index] > 0 && nums[index] <= n && nums[nums[index] - 1] !== nums[index]) {
            const num = nums[index];

            [nums[num - 1], nums[index]] = [nums[index], nums[num - 1]];
        }
    }
    for (let index = 0; index < n; index++) {
        const num = index + 1;

        if (nums[index] !== num) return num;
    }
    return n + 1;
};
