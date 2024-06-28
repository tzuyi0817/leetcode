/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    const n = s.length;
    const dp = Array(n).fill('').map(_ => Array(n).fill(0));

    const turnPointer = (left, right) => {
        if (left > right) return 0;
        if (dp[left][right]) return dp[left][right];
    
        let result = turnPointer(left + 1, right) + 1;

        for (let index = left + 1; index <= right; index++) {
            if (s[index] !== s[left]) continue;
            const turnTimes = turnPointer(left + 1, index - 1) + turnPointer(index, right);

            result = Math.min(turnTimes, result);
        }
        return dp[left][right] = result;
    };

    return turnPointer(0, n - 1);
};