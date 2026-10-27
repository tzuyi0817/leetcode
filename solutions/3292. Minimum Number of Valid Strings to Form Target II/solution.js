/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
const minValidStrings = function (words, target) {
  const n = words.length;
  const lpsList = [];
  let unmatchedPrefix = target.length;
  let result = 0;

  for (const word of words) {
    const lps = getLPS(`${word}#${target}`);

    lpsList.push(lps);
  }

  while (unmatchedPrefix) {
    let maxMatchSuffix = 0;

    for (let index = 0; index < n; index++) {
      const { length } = words[index];
      const matchSuffix = lpsList[index][length + unmatchedPrefix];

      maxMatchSuffix = Math.max(maxMatchSuffix, matchSuffix);
    }

    if (!maxMatchSuffix) return -1;

    unmatchedPrefix -= maxMatchSuffix;
    result += 1;
  }

  return result;
};

function getLPS(pattern) {
  const n = pattern.length;
  const lps = new Array(n).fill(0);
  let left = 0;

  for (let index = 1; index < n; index++) {
    while (left > 0 && pattern[index] !== pattern[left]) {
      left = lps[left - 1];
    }

    if (pattern[index] === pattern[left]) {
      left += 1;
      lps[index] = left;
    }
  }

  return lps;
}
