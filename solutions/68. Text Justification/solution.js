/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    const result = [];
    let current = [];
    let currentSize = 0;
    const combineWords = () => {
        if (current.length === 1) {
            return current[0].padEnd(maxWidth, ' ');
        }
        const totalSpaces = maxWidth - currentSize;
        const preSpaces = Math.floor(totalSpaces / (current.length - 1));
        let remainSpaces = totalSpaces % (current.length - 1);
        let result = '';

        for (let index = 0; index < current.length; index++) {
            const word = current[index];
            const count = index < remainSpaces ? preSpaces + 1 : preSpaces;
            const spaces = index === current.length - 1 ? 0 : count;

            result += word + ' '.repeat(spaces);
        }
        return result;
    };

    for (const word of words) {
        const totalSize = word.length + currentSize + current.length;

        if (totalSize > maxWidth) {
            result.push(combineWords());
            current = [];
            currentSize = 0;
        }
        currentSize += word.length;
        current.push(word);
    }
    if (current.length) {
        result.push(current.join(' ').padEnd(maxWidth, ' '));
    }
    
    return result;
};
