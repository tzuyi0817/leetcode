/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let left = 0;
    let result = current = s.slice(0, k).split('').filter(char => vowels.has(char)).length;

    for (let index = k; index < s.length; index++) {
        vowels.has(s[index]) && (current += 1);
        vowels.has(s[left]) && (current -= 1);
        left += 1;   
        result = Math.max(current, result);
    }
    return result;
};
