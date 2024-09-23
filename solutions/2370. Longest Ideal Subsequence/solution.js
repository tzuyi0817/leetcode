/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function(s, k) {
    const BASE_CHAR_CODE = 'a'.charCodeAt(0);
    const dp = Array(26).fill(0);
    const maxSubSize = (code) => {
        const start = Math.max(0, code - k);
        const end = Math.min(25, code + k);
        let result = 0;

        for (let index = start; index <= end; index++) {
            result = Math.max(dp[index], result);
        }
        return result;
    };

    for (const alphabet of s) {
        const code = alphabet.charCodeAt(0) - BASE_CHAR_CODE;

        dp[code] = 1 + maxSubSize(code);
    }
    return Math.max(...dp);
};