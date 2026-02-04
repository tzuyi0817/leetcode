/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[]}
 */
const treeQueries = function (root, queries) {
  const maxHeightMap = new Map();
  const heightMap = new Map();

  const getHeight = node => {
    if (!node) return 0;

    const { val, left, right } = node;

    if (heightMap.has(val)) return heightMap.get(val);

    const height = 1 + Math.max(getHeight(left), getHeight(right));

    heightMap.set(val, height);

    return height;
  };

  const dfs = (node, depth, maxHeight) => {
    if (!node) return;

    const { val, left, right } = node;

    maxHeightMap.set(val, maxHeight);
    dfs(left, depth + 1, Math.max(maxHeight, depth + getHeight(right)));
    dfs(right, depth + 1, Math.max(maxHeight, depth + getHeight(left)));
  };

  dfs(root, 0, 0);

  return queries.map(query => maxHeightMap.get(query));
};
