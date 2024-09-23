/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function(n, edges, hasApple) {
    const visited = new Set();
    const edgesMap = edges.reduce((map, [a, b]) => {
        const edgeA = map.get(a) ?? [];
        const edgeB = map.get(b) ?? [];

        edgeA.push(b);
        edgeB.push(a);
        map.set(a, edgeA);
        return map.set(b, edgeB);
    }, new Map());
    const collectApple = (from = 0) => {
        const edges = edgesMap.get(from) ?? [];

        visited.add(from);
        const time = edges.reduce((total, edge) => {
            if (visited.has(edge)) return total;
            return total + collectApple(edge);
        }, 0);

        return time + (from && (hasApple[from] || time) ? 2 : 0);
    };

    return collectApple();
};
