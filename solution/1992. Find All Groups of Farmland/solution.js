/**
 * @param {number[][]} land
 * @return {number[][]}
 */
var findFarmland = function(land) {
    const m = land.length;
    const n = land[0].length;
    const farmlands = [];
    const dfsLand = (row, col, rightDownCorner) => {
        if (row >= m || col >= n || row < 0 || col < 0) return true;
        const value = land[row][col];
        if (value === 0) return true;
        if (value === 'x') return false;

        land[row][col] = 'x';
        const isRightEdge = dfsLand(row, col + 1, rightDownCorner);
        const isDownEdge = dfsLand(row + 1, col, rightDownCorner);

        if (isRightEdge && isDownEdge) {
            rightDownCorner.row = row;
            rightDownCorner.col = col;
        }
    };

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (land[row][col] !== 1) continue;
            const rightDownCorner = { row: null, col: null };

            dfsLand(row, col, rightDownCorner);
            farmlands.push([row, col, rightDownCorner.row, rightDownCorner.col]);
        }
    }
    return farmlands;
};