/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number[]}
 */
const getCoprimes = function (nums, edges) {
  const n = nums.length;
  const tree = Array.from({ length: n }, () => []);
  const maxNum = Math.max(...nums);
  const stack = Array.from({ length: maxNum + 1 }, () => []);
  const result = Array.from({ length: n }, () => -1);

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const getAncestor = node => {
    let maxDepth = -1;
    let result = -1;

    for (let num = 1; num <= maxNum; num++) {
      if (!stack[num].length) continue;
      const ancestor = stack[num].at(-1);

      if (ancestor.depth > maxDepth && gcd(nums[node], num) === 1) {
        maxDepth = ancestor.depth;
        result = ancestor.node;
      }
    }

    return result;
  };

  const dfsTree = (node, prev, depth) => {
    const num = nums[node];

    result[node] = getAncestor(node);
    stack[num].push({ node, depth });

    for (const neighbor of tree[node]) {
      if (neighbor === prev) continue;

      dfsTree(neighbor, node, depth + 1);
    }

    stack[num].pop();
  };

  dfsTree(0, -1, 0);

  return result;
};
