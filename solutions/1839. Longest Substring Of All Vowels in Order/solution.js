/**
 * @param {string} word
 * @return {number}
 */
var longestBeautifulSubstring = function(word) {
    const VOWELS_SIZE = 5;
    let result = left = 0;
    let vowels = 1;

    for (let index = 1; index < word.length; index++) {
        if (word[index] < word[index - 1]) {
            left = index;
            vowels = 1;
            continue;
        }
        if (word[index] > word[index - 1]) vowels += 1;
        if (vowels !== VOWELS_SIZE) continue;
        result = Math.max(index - left + 1, result);
    }
    return result;
};