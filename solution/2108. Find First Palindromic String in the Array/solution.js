/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function(words) {
    const isPalindrome = (word) => {
        let left = 0;
        let right = word.length - 1;

        while (left < right) {
            if (word[left] !== word[right]) return false;
            left += 1;
            right -= 1;
        }
        return true;
    };

    for (const word of words) {
        if (isPalindrome(word)) return word;
    }
    return '';
};