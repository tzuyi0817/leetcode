/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var kSimilarity = function(s1, s2) {
    if (s1 === s2) return 0;
    const n = s1.length;
    const visited = new Set([s1]);
    let queue = [s1];
    let result = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const word of queue) {
            let a = 0;

            while (a < n && word[a] === s2[a]) a += 1;

            for (let b = a + 1; b < n; b++) {
                if (word[b] === s2[b]) continue;
                if (word[a] !== s2[b]) continue;
                const startWord = word.slice(0, a);
                const middleWord = word.slice(a + 1, b);
                const endWord = word.slice(b + 1);
                const nextWord = `${startWord}${word[b]}${middleWord}${word[a]}${endWord}`;

                if (nextWord === s2) return result + 1;
                if (visited.has(nextWord)) continue;
                visited.add(nextWord);
                nextQueue.push(nextWord);
            }
        }
        queue = nextQueue;
        result += 1;
    }
    return -1;
};