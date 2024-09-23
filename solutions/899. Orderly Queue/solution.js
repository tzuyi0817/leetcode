/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var orderlyQueue = function(s, k) {
    if (k > 1) {
        return s.split('').sort((a, b) => a.localeCompare(b)).join('');
    }

    let result = s;
    let current = s;

    for (const letter of s) {
        current = `${current.slice(1)}${letter}`;

        if (current >= result) continue;
        result = current;
    }
    return result;
};