/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
const busiestServers = function (k, arrival, load) {
  const n = arrival.length;
  const servers = Array.from({ length: k }, () => 0);
  const busyServers = new MinPriorityQueue(({ server, idleTime }) => idleTime || server);
  let beforeModIdleServers = new MinPriorityQueue();
  let afterModIdleServers = new MinPriorityQueue();

  for (let server = 0; server < k; server++) {
    beforeModIdleServers.enqueue(server);
  }

  for (let index = 0; index < n; index++) {
    const time = arrival[index];
    const idleTime = time + load[index];
    const modServer = index % k;

    if (!modServer) {
      afterModIdleServers = beforeModIdleServers;
      beforeModIdleServers = new MinPriorityQueue();
    }

    while (busyServers.size() && busyServers.front().idleTime <= time) {
      const { server } = busyServers.dequeue();

      server < modServer ? beforeModIdleServers.enqueue(server) : afterModIdleServers.enqueue(server);
    }

    while (afterModIdleServers.size() && afterModIdleServers.front() < modServer) {
      const server = afterModIdleServers.dequeue();

      beforeModIdleServers.enqueue(server);
    }

    const server = afterModIdleServers.dequeue() ?? beforeModIdleServers.dequeue();

    if (server === null) continue;

    servers[server] += 1;
    busyServers.enqueue({ server, idleTime });
  }

  const maxRequest = Math.max(...servers);
  const result = [];

  for (let server = 0; server < k; server++) {
    if (servers[server] < maxRequest) continue;

    result.push(server);
  }

  return result;
};
