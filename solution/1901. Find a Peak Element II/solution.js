/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findPeakGrid = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    let left = 0;
    let right = n - 1;

    while (left <= right) {
        const col = Math.floor((left + right) / 2);
        let peakRow = 0;

        for (let row = 1; row < m; row++) {
            if (mat[peakRow][col] >= mat[row][col]) continue;
            peakRow = row;
        }
        const isGreaterLeft = mat[peakRow][col] > (mat[peakRow][col - 1] ?? -1);
        const isGreaterRight = mat[peakRow][col] > (mat[peakRow][col + 1] ?? -1);

        if (isGreaterLeft && isGreaterRight) return [peakRow, col];
        isGreaterLeft ? left = col + 1 : right = col - 1;
    }
    return [-1, -1];
};