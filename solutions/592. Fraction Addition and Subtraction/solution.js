/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
    const nums = expression.match(/[+-]?[0-9]+/g);
    let numerator = 0;
    let denominator = 1;

    const gcd = (a, b) => b ? gcd(b, a % b) : a;

    for (let index = 0; index < nums.length; index += 2) {
        const currentNumerator = nums[index];
        const currentDenominator = nums[index + 1];

        numerator = numerator * currentDenominator + currentNumerator * denominator;
        denominator *= currentDenominator;

        const currentGcd = gcd(Math.abs(numerator), Math.abs(denominator));

        numerator /= currentGcd;
        denominator /= currentGcd;
    }
    return `${numerator}/${denominator}`;
};