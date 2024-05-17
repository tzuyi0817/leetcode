/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    const n = s.length;
    const reverse = s.split('').reverse().join('');

    for (let index = 0; index < n; index++) {
        const sliceReverse = reverse.slice(index);

        if (s.slice(0, n - index) !== sliceReverse) continue;
        return reverse.slice(0, index) + s;
    }
    return s + reverse;
};