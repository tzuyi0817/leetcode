/**
 * @param {number} target
 * @return {number}
 */
var racecar = function (target) {
  let queue = [{ position: 0, speed: 1 }];
  let result = 0;

  while (queue.length) {
    const nextQueue = [];

    for (const { position, speed } of queue) {
      const nextPosition = position + speed;

      if (nextPosition === target) return result + 1;
      nextQueue.push({ position: nextPosition, speed: speed * 2 });

      if (speed > 0 && nextPosition < target) continue;
      if (speed < 0 && nextPosition > target) continue;
      nextQueue.push({ position, speed: speed > 0 ? -1 : 1 });
    }
    result += 1;
    queue = nextQueue;
  }
  return 0;
};

/**
 * @param {number} target
 * @return {number}
 */
var racecar = function (target) {
  const dp = new Array(target + 1).fill(-1);

  const raceTo = distance => {
    if (dp[distance] > -1) return dp[distance];

    let steps = 1;
    let currentPosition = 1;
    let result = Number.MAX_SAFE_INTEGER;

    while (currentPosition < distance) {
      let reverseSteps = 0;
      let reversePosition = 0;

      while (reversePosition < currentPosition) {
        const remainDistance = distance - (currentPosition - reversePosition);

        result = Math.min(steps + reverseSteps + 2 + raceTo(remainDistance), result);
        reverseSteps += 1;
        reversePosition = (1 << reverseSteps) - 1;
      }
      steps += 1;
      currentPosition = (1 << steps) - 1;
    }
    const overflowDistance = currentPosition - distance;
    const needSteps = overflowDistance ? 1 + raceTo(overflowDistance) : 0;

    result = Math.min(steps + needSteps, result);
    return (dp[distance] = result);
  };

  return raceTo(target);
};
