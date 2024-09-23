/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    const xor = nums.reduce((result, num) => result ^ num);
    const moveBit = xor.toString(2).length - 1;
    let single1 = single2 = 0;

    for (const num of nums) {
        (num >> moveBit) & 1 ? single1 ^= num : single2 ^= num;
    }
    return [single1, single2];
};