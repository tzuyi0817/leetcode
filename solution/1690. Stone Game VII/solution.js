/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVII = function(stones) {
    const size = stones.length;
    const prefixScore = Array(size + 1).fill(0);
    const dp = Array(size).fill('').map(_ => Array(size).fill(0));

    for (let index = 1; index <= size; index++) {
        prefixScore[index] = prefixScore[index - 1] + stones[index - 1];
    }
    for (let right = 0; right < size; right++) {
        for (let left = right; left >= 0; left--) {
            if (left === right) dp[left][right] = 0;
            else { 
                const removeLeft = prefixScore[right + 1] - prefixScore[left + 1] - dp[left + 1][right];
                const removeRight = prefixScore[right] - prefixScore[left] - dp[left][right - 1];

                dp[left][right] = Math.max(dp[left][right], removeLeft, removeRight);
            }
        }
    }
    return dp[0][size - 1];
};
