/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
const getLongestSubsequence = function (words, groups) {
  const n = groups.length;
  const subsequence = [];

  for (let index = 0; index < n; index++) {
    const group = groups[index];

    if (groups[subsequence.at(-1)] !== group) {
      subsequence.push(index);
    }
  }

  return subsequence.map(index => words[index]);
};
