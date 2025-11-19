/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
const deleteDuplicateFolder = function (paths) {
  const root = new TrieNode();
  const folderMap = new Map();
  const result = [];

  const serialize = node => {
    if (node.children.size === 0) return '';

    const folders = [];
    const entries = [...node.children.entries()].toSorted();

    for (const [name, children] of entries) {
      const item = `${name}(${serialize(children)})`;

      folders.push(item);
    }
    const key = folders.join(',');

    if (folderMap.has(key)) {
      folderMap.get(key).deleted = true;
      node.deleted = true;
    } else {
      folderMap.set(key, node);
    }

    return key;
  };

  const dfs = (node, path) => {
    for (const [name, children] of node.children) {
      if (children.deleted) continue;

      path.push(name);
      result.push([...path]);
      dfs(children, path);
      path.pop();
    }
  };

  for (const path of paths) {
    let node = root;

    for (const folder of path) {
      if (!node.children.has(folder)) {
        node.children.set(folder, new TrieNode(folder));
      }

      node = node.children.get(folder);
    }
  }

  serialize(root);
  dfs(root, []);

  return result;
};

class TrieNode {
  constructor(name = '') {
    this.name = name;
    this.children = new Map();
    this.deleted = false;
  }
}
