/**
 * @param {string} expression
 * @return {string[]}
 */
const braceExpansionII = function (expression) {
  const n = expression.length;

  const mergeGroup = (groupA, groupB) => {
    if (!groupA.length) return groupB;
    const result = [];

    for (const wordA of groupA) {
      for (const wordB of groupB) {
        result.push(`${wordA}${wordB}`);
      }
    }
    return result;
  };

  const braceWord = (start, end) => {
    const result = new Set();
    const groups = [[]];
    let left = start;
    let layer = 0;

    for (let index = start; index <= end; index++) {
      const current = expression[index];

      if (current === '{') {
        if (layer === 0) {
          left = index + 1;
        }
        layer += 1;
      } else if (current === '}') {
        if (layer === 1) {
          const group = mergeGroup(groups.at(-1), braceWord(left, index - 1));

          groups[groups.length - 1] = group;
        }
        layer -= 1;
      } else if (current === ',' && layer === 0) {
        groups.push([]);
      } else if (layer === 0) {
        const group = mergeGroup(groups.at(-1), [current]);

        groups[groups.length - 1] = group;
      }
    }

    for (const group of groups) {
      for (const word of group) {
        result.add(word);
      }
    }
    return [...result];
  };

  return braceWord(0, n - 1).toSorted();
};
