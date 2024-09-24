const DetectSquares = function () {
  this.coordinateMap = new Map();
};

/**
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function (point) {
  const [x, y] = point;
  const key = `${x},${y}`;
  const coordinate = this.coordinateMap.get(key) ?? { point, count: 0 };

  coordinate.count += 1;
  this.coordinateMap.set(key, coordinate);
};

/**
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function (point) {
  const [px, py] = point;
  let result = 0;

  for (const { point: coordinate, count } of this.coordinateMap.values()) {
    const [x, y] = coordinate;

    if (px === x || py === y) continue;
    if (Math.abs(px - x) !== Math.abs(py - y)) continue;
    const a = this.coordinateMap.get(`${px},${y}`)?.count ?? 0;
    const b = this.coordinateMap.get(`${x},${py}`)?.count ?? 0;

    result += a * b * count;
  }
  return result;
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */
