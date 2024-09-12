/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function(allowed, words) {
    const BASE_CODE = 'a'.charCodeAt(0);
    const MAX_ALLOWED = 26;
    let mask = 1 << MAX_ALLOWED;

    for (const letter of allowed) {
        const code = letter.charCodeAt(0) - BASE_CODE;

        mask ^= 1 << code;
    }

    return words.reduce((result, word) => {
        let current = mask;

        for (const letter of word) {
            const code = letter.charCodeAt(0) - BASE_CODE;

            current |= 1 << code;
        }
        return result + (current === mask ? 1 : 0);
    }, 0);
};
