/**
 * @param {number} n
 * @return {number}
 */
var nextBeautifulNumber = function(n) {
    while (!isBalancedNumber(++n));

    function isBalancedNumber(num) {
        const counts = Array(10).fill(0);

        while (num) {
            const mantissa = num % 10;

            if (!mantissa) return false;
            counts[mantissa] += 1;
            num = Math.floor(num / 10);
        }
        return counts.every((count, index) => !count || count === index);
    }
    return n;
};