/**
 * @param {string} s
 * @return {number}
 */
var uniqueLetterString = function(s) {
    const BASE_CODE = 'A'.charCodeAt(0);
    const n = s.length;
    const lastCount = Array(26).fill(0);
    const lastSeen = Array(26).fill(-1);
    let dp = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
        const code = s[index].charCodeAt(0) - BASE_CODE;
        const count = index - lastSeen[code];

        dp += count - lastCount[code];
        lastCount[code] = count;
        lastSeen[code] = index;
        result += dp;
    }
    return result;
};