/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function(rolls, mean, n) {
    const MAX_ROLL = 6;
    const size = rolls.length + n;
    const total = size * mean;
    const missingObservations = total - rolls.reduce((sum, value) => sum + value);
    const average = Math.floor(missingObservations / n);
    const eachMax = MAX_ROLL - average;
    let remain = missingObservations - average * n;

    if (average > MAX_ROLL || average <= 0) return [];
    if (eachMax === 0 && remain) return [];
    const result = Array(n).fill(average);
    let index = 0;

    while (remain) {
        const missing = Math.min(remain, eachMax);

        remain -= missing;
        result[index] += missing;
        index += 1;
    }
    return result;
};