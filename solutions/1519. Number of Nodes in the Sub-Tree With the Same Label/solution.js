/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
const countSubTrees = function (n, edges, labels) {
  const result = [];
  const visited = new Set([0]);
  const edgesMap = edges.reduce((map, [a, b]) => {
    const edgeA = map.get(a) ?? [];
    const edgeB = map.get(b) ?? [];

    edgeA.push(b);
    edgeB.push(a);
    map.set(a, edgeA);
    return map.set(b, edgeB);
  }, new Map());

  const countEdges = node => {
    const label = labels[node];
    const targetEdges = edgesMap.get(node) ?? [];
    const countMap = targetEdges.reduce(
      (map, edge) => {
        if (visited.has(edge)) return map;
        visited.add(edge);
        const currentCountMap = countEdges(edge);

        currentCountMap.forEach((value, key) => {
          const count = map.get(key) ?? 0;
          map.set(key, count + value);
        });
        return map;
      },
      new Map([[label, 1]]),
    );

    result[node] = countMap.get(label);
    return countMap;
  };

  countEdges(0);
  return result;
};
