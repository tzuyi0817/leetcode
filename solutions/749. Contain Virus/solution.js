/**
 * @param {number[][]} isInfected
 * @return {number}
 */
var containVirus = function(isInfected) {
    const m = isInfected.length;
    const n = isInfected[0].length;

    const setRegionInfo = (row, col, region, visited) => {
        if (row < 0 || col < 0 || row >= m || col >= n) return;
        const value = isInfected[row][col];

        if (visited[row][col] || value === 'x') return;

        const key = row * n + col;

        if (!value) {
            region.needWalls += 1;
            region.uninfectedCells.add(key);
            return;
        }

        visited[row][col] = true;
        region.infectedCells.add(key);
        setRegionInfo(row + 1, col, region, visited);
        setRegionInfo(row - 1, col, region, visited);
        setRegionInfo(row, col + 1, region, visited);
        setRegionInfo(row, col - 1, region, visited);
    };

    let result = 0;

    while (true) {
        const regions = [];
        const visited = Array(m).fill('').map(_ => Array(n).fill(false));

        for (let row = 0; row < m; row++) {
            for (let col = 0; col < n; col++) {
                const value = isInfected[row][col];

                if (visited[row][col] || value !== 1) continue;

                const region = { 
                    needWalls: 0, 
                    uninfectedCells: new Set(), 
                    infectedCells: new Set(),
                };

                setRegionInfo(row, col, region, visited);
                regions.push(region);
            }
        }
        if (!regions.length) break;

        regions.sort((a, b) => a.uninfectedCells.size - b.uninfectedCells.size);

        const installWallRegion = regions.pop();

        result += installWallRegion.needWalls;

        for (const cell of installWallRegion.infectedCells) {
            const row = Math.floor(cell / n);
            const col = cell % n;

            isInfected[row][col] = 'x';
        }
        for (const { uninfectedCells } of regions) {
            for (cell of uninfectedCells) {
                const row = Math.floor(cell / n);
                const col = cell % n;

                isInfected[row][col] = 1;
            }
        }
    }
    return result;
};