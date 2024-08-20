/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;
    const memo = Array(n).fill('').map(_ => Array(n).fill(0));
    const suffixSum = Array(n + 1).fill(0);

    for (let index = n - 1; index >= 0; index--) {
        suffixSum[index] = suffixSum[index + 1] + piles[index];
    }

    const takePile = (index, M) => {
        if (index + M * 2 >= n) return suffixSum[index];
        if (memo[index][M]) return memo[index][M];

        let bob = Number.MAX_SAFE_INTEGER;

        for (let x = 1; x <= 2 * M; x++) {
            bob = Math.min(bob, takePile(index + x, Math.max(M, x)));
        }
        return memo[index][M] = suffixSum[index] - bob;
    };

    return takePile(0, 1);
};