/**
 * @param {number[][]} rectangles
 * @return {number}
 */
var interchangeableRectangles = function(rectangles) {
    const interchangeMap = rectangles.reduce((map, [width, height]) => {
        const division = width / height;
        const count = map.get(division) ?? 0;

        return map.set(division, count + 1);
    }, new Map());
    let result = 0;

    for (const [_, count] of interchangeMap) {
        result += count * (count - 1) / 2;
    }
    return result;
};