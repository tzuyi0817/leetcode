/**
 * @param {number[][]} rectangles
 * @return {number}
 */
const interchangeableRectangles = function (rectangles) {
  const interchangeMap = rectangles.reduce((map, [width, height]) => {
    const division = width / height;
    const count = map.get(division) ?? 0;

    return map.set(division, count + 1);
  }, new Map());
  let result = 0;

  for (const count of interchangeMap.values()) {
    result += (count * (count - 1)) / 2;
  }

  return result;
};
