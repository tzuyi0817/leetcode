/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    const size = points.length;
    const graph = Array(size).fill('').map((_, index) => index);
    const costs = [];

    for (let a = 0; a < size - 1; a++) {
        for (let b = a + 1; b < size; b++) {
            const [x1, y1] = points[a];
            const [x2, y2] = points[b];
            const cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);

            costs.push({ cost, a, b });
        }
    }
    costs.sort((a, b) => a.cost - b.cost);
    
    return costs.reduce((result, { cost, a, b }) => {
        const rootA = unionFind(a);
        const rootB = unionFind(b);

        if (rootA === rootB) return result;
        graph[rootA] = graph[rootB];
        return result + cost;
    }, 0);

    function unionFind(target) {
        if (graph[target] === target) return target;
        graph[target] = unionFind(graph[target]);
        return graph[target];
    }
};
