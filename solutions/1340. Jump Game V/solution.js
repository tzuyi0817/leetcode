/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
const maxJumps = function (arr, d) {
  const n = arr.length;
  const memo = Array.from({ length: n }, () => 0);
  let result = 0;

  const jumpToTarget = node => {
    if (memo[node]) return memo[node];
    const height = arr[node];
    let result = 0;

    for (let index = node + 1; index <= Math.min(node + d, n - 1); index++) {
      if (height <= arr[index]) break;

      result = Math.max(result, jumpToTarget(index));
    }

    for (let index = node - 1; index >= Math.max(0, node - d); index--) {
      if (height <= arr[index]) break;

      result = Math.max(result, jumpToTarget(index));
    }
    result += 1;
    memo[node] = result;

    return result;
  };

  for (let index = 0; index < n; index++) {
    result = Math.max(jumpToTarget(index), result);
  }
  return result;
};
