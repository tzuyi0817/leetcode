/**
 * @param {number[][]} rectangles
 * @return {number}
 */
const rectangleArea = function (rectangles) {
  const MODULO = BigInt(10 ** 9 + 7);
  const events = [];

  for (const [x1, y1, x2, y2] of rectangles) {
    events.push({ x: x1, y1, y2, type: 'start' });
    events.push({ x: x2, y1, y2, type: 'end' });
  }
  events.sort((a, b) => a.x - b.x);

  const pairsY = [];
  let prevX = 0;
  let result = 0n;

  const getHeight = () => {
    let prevY = 0;
    let height = 0;

    for (const { y1, y2 } of pairsY) {
      prevY = Math.max(y1, prevY);
      if (prevY >= y2) continue;

      height += y2 - prevY;
      prevY = y2;
    }
    return height;
  };

  for (const { x, y1, y2, type } of events) {
    if (x > prevX) {
      const width = x - prevX;
      const height = getHeight();
      const area = (BigInt(width) * BigInt(height)) % MODULO;

      result = (result + area) % MODULO;
      prevX = x;
    }
    if (type === 'start') {
      pairsY.push({ y1, y2 });
      pairsY.sort((a, b) => a.y1 - b.y1);
      continue;
    }
    const index = pairsY.findIndex(pairs => pairs.y1 === y1 && pairs.y2 === y2);

    pairsY.splice(index, 1);
  }
  return result;
};
