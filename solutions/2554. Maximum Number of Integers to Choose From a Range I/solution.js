/**
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */
const maxCount = function (banned, n, maxSum) {
  const bannedSet = new Set(banned);
  let sum = 0;
  let result = 0;

  for (let num = 1; num <= n; num++) {
    if (bannedSet.has(num)) continue;

    sum += num;
    if (sum > maxSum) return result;
    result += 1;
  }
  return result;
};
