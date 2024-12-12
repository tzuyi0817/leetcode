/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const palindromePartition = function (s, k) {
  const n = s.length;
  const changes = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  for (let length = 2; length <= n; length++) {
    for (let start = 0; start + length - 1 < n; start++) {
      const end = start + length - 1;
      const isSame = s[start] === s[end];

      changes[start][end] = changes[start + 1][end - 1] + (isSame ? 0 : 1);
    }
  }
  const memo = new Map();

  const partition = (length, divide) => {
    if (divide === 1) return changes[0][length - 1];
    const key = `${length},${divide}`;

    if (memo.has(key)) return memo.get(key);
    let result = length;

    for (let index = divide - 1; index < length; index++) {
      const change = changes[index][length - 1];

      result = Math.min(partition(index, divide - 1) + change, result);
    }
    memo.set(key, result);
    return result;
  };

  return partition(n, k);
};
