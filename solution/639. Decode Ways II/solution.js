/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    const MODULO = 10 ** 9 + 7;
    let previous = 1;
    let previous1 = previous2 = current = 0;

    for (const char of s) {
        if (char === '*') {
            current = previous * 9 + previous1 * 9 + previous2 * 6;
            previous1 = previous2 = previous;
        } else {
            current = (char > 0) * previous + previous1 + (char <= 6) * previous2;
            previous1 = char === '1' ? previous : 0;
            previous2 = char === '2' ? previous : 0;
        }
        previous = current % MODULO;
    }
    return previous;
};