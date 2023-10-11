/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function(nums) {
    const score = new Set();
    const size = nums.length;
    let start = end = result = sum = 0;

    while (end < size) {
        if (score.has(nums[end])) {
            score.delete(nums[start]);
            sum -= nums[start];
            start += 1;
        } else {
            score.add(nums[end]);
            sum += nums[end];
            end += 1;
            result = Math.max(sum, result);
        }
    }
    return result;
};
