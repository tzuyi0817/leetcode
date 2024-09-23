/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const hashMap = new Map();
    const checkRegex = (index, j) => {
        const cacheKey = `${index},${j}`;

        if (hashMap.has(cacheKey)) return hashMap.get(cacheKey);
        if (j === p.length) return index === s.length;

        const isFirstMatch = index < s.length && (s[index] === p[j] || p[j] === '.');
        const isCheckPreceding = j + 1 < p.length && p[j + 1] === '*';
        const result = isCheckPreceding 
            ? checkRegex(index, j + 2) || (isFirstMatch && checkRegex(index + 1, j))
            : isFirstMatch && checkRegex(index + 1, j + 1);

        hashMap.set(cacheKey, result);
        return result;
    };

    return checkRegex(0, 0);
};
