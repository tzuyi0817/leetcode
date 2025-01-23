/**
 * @param {number} n
 * @param {number[]} speed
 * @param {number[]} efficiency
 * @param {number} k
 * @return {number}
 */
const maxPerformance = function (n, speed, efficiency, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const engineers = [];
  const speedQueue = new MinPriorityQueue();
  let totalSpeed = 0n;
  let result = 0n;

  for (let index = 0; index < n; index++) {
    engineers.push({ speed: speed[index], efficiency: efficiency[index] });
  }

  engineers.sort((a, b) => b.efficiency - a.efficiency);

  for (const engineer of engineers) {
    totalSpeed += BigInt(engineer.speed);
    speedQueue.enqueue(engineer.speed);

    if (speedQueue.size() > k) {
      totalSpeed -= BigInt(speedQueue.dequeue().element);
    }
    const performance = totalSpeed * BigInt(engineer.efficiency);

    if (performance <= result) continue;

    result = performance;
  }
  return Number(result % MODULO);
};
