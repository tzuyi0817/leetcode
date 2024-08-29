/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MODULO = 10 ** 9 + 7;
    const BASE_CODE = 'a'.charCodeAt(0);
    const dp = Array(26).fill(0);
    const accumulate = (nums) => nums.reduce((sum, num) => sum + num);

    for (const letter of s) {
        const code = letter.charCodeAt(0) - BASE_CODE;

        dp[code] = (accumulate(dp) + 1) % MODULO;
    }
    return accumulate(dp) % MODULO;
};