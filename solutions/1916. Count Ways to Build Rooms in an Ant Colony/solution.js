/**
 * @param {number[]} prevRoom
 * @return {number}
 */
const waysToBuildRooms = function (prevRoom) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = prevRoom.length;
  const graph = Array.from({ length: n }, () => []);
  const fact = Array.from({ length: n + 1 }, () => 1n);
  const inv = Array.from({ length: n + 1 }, () => 1n);
  const invFact = Array.from({ length: n + 1 }, () => 1n);

  for (let index = 1; index < n; index++) {
    graph[prevRoom[index]].push(index);
  }

  for (let count = 2; count <= n; count++) {
    const value = BigInt(count);
    const mult = MODULO / value;
    const remainder = MODULO % value;

    inv[count] = MODULO - ((mult * inv[Number(remainder)]) % MODULO);
  }

  for (let count = 1; count <= n; count++) {
    const value = BigInt(count);

    fact[count] = (fact[count - 1] * value) % MODULO;
    invFact[count] = (invFact[count - 1] * inv[count]) % MODULO;
  }

  const nCk = (n, k) => {
    return (((fact[n] * invFact[k]) % MODULO) * invFact[n - k]) % MODULO;
  };

  const buildRooms = node => {
    let ways = 1n;
    let totalSize = 0;

    for (const child of graph[node]) {
      const next = buildRooms(child);

      ways = (ways * next.ways) % MODULO;
      ways = (ways * nCk(totalSize + next.totalSize, next.totalSize)) % MODULO;
      totalSize += next.totalSize;
    }

    return { ways, totalSize: totalSize + 1 };
  };

  return Number(buildRooms(0).ways);
};
