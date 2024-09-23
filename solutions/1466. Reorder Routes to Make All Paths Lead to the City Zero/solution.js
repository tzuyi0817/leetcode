/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function(n, connections) {
    const routesSet = new Set();
    const connectionMap = connections.reduce((map, [from, to]) => {
        const connectionFrom = map.get(from) ?? [];
        const connectionTo = map.get(to) ?? [];

        routesSet.add(`${from}_${to}`);
        connectionFrom.push(to);
        connectionTo.push(from);
        map.set(from, connectionFrom);
        return map.set(to, connectionTo);
    }, new Map());

    const getReorderCount = (route, parent) => {
        const currentConnections = connectionMap.get(route);

        return currentConnections.reduce((count, connection) => {
            if (parent === connection) return count;
            const isReorder = routesSet.has(`${route}_${connection}`);

            return count + getReorderCount(connection, route) + (isReorder ? 1 : 0);
        }, 0);
    };

    return getReorderCount(0, -1);
};
