/**
 * @param {number[]} parents
 * @param {number[]} nums
 * @return {number[]}
 */
const smallestMissingValueSubtree = function (parents, nums) {
  const n = parents.length;
  const result = Array.from({ length: n }, () => 1);
  const oneNode = nums.indexOf(1);

  if (oneNode === -1) return result;

  const tree = Array.from({ length: n }, () => []);
  const visited = new Set();
  let currentNode = oneNode;
  let minMiss = 1;
  let prevNode = -1;

  for (let node = 1; node < n; node++) {
    const parent = parents[node];

    tree[parent].push(node);
  }

  const visitNode = node => {
    visited.add(nums[node]);

    for (const neighbor of tree[node]) {
      visitNode(neighbor);
    }
  };

  while (currentNode !== -1) {
    visited.add(nums[currentNode]);

    for (const node of tree[currentNode]) {
      if (node === prevNode) continue;

      visitNode(node);
    }

    while (visited.has(minMiss)) {
      minMiss += 1;
    }

    result[currentNode] = minMiss;
    prevNode = currentNode;
    currentNode = parents[currentNode];
  }

  return result;
};
