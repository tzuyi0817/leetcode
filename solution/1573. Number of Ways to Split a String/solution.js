/**
 * @param {string} s
 * @return {number}
 */
var numWays = function(s) {
    const MODULO = 10 ** 9 + 7;
    const size = s.length;
    let count = 0;

    for (const char of s) {
        char === '1' && (count += 1);
    }
    if (count % 3) return 0;
    if (count === 0) return (size - 1) * (size - 2) / 2 % MODULO;
    let current = first = second = 0;

    count /= 3;

    for (const char of s) {
        if (char === '1') current += 1;
        if (current === count) first += 1;
        if (current === count * 2) second += 1; 
    }
    return first * second % MODULO;
};
