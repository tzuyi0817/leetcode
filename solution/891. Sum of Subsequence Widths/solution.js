/**
 * @param {number[]} nums
 * @return {number}
 */
var sumSubseqWidths = function(nums) {
    const MODULO = 10 ** 9 + 7;
    const n = nums.length;
    let result = 0;
    let count = 1;

    nums.sort((a, b) => a - b);

    for (let index = 0; index < n; index++) {
        const num1 = nums[index];
        const num2 = nums[n - 1 - index];

        result += (num1 - num2) * count;
        result %=  MODULO;
        count = (count * 2) % MODULO;
    }
    return result;
};