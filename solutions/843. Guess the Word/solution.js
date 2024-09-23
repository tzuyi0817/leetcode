/**
 * // This is the master's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Master() {
 *
 *     @param {string} word
 *     @return {integer}
 *     this.guess = function(word) {
 *         ...
 *     };
 * };
 */
/**
 * @param {string[]} words
 * @param {Master} master
 * @return {void}
 */
var findSecretWord = function(words, master) {
    const getMatchesCount = (word1, word2) => {
        let matches = 0;

        for (let index = 0; index < word1.length; index++) {
            if (word1[index] === word2[index]) matches += 1;
        }
        return matches;
    };

    let remainingWords = [...words];

    while (true) {
        const n = remainingWords.length;
        const word = remainingWords[Math.floor(Math.random() * n)];
        const nextWords = [];
        const matches = master.guess(word);

        if (matches === word.length) break;

        for (let index = 0; index < n; index++) {
            const current = remainingWords[index];

            if (getMatchesCount(word, current) !== matches) continue;
            nextWords.push(current);
        }
        remainingWords = nextWords;
    }
};