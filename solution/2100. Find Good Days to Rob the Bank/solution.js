/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
var goodDaysToRobBank = function(security, time) {
    const size = security.length;
    const beforeTimes = Array(size).fill(0);
    const afterTimes = Array(size).fill(0);
    const result = [];

    for (let index = 1; index < size; index++) {
        if (security[index - 1] < security[index]) continue;
        beforeTimes[index] = beforeTimes[index - 1] + 1; 
    }
    for (let index = size - 2; index >= 0; index--) {
        if (security[index + 1] < security[index]) continue;
        afterTimes[index] = afterTimes[index + 1] + 1;
    }
    for (let index = time; index < size - time; index++) {
        if (beforeTimes[index] < time || afterTimes[index] < time) continue;
        result.push(index);
    }
    return result;
};