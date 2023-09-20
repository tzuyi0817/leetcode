/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var countSubstrings = function(s, t) {
    const m = s.length;
    const n = t.length;
    let result = 0;

    const checkSubstring = (a, b) => {
        let current = previous = 0;

        while (a < m && b < n) {
            current += 1;

            if (s[a] !== t[b]) {
               previous = current;
               current = 0;
            }
            result += previous;
            a += 1;
            b += 1;
        }
    };

    for (let index = 0; index < m; index++) checkSubstring(index, 0);
    for (let index = 1; index < n; index++) checkSubstring(0, index);
    return result;
};
