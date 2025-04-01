/**
 * @param {number[]} nums
 * @return {number}
 */
const numOfWays = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const comb = Array.from({ length: n }, () => new Array(n).fill(1n));

  for (let a = 2; a < n; a++) {
    for (let b = 1; b < a; b++) {
      comb[a][b] = (comb[a - 1][b - 1] + comb[a - 1][b]) % MODULO;
    }
  }

  const countWays = nodes => {
    if (nodes.length <= 2) return 1n;
    const root = nodes[0];
    const leftNodes = [];
    const rightNodes = [];

    for (let index = 1; index < nodes.length; index++) {
      const node = nodes[index];

      node > root ? rightNodes.push(node) : leftNodes.push(node);
    }

    const leftCount = countWays(leftNodes);
    const rightCount = countWays(rightNodes);
    const combination = comb[nodes.length - 1][leftNodes.length];

    return (combination * leftCount * rightCount) % MODULO;
  };

  return Number(countWays(nums)) - 1;
};
