/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function(n) {
    const { length } = n;
    const maxPalindrome = 10 ** length + 1;
    const minPalindrome = 10 ** (length - 1) - 1;
    const palindromes = [`${minPalindrome}`];
    const prefix = n.slice(0, Math.ceil(length / 2));
    const isOdd = length % 2;

    const createPalindrome = (value) => {
        value = `${value}`;
        const n = value.length;
        const start = isOdd ? n - 2 : n - 1;
        let result = value;

        for (let index = start; index >= 0; index--) {
            result += value[index];
        }
        return result;
    };

    for (let diff = -1; diff <= 1; diff++) {
        const value = +prefix + diff;
        const palindrome = createPalindrome(value);

        palindromes.push(palindrome);
    }
    palindromes.push(`${maxPalindrome}`);

    let result = maxPalindrome;
    let minDiff = Number.MAX_SAFE_INTEGER;

    for (const palindrome of palindromes) {
        if (palindrome === n) continue;
        const diff = Math.abs(palindrome - n);

        if (minDiff <= diff) continue;
        minDiff = diff;
        result = palindrome;
    }
    return result;
};