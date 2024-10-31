/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
const minimumTotalDistance = function (robot, factory) {
  const n = robot.length;
  const m = factory.length;
  const memo = new Array(n).fill('').map(_ => new Array(m).fill('').map(_ => new Array(n).fill(-1)));

  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);

  const repairRobot = (i, j, repaired) => {
    if (i === n) return 0;
    if (j === m) return Number.MAX_SAFE_INTEGER;
    if (memo[i][j][repaired] !== -1) return memo[i][j][repaired];

    const skipFactory = repairRobot(i, j + 1, 0);
    const [position, limit] = factory[j];
    const repairs =
      limit > repaired ? Math.abs(robot[i] - position) + repairRobot(i + 1, j, repaired + 1) : Number.MAX_SAFE_INTEGER;

    memo[i][j][repaired] = Math.min(skipFactory, repairs);

    return memo[i][j][repaired];
  };

  return repairRobot(0, 0, 0);
};
