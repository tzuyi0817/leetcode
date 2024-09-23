/**
 * @param {number[]} nums
 * @return {boolean}
 */
var xorGame = function(nums) {
    const n = nums.length;
    const xor = nums.reduce((result, num) => result ^ num);

    if (!xor) return true;

    return n % 2 === 0;
};