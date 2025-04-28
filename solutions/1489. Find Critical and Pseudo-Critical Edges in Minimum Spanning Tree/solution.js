/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const findCriticalAndPseudoCriticalEdges = function (n, edges) {
  const group = Array.from({ length: n });
  const rank = Array.from({ length: n });

  edges = edges.map((edge, index) => [...edge, index]);
  edges.sort((a, b) => a[2] - b[2]);

  const find = node => {
    if (group[node] !== node) {
      group[node] = find(group[node]);
    }

    return group[node];
  };

  const union = (a, b) => {
    const groupA = find(a);
    const groupB = find(b);

    if (groupA === groupB) return false;

    if (rank[groupA] > rank[groupB]) {
      group[groupB] = groupA;
    } else if (rank[groupA] < rank[groupB]) {
      group[groupA] = groupB;
    } else {
      group[groupB] = groupA;
      rank[groupA] += 1;
    }

    return true;
  };

  const restUnion = () => {
    for (let node = 0; node < n; node++) {
      group[node] = node;
      rank[node] = 0;
    }
  };

  const getMSTWeight = (deleteIndex = -1, outset) => {
    let mstWeight = 0;
    let useEdges = 0;

    restUnion();

    if (outset) {
      const [a, b, weight] = outset;

      union(a, b);
      mstWeight += weight;
      useEdges += 1;
    }

    for (const [a, b, weight, index] of edges) {
      if (deleteIndex === index || !union(a, b)) continue;

      mstWeight += weight;
      useEdges += 1;
    }

    return useEdges === n - 1 ? mstWeight : Number.MAX_SAFE_INTEGER;
  };

  const criticalEdges = [];
  const pseudoCriticalEdges = [];
  const mstWeight = getMSTWeight();

  for (const edge of edges) {
    const index = edge[3];

    if (getMSTWeight(index) > mstWeight) {
      criticalEdges.push(index);
    } else if (getMSTWeight(-1, edge) === mstWeight) {
      pseudoCriticalEdges.push(index);
    }
  }

  return [criticalEdges, pseudoCriticalEdges];
};
