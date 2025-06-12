/**
 * @param {number[][]} cars
 * @return {number[]}
 */
const getCollisionTimes = function (cars) {
  const n = cars.length;
  const stack = [];
  const result = Array.from({ length: n }, () => -1);

  const getCollisionTime = (a, b) => {
    const [positionA, speedA] = cars[a];
    const [positionB, speedB] = cars[b];

    return (positionA - positionB) / (speedB - speedA);
  };

  for (let index = n - 1; index >= 0; index--) {
    const speed = cars[index][1];

    while (stack.length) {
      const next = stack.at(-1);
      const nextSpeed = cars[next][1];
      const collisionTime = getCollisionTime(next, index);

      if (speed <= nextSpeed || (result[next] > 0 && collisionTime > result[next])) {
        stack.pop();
      } else {
        result[index] = collisionTime;
        break;
      }
    }

    stack.push(index);
  }

  return result;
};
