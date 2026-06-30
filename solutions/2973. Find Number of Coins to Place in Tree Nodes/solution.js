/**
 * @param {number[][]} edges
 * @param {number[]} cost
 * @return {number[]}
 */
const placedCoins = function (edges, cost) {
  const n = cost.length;
  const tree = Array.from({ length: n }, () => []);
  const result = [];

  for (const [a, b] of edges) {
    tree[a].push(b);
    tree[b].push(a);
  }

  const dfs = (node, prev) => {
    const nodeCost = new NodeCost(cost[node]);

    for (const child of tree[node]) {
      if (child === prev) continue;

      const childCost = dfs(child, node);

      nodeCost.update(childCost);
    }

    result[node] = nodeCost.getMaxProduct();

    return nodeCost;
  };

  dfs(0, -1);

  return result;
};

class NodeCost {
  constructor(cost) {
    this.maxPosCosts = [];
    this.minNegCosts = [];

    if (cost > 0) {
      this.maxPosCosts.push(cost);
    } else {
      this.minNegCosts.push(cost);
    }
  }

  update(childCost) {
    this.nodes += childCost.nodes;

    if (childCost.maxPosCosts.length) {
      this.maxPosCosts.push(...childCost.maxPosCosts);
      this.maxPosCosts.sort((a, b) => b - a);
      this.maxPosCosts = this.maxPosCosts.slice(0, 3);
    }

    if (childCost.minNegCosts.length) {
      this.minNegCosts.push(...childCost.minNegCosts);
      this.minNegCosts.sort((a, b) => a - b);
      this.minNegCosts = this.minNegCosts.slice(0, 2);
    }
  }

  getMaxProduct() {
    if (this.nodes < 3) return 1;

    if (!this.maxPosCosts.length) return 0;

    let result = 0;

    if (this.maxPosCosts.length === 3) {
      const [a, b, c] = this.maxPosCosts;
      const product = a * b * c;

      result = Math.max(product, result);
    }

    if (this.minNegCosts.length === 2) {
      const [a, b] = this.minNegCosts;
      const product = this.maxPosCosts[0] * a * b;

      result = Math.max(product, result);
    }

    return result;
  }
  nodes = 1;
}
