/**
 * @param {number[][]} edges
 * @param {number[]} patience
 * @return {number}
 */
const networkBecomesIdle = function (edges, patience) {
  const n = patience.length;
  const graph = edges.reduce((map, [a, b]) => {
    const serversA = map.get(a) ?? [];
    const serversB = map.get(b) ?? [];

    serversA.push(b);
    serversB.push(a);
    map.set(a, serversA);
    return map.set(b, serversB);
  }, new Map());
  const distances = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  let queue = [0];
  let result = 0;

  distances[0] = 0;

  while (queue.length) {
    const size = queue.length;
    const tempQueue = [];

    for (let index = 0; index < size; index++) {
      const fromServer = queue.pop();

      for (const toServer of graph.get(fromServer)) {
        if (distances[toServer] !== Number.MAX_SAFE_INTEGER) continue;
        distances[toServer] = distances[fromServer] + 1;
        tempQueue.push(toServer);
      }
    }
    queue = tempQueue;
  }
  for (let server = 1; server < n; server++) {
    const distance = distances[server];
    const resendCount = Math.floor((2 * distance - 1) / patience[server]);
    const lastSendSecond = resendCount * patience[server];

    result = Math.max(lastSendSecond + distance * 2, result);
  }
  return result + 1;
};
