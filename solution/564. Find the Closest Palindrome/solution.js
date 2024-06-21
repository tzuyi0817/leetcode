/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function(n) {
    const size = n.length;
    const maxInteger = 10 ** size + 1;
    const minInteger = 10 ** (size - 1) - 1;
    const palindromicSet = new Set([`${minInteger}`]);
    const prefix = n.slice(0, Math.floor((size + 1) / 2));
    const isOdd = size % 2;

    const getPalindromic = (closestPrefix) => {
        const str = `${closestPrefix}`;
        const n = str.length;
        const start = isOdd ? n - 2 : n - 1;
        let result = str;

        for (let index = start; index >= 0; index--) {
            result += str[index];
        }
        return result;
    };

    for (let diff = -1; diff <= 1; diff++) {
        const closestPrefix = +prefix + diff;
        const palindromic = getPalindromic(closestPrefix);

        palindromicSet.add(palindromic);
    }
    let result = '';
    let minDiff = Number.MAX_SAFE_INTEGER;

    palindromicSet.add(`${maxInteger}`); // ensure smaller one
    palindromicSet.delete(`${n}`);
    
    for (const palindromic of palindromicSet) {
        const diff = Math.abs(n - palindromic);

        if (diff >= minDiff) continue;
        result = palindromic;
        minDiff = diff;
    }
    return result;
};