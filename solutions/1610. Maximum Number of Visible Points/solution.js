/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
const visiblePoints = function (points, angle, location) {
  const [posX, posY] = location;
  const angles = [];
  let same = 0;

  const calculateAngle = (x, y) => {
    return (Math.atan2(y, x) * 180) / Math.PI;
  };

  for (const [x, y] of points) {
    if (x === posX && y === posY) {
      same += 1;
      continue;
    }
    const pointAngle = calculateAngle(x - posX, y - posY);

    angles.push(pointAngle);
  }
  const n = angles.length;
  let left = 0;
  let maxVisible = 0;

  angles.sort((a, b) => a - b);

  for (index = 0; index < n; index++) {
    angles.push(angles[index] + 360);
  }

  for (let index = 0; index < angles.length; index++) {
    while (angles[index] - angles[left] > angle) {
      left += 1;
    }

    maxVisible = Math.max(index - left + 1, maxVisible);
  }

  return same + maxVisible;
};
