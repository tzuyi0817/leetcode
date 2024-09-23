/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function(digits, n) {
    let result = 0;

    n = `${n}`;

    for (let index = 1; index < n.length; index++) {
        result += digits.length ** index;
    }

    for (let index = 0; index < n.length; index++) {
        const current = n[index];

        for (const digit of digits) {
            if (digit >= current) continue;

            result += digits.length ** (n.length - index - 1);
        }
        if (!digits.includes(current)) return result;
    }
    return result + 1;
};