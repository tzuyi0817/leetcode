/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countRestrictedPaths = function(n, edges) {
    const MODULO = 10 ** 9 + 7;
    const graph = edges.reduce((map, [u, v, weight]) => {
        (map[u] = map[u] ?? []).push({ edge: v, weight });
        (map[v] = map[v] ?? []).push({ edge: u, weight });
        return map;
    }, {});
    const queue = [n];
    const distances = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const status = Array(n + 1).fill('not visited');
    const countMap = new Map([[n, 1]]);
    const restrictedPaths = (node) => {
        if (countMap.has(node)) return countMap.get(node);
        const count = graph[node].reduce((result, { edge }) => {
            const num = distances[edge] < distances[node] ? restrictedPaths(edge) : 0;

            return (result + num) % MODULO;
        }, 0);

        countMap.set(node, count);
        return count;
    };

    distances[n] = 0;
    while (queue.length) {
        const node = queue.shift();

        status[node] = 'start';
        for (const { edge, weight } of graph[node]) {
            if (distances[node] + weight >= distances[edge]) continue;
            distances[edge] = distances[node] + weight;
            status[edge] === 'not visited' && queue.push(edge);
            status[edge] === 'start' && queue.unshift(edge);
            status[edge] = 'visited';
        }
    }
    return restrictedPaths(1);
};
