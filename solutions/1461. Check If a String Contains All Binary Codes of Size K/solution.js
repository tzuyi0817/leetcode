/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {
    const targetCount = 2 ** k;
    const codeSet = new Set();

    for (let index = k; index <= s.length; index++) {
        const code = s.slice(index - k, index);
        
        codeSet.add(code);
        if (codeSet.size === targetCount) return true;
    }
    return false;
};
