/**
 * @param {string} s
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var findLexSmallestString = function(s, a, b) {
    const visited = new Set();
    let result = s;

    findSmallestString(s);
    return result;

    function findSmallestString(str) {
        if (visited.has(str)) return;
        visited.add(str);
        if (str < result) result = str;
        findSmallestString(addString(str));
        findSmallestString(rotateString(str));
    }

    function addString(str) {
        let result = '';

        for (let index = 0; index < str.length; index++) {
            const char = +str[index];

            result += index % 2 ? (char + a) % 10 : char;
        }
        return result;
    }

    function rotateString(str) {
        return str.slice(b) + str.slice(0, b);
    }
};
