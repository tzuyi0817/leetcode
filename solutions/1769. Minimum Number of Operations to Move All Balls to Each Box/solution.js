/**
 * @param {string} boxes
 * @return {number[]}
 */
const minOperations = function (boxes) {
  const n = boxes.length;
  const result = Array.from({ length: n }, () => 0);
  let balls = 0;
  let preCount = 0;

  for (let index = 0; index < n; index++) {
    preCount += balls;
    result[index] += preCount;
    balls += Number(boxes[index]);
  }
  preCount = 0;
  balls = 0;

  for (let index = n - 1; index >= 0; index--) {
    preCount += balls;
    result[index] += preCount;
    balls += Number(boxes[index]);
  }
  return result;
};
