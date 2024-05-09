/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    if (s1 === s2) return true;
    const n = s1.length;
    const memo = Array(n).fill('').map((_ => Array(n).fill('').map(_ => Array(n + 1).fill(-1))));
    const checkScramble = (index1, index2, length) => {
        if (length === 1) memo[index1][index2][length] = s1[index1] === s2[index2];
        if (memo[index1][index2][length] !== -1) return memo[index1][index2][length];

        for (let k = 1; k < length; k++) {
            if (checkScramble(index1, index2, k) && checkScramble(index1 + k, index2 + k, length - k)) {
                return memo[index1][index2][length] = true;
            }
            if (!checkScramble(index1, index2 + length - k, k)) continue;
            if (!checkScramble(index1 + k, index2, length - k)) continue;
            return memo[index1][index2][length] = true;
        }
        return memo[index1][index2][length] = false;
    };

    return checkScramble(0, 0, n);
};
