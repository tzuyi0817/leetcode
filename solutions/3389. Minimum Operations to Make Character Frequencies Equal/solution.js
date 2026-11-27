/**
 * @param {string} s
 * @return {number}
 */
const makeStringGood = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const counts = Array.from({ length: 26 }, () => 0);

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  const maxCount = Math.max(...counts);
  let result = Number.MAX_SAFE_INTEGER;

  for (let target = 1; target <= maxCount; target++) {
    const operations = getMinOperations(counts, target);

    result = Math.min(operations, result);
  }

  return result;
};

function getMinOperations(counts, target) {
  const dp = new Array(26).fill(-1);

  const dfs = code => {
    if (code >= 26) return 0;

    if (dp[code] !== -1) return dp[code];

    const count = counts[code];
    const diff = Math.abs(target - count);
    let result = Math.min(diff, count) + dfs(code + 1);

    if (code <= 24 && counts[code + 1] < target) {
      const nextCount = counts[code + 1];
      const currentOperations = count <= target ? count : count - target;
      const nextOperations = target - nextCount;
      const operations = Math.max(currentOperations, nextOperations) + dfs(code + 2);

      result = Math.min(operations, result);
    }

    dp[code] = result;

    return result;
  };

  return dfs(0);
}
