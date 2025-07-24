/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
const minimumScore = function (nums, edges) {
  const n = nums.length;
  const tree = Array.from({ length: n }, () => []);
  const children = Array.from({ length: n }, (_, index) => new Set([index]));
  const xors = nums.reduce((result, num) => result ^ num, 0);
  const subXors = [...nums];
  let result = Number.MAX_SAFE_INTEGER;

  for (const [a, b] of edges) {
    tree[a].push(b);
    tree[b].push(a);
  }

  const dfsTree = (node, prev) => {
    for (const neighbor of tree[node]) {
      if (neighbor === prev) continue;
      const [neighborXor, neighborChildren] = dfsTree(neighbor, node);

      subXors[node] ^= neighborXor;

      for (const child of neighborChildren) {
        children[node].add(child);
      }
    }

    return [subXors[node], children[node]];
  };

  dfsTree(0, -1);

  for (let edgeA = 1; edgeA < n - 1; edgeA++) {
    let [a, b] = edges[edgeA];

    if (children[a].has(b)) {
      [a, b] = [b, a];
    }

    for (let edgeB = 0; edgeB < edgeA; edgeB++) {
      const candidates = [];
      let [c, d] = edges[edgeB];

      if (children[c].has(d)) {
        [c, d] = [d, c];
      }

      if (a !== c && children[a].has(c)) {
        candidates.push(subXors[c], subXors[a] ^ subXors[c], xors ^ subXors[a]);
      } else if (a !== c && children[c].has(a)) {
        candidates.push(subXors[a], subXors[c] ^ subXors[a], xors ^ subXors[c]);
      } else {
        candidates.push(subXors[a], subXors[c], xors ^ subXors[a] ^ subXors[c]);
      }

      const minXor = Math.min(...candidates);
      const maxXor = Math.max(...candidates);

      result = Math.min(maxXor - minXor, result);
    }
  }

  return result;
};
