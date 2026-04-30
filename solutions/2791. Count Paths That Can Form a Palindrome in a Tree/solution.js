/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
const countPalindromePaths = function (parent, s) {
  const n = parent.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const tree = Array.from({ length: n }, () => []);
  const maskMap = new Map();

  const getPalindromeCount = (node, mask) => {
    let result = 0;

    for (const child of tree[node]) {
      const code = s[child].charCodeAt(0) - BASE_CODE;
      const nextMask = mask ^ (1 << code);
      const count = maskMap.get(nextMask) ?? 0;

      for (let index = 0; index < 26; index++) {
        const targetMask = nextMask ^ (1 << index);

        if (!maskMap.has(targetMask)) continue;

        result += maskMap.get(targetMask);
      }

      result += count;
      maskMap.set(nextMask, count + 1);
      result += getPalindromeCount(child, nextMask);
    }

    return result;
  };

  for (let index = 1; index < n; index++) {
    const node = parent[index];

    tree[node].push(index);
  }

  maskMap.set(0, 1);

  return getPalindromeCount(0, 0);
};
