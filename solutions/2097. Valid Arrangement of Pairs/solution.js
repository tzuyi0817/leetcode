/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
const validArrangement = function (pairs) {
  const indegreeMap = new Map();
  const outdegreeMap = new Map();
  const graph = new Map();
  const result = [];

  const findFirstNode = () => {
    for (const node of graph.keys()) {
      const inCount = indegreeMap.get(node) ?? 0;
      const outCount = outdegreeMap.get(node) ?? 0;

      if (inCount - outCount === 1) {
        return node;
      }
    }

    return pairs[0][0];
  };

  for (const [start, end] of pairs) {
    if (!graph.has(start)) {
      graph.set(start, []);
    }

    const inCount = indegreeMap.get(start) ?? 0;
    const outCount = outdegreeMap.get(end) ?? 0;

    graph.get(start).push(end);
    indegreeMap.set(start, inCount + 1);
    outdegreeMap.set(end, outCount + 1);
  }

  const firstNode = findFirstNode();

  const euler = node => {
    const stack = graph.get(node) ?? [];

    while (stack.length) {
      const end = stack.pop();

      euler(end);
      result.push([node, end]);
    }
  };

  euler(firstNode);

  return result.reverse();
};
