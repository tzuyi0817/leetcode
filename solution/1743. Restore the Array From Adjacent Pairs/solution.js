/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
var restoreArray = function(adjacentPairs) {
    const pairsMap = adjacentPairs.reduce((map, [a, b]) => {
        const pairsA = map.get(a) ?? new Set();
        const pairsB = map.get(b) ?? new Set();

        map.set(a, pairsA.add(b));
        return map.set(b, pairsB.add(a));
    }, new Map());
    const size = adjacentPairs.length + 1;
    const startNum = [...pairsMap.keys()].find(num => pairsMap.get(num).size === 1);
    const result = [startNum];

    for (let index = 1; index < size; index++) {
        const current = result[index - 1];
        const pairs = pairsMap.get(current);

        for (const num of pairs) {
            if (num === result[index - 2]) continue;
            result.push(num);
        }
    }
    return result;
};
