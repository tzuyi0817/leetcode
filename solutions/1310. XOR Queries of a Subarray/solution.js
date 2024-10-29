/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
const xorQueries = function (arr, queries) {
  const n = arr.length;
  const prefixXor = new Array(n).fill(0);

  prefixXor[-1] = 0;

  for (let index = 0; index < n; index++) {
    prefixXor[index] = arr[index] ^ prefixXor[index - 1];
  }

  return queries.map(([left, right]) => {
    return prefixXor[right] ^ prefixXor[left - 1];
  });
};
