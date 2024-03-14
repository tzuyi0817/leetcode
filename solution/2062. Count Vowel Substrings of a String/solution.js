/**
 * @param {string} word
 * @return {number}
 */
var countVowelSubstrings = function(word) {
    const size = word.length;
    const vowelMap = new Map([
        ['a', -1],
        ['e', -1],
        ['i', -1],
        ['o', -1],
        ['u', -1],
    ]);
    let result = left = 0;

    function startMinSubstrVowel() {
        let start = size;

        for (const index of vowelMap.values()) {
            if (index === -1) return -1;
            start = Math.min(index, start);
        }
        return start;
    } 
    for (let index = 0; index < size; index++) {
        const char = word[index];

        if (!vowelMap.has(char)) {
            left = index + 1;
            continue;
        }
        vowelMap.set(char, index);
        const start = startMinSubstrVowel();
        const count = start - left + 1;

        if (count < 0) continue;
        result += count;
    }
    return result;
};