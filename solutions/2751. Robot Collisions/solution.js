/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
const survivedRobotsHealths = function (positions, healths, directions) {
  const n = positions.length;
  const robots = [];
  const stack = [];

  for (let index = 0; index < n; index++) {
    robots.push({
      position: positions[index],
      health: healths[index],
      direction: directions[index],
      index,
    });
  }

  robots.sort((a, b) => a.position - b.position);

  for (const robot of robots) {
    if (robot.direction === 'R') {
      stack.push(robot);
      continue;
    }

    while (stack.length && stack.at(-1).direction === 'R' && robot.health) {
      const lastRobot = stack.at(-1);

      if (robot.health === lastRobot.health) {
        stack.pop();
        robot.health = 0;
      } else if (robot.health < lastRobot.health) {
        lastRobot.health -= 1;
        robot.health = 0;
      } else {
        stack.pop();
        robot.health -= 1;
      }
    }

    if (robot.health) {
      stack.push(robot);
    }
  }

  stack.sort((a, b) => a.index - b.index);

  return stack.map(({ health }) => health);
};
