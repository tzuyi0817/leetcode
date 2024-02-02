/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function(n, roads) {
    const MODULO = 10 ** 9 + 7;
    const graph = Array(n).fill('').map(_ => []);
    const times = Array(n).fill(Number.MAX_SAFE_INTEGER);
    const ways = Array(n).fill(0);
    const queue = new MinPriorityQueue({ priority: ({ time }) => time });

    for (const [a, b, time] of roads) {
        graph[a].push({ city: b, time });
        graph[b].push({ city: a, time });
    }
    times[0] = 0;
    ways[0] = 1;
    queue.enqueue({ city: 0, time: 0 });

    while (!queue.isEmpty()) {
        const { city, time } = queue.dequeue().element;

        if (time > times[city]) continue;
        for (const arrive of graph[city]) {
            const totalTime = arrive.time + time;

            if (totalTime > times[arrive.city]) continue;
            if (totalTime < times[arrive.city]) {
                times[arrive.city] = totalTime;
                ways[arrive.city] = ways[city];
                queue.enqueue({ city: arrive.city, time: totalTime });
                continue;
            }
            ways[arrive.city] += ways[city];
            ways[arrive.city] %= MODULO;
        }
    }
    return ways[n - 1];
};