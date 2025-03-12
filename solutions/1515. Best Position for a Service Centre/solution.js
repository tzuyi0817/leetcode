/**
 * @param {number[][]} positions
 * @return {number}
 */
const getMinDistSum = function (positions) {
  const k = 10 ** -6;

  const distSum = (a, b) => {
    return positions.reduce((sum, [x, y]) => {
      return sum + Math.hypot(a - x, b - y);
    }, 0);
  };

  let currentX = 50;
  let currentY = 50;
  let step = 1;
  let result = distSum(currentX, currentY);

  while (step > k) {
    const directions = [
      [0, -step],
      [0, step],
      [step, 0],
      [-step, 0],
    ];
    let shouldDecreaseStep = true;

    for (const [x, y] of directions) {
      const nextX = currentX + x;
      const nextY = currentY + y;
      const sum = distSum(nextX, nextY);

      if (sum < result) {
        result = sum;
        currentX = nextX;
        currentY = nextY;
        shouldDecreaseStep = false;
      }
    }

    if (!shouldDecreaseStep) continue;

    step /= 10;
  }

  return result;
};
