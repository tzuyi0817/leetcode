/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function(s, x, y) {
    const maxScoreStack = [];
    const minScoreStack = [];
    const [maxScore, minScore] = x > y ? [x, y] : [y, x];
    const [firstStr, secondStr] = x > y ? ['a', 'b'] : ['b' , 'a'];
    let result = 0;

    for (const str of s) {
        if (str === secondStr && maxScoreStack.length && maxScoreStack.at(-1) === firstStr) {
            result += maxScore;
            maxScoreStack.pop();
            continue;
        }
        maxScoreStack.push(str);
    }
    while (maxScoreStack.length) {
        const str = maxScoreStack.pop();

        if (str === secondStr && minScoreStack.length && minScoreStack.at(-1) === firstStr) {
            result += minScore;
            minScoreStack.pop();
            continue;
        }
        minScoreStack.push(str);
    }
    return result;
};
