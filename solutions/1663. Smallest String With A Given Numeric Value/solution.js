/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function(n, k) {
    const CODE_BASE = 'a'.charCodeAt(0);
    const result = Array(n).fill('a');

    k -= n;

    for (let index = n - 1; index >= 0; index--) {
        const code = Math.min(25, k);
        const targetChar = String.fromCharCode(CODE_BASE + code);

        result[index] = targetChar;
        k -= code;
        if (k === 0) break;
    }
    return result.join('');
};
