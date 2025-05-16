/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
const getWordsInLongestSubsequence = function (words, groups) {
  const n = words.length;
  const dp = Array.from({ length: n }, () => null);
  const adjacency = Array.from({ length: n }, () => []);

  const isValidHammingDistance = (a, b) => {
    if (a.length !== b.length) return false;
    let distance = 0;

    for (const [index, element] of a.entries()) {
      if (element !== b[index]) distance += 1;
      if (distance > 1) return false;
    }

    return distance === 1;
  };

  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b < n; b++) {
      if (groups[a] === groups[b] || !isValidHammingDistance(words[a], words[b])) continue;

      adjacency[a].push(b);
    }
  }

  const getLongestSubsequence = index => {
    if (index >= n) return [];
    if (dp[index]) return dp[index];
    let result = [index];

    for (const next of adjacency[index]) {
      const subsequence = getLongestSubsequence(next);

      if (subsequence.length + 1 > result.length) {
        result = [index, ...subsequence];
      }
    }

    dp[index] = result;

    return result;
  };

  let longestSubsequence = [];

  for (let index = 0; index < n; index++) {
    const subsequence = getLongestSubsequence(index);

    if (subsequence.length > longestSubsequence.length) {
      longestSubsequence = subsequence;
    }
  }

  return longestSubsequence.map(index => words[index]);
};
