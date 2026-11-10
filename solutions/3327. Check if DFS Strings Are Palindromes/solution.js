/**
 * @param {number[]} parent
 * @param {string} s
 * @return {boolean[]}
 */
const findAnswer = function (parent, s) {
  const n = parent.length;
  const tree = Array.from({ length: n }, () => []);
  const start = Array.from({ length: n }, () => -1);
  const end = Array.from({ length: n }, () => -1);
  let dfsStr = '';

  for (let node = 1; node < n; node++) {
    tree[parent[node]].push(node);
  }

  const dfs = node => {
    start[node] = dfsStr.length;

    for (const child of tree[node]) {
      dfs(child);
    }

    dfsStr += s[node];
    end[node] = dfsStr.length - 1;
  };

  dfs(0);

  const palindromes = manacher(`@#${dfsStr.split('').join('#')}#$`);
  const result = [];

  for (let node = 0; node < n; node++) {
    const len = end[node] - start[node] + 1;
    const center = start[node] + end[node] + 2;

    result[node] = palindromes[center] >= len;
  }

  return result;
};

function manacher(s) {
  const n = s.length;
  const result = Array.from({ length: n }, () => 0);
  let center = 0;

  for (let index = 1; index < n - 1; index++) {
    const rightBoundary = center + result[center];

    if (rightBoundary > index) {
      const mirrorIndex = center - (index - center);

      result[index] = Math.min(result[mirrorIndex], rightBoundary - index);
    }

    while (s[index - 1 - result[index]] === s[index + 1 + result[index]]) {
      result[index] += 1;
    }

    if (index + result[index] > rightBoundary) {
      center = index;
    }
  }

  return result;
}
