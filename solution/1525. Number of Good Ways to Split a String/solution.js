/**
 * @param {string} s
 * @return {number}
 */
var numSplits = function(s) {
    const current = new Set();
    const countMap = new Map();
    let result = 0;

    for (const char of s) {
        const count = countMap.get(char) ?? 0;

        countMap.set(char, count + 1);
    }
    
    for (const char of s) {
        const count = countMap.get(char);

        current.add(char);
        count - 1 
            ? countMap.set(char, count - 1)
            : countMap.delete(char);

        if (current.size === countMap.size) result += 1;
    }
    return result;
};
