/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function(s) {
    const size = s.length;
    let startZero = startOne = 0;
    let result = 0;

    for (let index = 0; index < size; index++) {
        const value = s[index];

        value === `${index % 2}` ? startOne += 1 : startZero += 1;
    }
    result = Math.min(startZero, startOne);

    for (let index = 0; index < size; index++) {
        const value = s[index];

        value === `${(size + index) % 2}` ? startOne += 1 : startZero += 1;
        value === `${index % 2}` ? startOne -= 1 : startZero -= 1;
        result = Math.min(result, startZero, startOne);
    }
    return result;
};