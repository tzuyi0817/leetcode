/**
 * @param {string} directions
 * @return {number}
 */
const countCollisions = function (directions) {
  const n = directions.length;
  let left = 0;
  let right = n - 1;
  let result = 0;

  while (directions[left] === 'L') {
    left += 1;
  }

  while (directions[right] === 'R') {
    right -= 1;
  }

  for (let index = left; index <= right; index++) {
    const direction = directions[index];

    if (direction === 'S') continue;

    result += 1;
  }

  return result;
};
