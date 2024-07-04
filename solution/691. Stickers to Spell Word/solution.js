/**
 * @param {string[]} stickers
 * @param {string} target
 * @return {number}
 */
var minStickers = function(stickers, target) {
    const memo = new Map();

    const getRestWord = (word, sticker) => {
        for (const char of sticker) {
            if (!word.includes(char)) continue;
            word = word.replace(char, '');
        }
        return word;
    };

    const spellWord = (word) => {
        if (!word) return 0;
        if (memo.has(word)) return memo.get(word);

        let count = Number.MAX_SAFE_INTEGER;

        for (const sticker of stickers) {
            if (!sticker.includes(word[0])) continue;

            const restWord = getRestWord(word, sticker);

            count = Math.min(spellWord(restWord) + 1, count);
        }
        const result = count === Number.MAX_SAFE_INTEGER || !count ? -1 : count;

        memo.set(word, result);
        return result
    };

    return spellWord(target);
};