/**
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function(bombs) {
    const size = bombs.length;
    const graph = new Map();
    const isImplicated = ([x1, y1, r], [x2, y2]) => {
        return (x1 - x2) ** 2 + (y1 - y2) ** 2 <= r * r;
    };

    for (let a = 0; a < size; a++) {
        const detonateBombs = [];

        for (let b = 0; b < size; b++) {
            if (a === b) continue;
            if (!isImplicated(bombs[a], bombs[b])) continue;
            detonateBombs.push(b);
        }
        graph.set(a, detonateBombs);
    }
    const detonated = new Set();
    const dfsBombs = (bomb) => {
        if (detonated.has(bomb)) return;
        const detonateBombs = graph.get(bomb);

        detonated.add(bomb);
        detonateBombs.forEach(dfsBombs);
    };
    let result = 1;

    for (let index = 0; index < size; index++) {
        dfsBombs(index);
        result = Math.max(detonated.size, result);
        if (result === size) return result;
        detonated.clear();
    }
    return result;
};