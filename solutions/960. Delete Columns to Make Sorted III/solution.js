/**
 * @param {string[]} strs
 * @return {number}
 */
const minDeletionSize = function (strs) {
  const m = strs[0].length;
  const dp = Array.from({ length: m }, () => 1);

  const isSorted = (a, b) => {
    for (const str of strs) {
      if (str[a] < str[b]) return false;
    }

    return true;
  };

  for (let a = 1; a < m; a++) {
    for (let b = 0; b < a; b++) {
      if (!isSorted(a, b)) continue;

      dp[a] = Math.max(dp[b] + 1, dp[a]);
    }
  }

  return m - Math.max(...dp);
};
