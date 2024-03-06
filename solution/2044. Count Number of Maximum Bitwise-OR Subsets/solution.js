/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function(nums) {
    const size = nums.length;
    const maxBitwise = nums.reduce((result, value) => result | value, 0);
    let result = 0;

    function findMaxBitSubset(index = 0, current = 0) {
        if (index >= size) {
            if (current === maxBitwise) result += 1;
            return;
        }
        findMaxBitSubset(index + 1, current);
        findMaxBitSubset(index + 1, current | nums[index]);
    };
    findMaxBitSubset();
    return result;
};