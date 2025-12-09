/**
 * @param {string} s
 * @param {string} sub
 * @param {character[][]} mappings
 * @return {boolean}
 */
const matchReplacement = function (s, sub, mappings) {
  const n = s.length;
  const m = sub.length;
  const mappingMap = new Map();

  for (const [a, b] of mappings) {
    if (!mappingMap.has(a)) {
      mappingMap.set(a, new Set());
    }

    mappingMap.get(a).add(b);
  }

  const isMatchSub = start => {
    for (let index = 0; index < m; index++) {
      const a = sub[index];
      const b = s[start + index];
      const charSet = mappingMap.get(a) ?? new Set();

      if (a !== b && !charSet.has(b)) return false;
    }

    return true;
  };

  for (let index = 0; index <= n - m; index++) {
    if (isMatchSub(index)) {
      return true;
    }
  }

  return false;
};
