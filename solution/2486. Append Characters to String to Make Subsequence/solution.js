/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var appendCharacters = function(s, t) {
    let index = 0;

    for (const char of s) {
        if (char !== t[index]) continue;
        index += 1;
    }
    return t.length - index;
};