/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
const findMaxValueOfEquation = function (points, k) {
  const deque = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (const [x, y] of points) {
    // yi + yj + xj - xi -> (yi - xi) + (yj + xj)
    const value = y - x;

    while (deque.length && x - deque[0].x > k) {
      deque.shift();
    }

    if (deque.length) {
      result = Math.max(x + y + deque[0].value, result);
    }

    while (deque.length && value >= deque.at(-1).value) {
      deque.pop();
    }

    deque.push({ x, value });
  }

  return result;
};
