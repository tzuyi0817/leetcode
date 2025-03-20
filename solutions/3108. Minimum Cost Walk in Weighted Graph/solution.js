/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
const minimumCost = function (n, edges, query) {
  const group = Array.from({ length: n }, (_, index) => index);
  const ranks = Array.from({ length: n }, () => 0);
  const costs = Array.from({ length: n }, () => -1);

  const find = x => {
    if (group[x] === x) return x;

    return (group[x] = find(group[x]));
  };

  const union = (x, y, w) => {
    const groupX = find(x);
    const groupY = find(y);
    const cost = costs[groupX] & costs[groupY] & w;

    costs[groupX] = cost;
    costs[groupY] = cost;

    if (groupX === groupY) return false;
    if (ranks[groupX] > ranks[groupY]) {
      group[groupY] = groupX;
    } else if (ranks[groupX] < ranks[groupY]) {
      group[groupX] = groupY;
    } else {
      group[groupY] = groupX;
      ranks[groupX] += 1;
    }

    return true;
  };

  for (const [u, v, w] of edges) {
    union(u, v, w);
  }

  return query.map(([x, y]) => {
    const groupX = find(x);
    const groupY = find(y);

    return groupX === groupY ? costs[groupX] : -1;
  });
};
