/**
 * @param {string[]} nums
 * @param {string} target
 * @return {number}
 */
var numOfPairs = function(nums, target) {
    const countMap = nums.reduce((map, digit) => {
        const count = map.get(digit) ?? 0;

        return map.set(digit, count + 1);
    }, new Map());
    let result = 0;

    for (const [digit, count] of countMap) {
        if (!target.startsWith(digit)) continue;
        const pairDigit = target.slice(digit.length);

        if (!countMap.has(pairDigit)) continue;
        result += digit === pairDigit 
            ? count * (count - 1)
            : count * countMap.get(pairDigit);
    }
    return result;
};