/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    const m = strs[0].length;
    const dp = Array(m).fill(1);

    const isSorted = (a, b) => {
        for (const word of strs) {
            if (word[b] > word[a]) return false;
        }
        return true;
    };

    for (let a = 1; a < m; a++) {
        for (let b = 0; b < a; b++) {
            if (!isSorted(a, b)) continue;
            dp[a] = Math.max(dp[b] + 1, dp[a]);
        }
    }
    return m - Math.max(...dp);
};