/**
 * @param {number[][]} squares
 * @return {number}
 */
const separateSquares = function (squares) {
  const totalArea = squares.reduce((sum, square) => sum + square[2] ** 2, 0);
  const halfArea = totalArea / 2;
  const events = [];
  let prevY = 0;
  let width = 0;
  let area = 0;

  for (const square of squares) {
    const y = square[1];
    const l = square[2];

    events.push({ y, l, isStart: true }, { y: y + l, l, isStart: false });
  }

  events.sort((a, b) => a.y - b.y);

  for (const { y, l, isStart } of events) {
    const currentArea = (y - prevY) * width;

    if (area + currentArea >= halfArea) {
      const rest = halfArea - area;

      return prevY + rest / width;
    }

    prevY = y;
    width += isStart ? l : -l;
    area += currentArea;
  }

  return -1;
};
