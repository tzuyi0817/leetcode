/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;
    const BASE_CHAR_CODE = 'a'.charCodeAt(0);
    const wordSet = new Set(wordList);
    let queue = [beginWord];
    let result = 1;

    while (queue.length) {
        const nextQueue = [];

        for (const word of queue) {
            for (let index = 0; index < word.length; index++) {
                for (let code = BASE_CHAR_CODE; code < BASE_CHAR_CODE + 26; code++) {
                    const s = String.fromCharCode(code);
                    const targetWord = `${word.slice(0, index)}${s}${word.slice(index + 1)}`;

                    if (!wordSet.has(targetWord)) continue;
                    if (targetWord === endWord) return result + 1;
                    wordSet.delete(targetWord);
                    nextQueue.push(targetWord);
                }
            }
        }
        queue = nextQueue;
        result += 1;
    }
    return 0;
};