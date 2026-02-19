/**
 * @param {number[][]} queries
 * @return {number[]}
 */
const cycleLengthQueries = function (queries) {
  const getToAncestorDepth = (a, b) => {
    let depth = 0;

    while (a !== b) {
      if (a > b) {
        a >>= 1;
      } else {
        b >>= 1;
      }

      depth += 1;
    }

    return depth;
  };

  return queries.map(([a, b]) => {
    const depth = getToAncestorDepth(a, b);

    return depth + 1;
  });
};
