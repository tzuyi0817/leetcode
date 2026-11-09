/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
const busiestServers = function (k, arrival, load) {
  const n = arrival.length;
  const servers = Array.from({ length: k }, () => 0);
  const minHeap = new MinHeap(({ server, idleTime }) => idleTime || server);
  let prependIdleHeap = new MinHeap();
  let appendIdleHeap = new MinHeap();

  for (let index = 0; index < k; index++) {
    prependIdleHeap.push(index);
  }

  for (let index = 0; index < n; index++) {
    const time = arrival[index];
    const target = index % k;

    if (!target) {
      appendIdleHeap = prependIdleHeap;
      prependIdleHeap = new MinHeap();
    }

    while (minHeap.size() && minHeap.top().idleTime <= time) {
      const { server } = minHeap.pop();

      if (server < target) {
        prependIdleHeap.push(server);
      } else {
        appendIdleHeap.push(server);
      }
    }

    while (appendIdleHeap.size() && appendIdleHeap.top() < target) {
      const server = appendIdleHeap.pop();

      prependIdleHeap.push(server);
    }

    const server = appendIdleHeap.pop() ?? prependIdleHeap.pop();

    if (server === null) continue;

    const idleTime = time + load[index];

    minHeap.push({ server, idleTime });
    servers[server] += 1;
  }

  const maxRequest = Math.max(...servers);
  const result = [];

  for (let index = 0; index < k; index++) {
    if (servers[index] === maxRequest) {
      result.push(index);
    }
  }

  return result;
};
