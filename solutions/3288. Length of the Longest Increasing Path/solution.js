/**
 * @param {number[][]} coordinates
 * @param {number} k
 * @return {number}
 */
const maxPathLength = function (coordinates, k) {
  const [xk, yk] = coordinates[k];
  const leftCoordinates = [];
  const rightCoordinates = [];

  for (const [x, y] of coordinates) {
    if (x < xk && y < yk) {
      leftCoordinates.push({ x, y });
    } else if (x > xk && y > yk) {
      rightCoordinates.push({ x, y });
    }
  }

  return 1 + getLISLength(leftCoordinates) + getLISLength(rightCoordinates);
};

function getLISLength(coordinates) {
  const tails = [];

  coordinates.sort((a, b) => a.x - b.x || b.y - a.y);

  for (const { y } of coordinates) {
    if (!tails.length || tails.at(-1) < y) {
      tails.push(y);
    } else {
      const pos = findFirstGreaterEqual(tails, y);

      tails[pos] = y;
    }
  }

  return tails.length;
}

function findFirstGreaterEqual(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    nums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
}
