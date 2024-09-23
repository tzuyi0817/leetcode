/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
var areSentencesSimilar = function(sentence1, sentence2) {
    const chars1 = sentence1.split(' ');
    const chars2 = sentence2.split(' ');

    while (chars1.length && chars2.length && chars1[0] === chars2[0]) {
        chars1.shift();
        chars2.shift();
    }

    while (chars1.length && chars2.length && chars1.at(-1) === chars2.at(-1)) {
        chars1.pop();
        chars2.pop();
    }
    return !chars1.length || !chars2.length;
};
