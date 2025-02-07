/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
const queryResults = function (limit, queries) {
  const colorMap = new Map();
  const ballMap = new Map();

  return queries.map(([ball, color]) => {
    const originColor = ballMap.get(ball);

    if (originColor === color) return colorMap.size;

    if (originColor !== undefined) {
      const count = colorMap.get(originColor);

      count > 1 ? colorMap.set(originColor, count - 1) : colorMap.delete(originColor);
    }
    const count = colorMap.get(color) ?? 0;

    colorMap.set(color, count + 1);
    ballMap.set(ball, color);

    return colorMap.size;
  });
};
