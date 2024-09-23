/**
 * @param {string} n
 * @param {number} x
 * @return {string}
 */
var maxValue = function(n, x) {
    const isNegative = Math.sign(n) === -1;
    const start = isNegative ? 1 : 0;

    for (let index = start; index < n.length; index++) {
        const value = n[index];

        if (isNegative && value <= x) continue;
        if (!isNegative && value >= x) continue;
        return `${n.slice(0, index)}${x}${n.slice(index)}`;
    }
    return `${n}${x}`;
};