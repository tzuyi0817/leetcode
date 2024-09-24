/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
const numBusesToDestination = function (routes, source, target) {
  if (source === target) return 0;
  const stopsMap = routes.reduce((map, stops, bus) => {
    for (const stop of stops) {
      const buses = map.get(stop) ?? [];

      buses.push(bus);
      map.set(stop, buses);
    }
    return map;
  }, new Map());
  const visitedBus = new Set();
  const visitedStop = new Set([source]);
  let queue = [source];
  let result = 1;

  while (queue.length) {
    const nextQueue = [];

    for (let index = 0; index < queue.length; index++) {
      const buses = stopsMap.get(queue[index]) ?? [];

      for (const bus of buses) {
        if (visitedBus.has(bus)) continue;
        visitedBus.add(bus);

        for (const stop of routes[bus]) {
          if (stop === target) return result;
          if (visitedStop.has(stop)) continue;
          visitedStop.add(stop);
          nextQueue.push(stop);
        }
      }
    }
    queue = nextQueue;
    result += 1;
  }
  return -1;
};
