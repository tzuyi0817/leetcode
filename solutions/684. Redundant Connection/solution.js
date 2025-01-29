/**
 * @param {number[][]} edges
 * @return {number[]}
 */
const findRedundantConnection = function (edges) {
  const n = edges.length;
  const groups = Array.from({ length: n + 1 }, (_, index) => index);
  const ranks = Array.from({ length: n + 1 }, () => 1);

  const find = node => {
    const group = groups[node];

    return group === node ? node : find(group);
  };

  const union = (a, b) => {
    const x = find(a);
    const y = find(b);

    if (x === y) return false;
    if (ranks[x] > ranks[y]) {
      groups[y] = x;
    } else if (ranks[x] < ranks[y]) {
      groups[x] = y;
    } else {
      groups[y] = x;
      ranks[x] += 1;
    }
    return true;
  };

  for (const [a, b] of edges) {
    if (!union(a, b)) return [a, b];
  }
  return [];
};
