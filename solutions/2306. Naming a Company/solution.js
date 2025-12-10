/**
 * @param {string[]} ideas
 * @return {number}
 */
const distinctNames = function (ideas) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const suffixes = Array.from({ length: 26 }, () => new Set());
  let result = 0;

  for (const idea of ideas) {
    const suffix = idea.slice(1);
    const code = idea.charCodeAt(0) - BASE_CODE;

    suffixes[code].add(suffix);
  }

  for (let a = 0; a < 25; a++) {
    for (let b = a + 1; b < 26; b++) {
      let count = 0;

      for (const suffix of suffixes[a]) {
        if (suffixes[b].has(suffix)) {
          count += 1;
        }
      }

      result += 2 * (suffixes[a].size - count) * (suffixes[b].size - count);
    }
  }

  return result;
};
