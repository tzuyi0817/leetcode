/**
 * @param {number[]} parents
 * @param {number[][]} queries
 * @return {number[]}
 */
const maxGeneticDifference = function (parents, queries) {
  const n = parents.length;
  const m = queries.length;
  const maxVal = Math.max(n, ...queries.map(([_, val]) => val));
  const bits = Math.ceil(Math.log2(maxVal));
  const tree = Array.from({ length: n }, () => []);
  const trie = new Trie(bits);
  const nodeQueries = Array.from({ length: n }, () => []);
  const result = Array.from({ length: m });
  let root = -1;

  const dfsTree = node => {
    trie.insert(node);

    for (const { index, val } of nodeQueries[node]) {
      result[index] = trie.maxXor(val);
    }

    for (const child of tree[node]) {
      dfsTree(child);
    }

    trie.remove(node);
  };

  for (let node = 0; node < n; node++) {
    const parent = parents[node];

    if (parent === -1) {
      root = node;
    } else {
      tree[parent].push(node);
    }
  }

  for (let index = 0; index < m; index++) {
    const [node, val] = queries[index];

    nodeQueries[node].push({ index, val });
  }

  dfsTree(root);

  return result;
};

class Node {
  constructor() {
    this.children = {};
    this.count = 0;
  }
}

class Trie {
  constructor(bits) {
    this.root = new Node();
    this.bits = bits;
  }

  insert(num) {
    let node = this.root;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!node.children[bit]) {
        node.children[bit] = new Node();
      }

      node = node.children[bit];
      node.count += 1;
    }
  }

  remove(num) {
    let node = this.root;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (num >> index) & 1;

      node = node.children[bit];
      node.count -= 1;
    }
  }

  maxXor(val) {
    let node = this.root;
    let result = 0;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (val >> index) & 1;
      const toggleBit = bit ^ 1;

      if (node.children[toggleBit] && node.children[toggleBit].count > 0) {
        node = node.children[toggleBit];
        result |= 1 << index;
      } else {
        node = node.children[bit];
      }
    }

    return result;
  }
}
