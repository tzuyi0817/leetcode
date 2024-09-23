/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers = function(n) {
    const MODULO = BigInt(10 ** 9 + 7);
    const PRIME = 4;
    const EVEN = 5;
    const count = Math.floor(n / 2);
    const pow = (base, exponent) => {
        let result = 1n;

        if (exponent === 0) return result;
        result *= pow(base, Math.floor(exponent / 2));
        result *= result;
        if (exponent % 2) result *= BigInt(base);
        result %= MODULO;
        return result;
    }; 

    return pow(PRIME, count) * pow(EVEN, n % 2 ? count + 1 : count) % MODULO;
};