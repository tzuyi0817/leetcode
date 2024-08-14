/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var nthMagicalNumber = function(n, a, b) {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;

    const MODULO = 10 ** 9 + 7;
    const lcm = a * b / gcd(a, b);
    let left = Math.min(a, b);
    let right = n * left;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const nth = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm);

        nth >= n ? right = mid : left = mid + 1;
    }
    return left % MODULO;
};