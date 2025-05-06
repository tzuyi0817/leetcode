/**
 * @param {number[][]} segments
 * @return {number[][]}
 */
const splitPainting = function (segments) {
  const paintMap = segments.reduce((map, [start, end, color]) => {
    map[start] = (map[start] ?? 0) + color;
    map[end] = (map[end] ?? 0) - color;

    return map;
  }, {});
  const paints = Object.keys(paintMap).sort((a, b) => a - b);
  let currentMix = 0;
  let left = 0;

  return paints.reduce((result, right) => {
    currentMix > 0 && result.push([+left, +right, currentMix]);
    left = right;
    currentMix += paintMap[right];
    return result;
  }, []);
};
