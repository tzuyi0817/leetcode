/**
 * @param {number[][]} edges
 * @return {number}
 */
const findCenter = function (edges) {
  const [[a, b], [c, d]] = edges;

  if (a === c || a === d) return a;
  return b;
};
