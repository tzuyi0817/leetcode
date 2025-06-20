/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxDistance = function (s, k) {
  const n = s.length;
  const move = { N: [0, 1], S: [0, -1], W: [-1, 0], E: [1, 0] };
  let x = 0;
  let y = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const direction = s[index];
    const [moveX, moveY] = move[direction];

    x += moveX;
    y += moveY;
    const distance = Math.abs(x) + Math.abs(y);
    const changedDistance = Math.min(distance + 2 * k, index + 1);

    result = Math.max(changedDistance, result);
  }

  return result;
};
