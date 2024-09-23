/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function(graph) {
    const n = graph.length;
    const fullAccess = (1 << n) - 1;
    const seen = Array(n).fill('').map(_ => Array(1 << n).fill(false));
    let queue = [];
    let result = 0;

    for (let index = 0; index < n; index++) {
        const visited = 1 << index;

        queue.push({ node: index, visited });
        seen[index][visited] = true;
    }

    while (queue.length) {
        const nextQueue = [];

        for (const { node, visited } of queue) {
            for (const next of graph[node]) {
                const nextVisited = visited | (1 << next);

                if (nextVisited === fullAccess) return result + 1;
                if (seen[next][nextVisited]) continue;
                nextQueue.push({ node: next, visited: nextVisited });
                seen[next][nextVisited] = true;
            }
        }
        result += 1;
        queue = nextQueue;
    }
    return 0;
};