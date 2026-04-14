/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
const minimumTotalDistance = function (robot, factory) {
  const m = robot.length;
  const n = factory.length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(() => new Array(m).fill(-1));
  });

  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);

  const minimumDistance = (bot, fact, fixed) => {
    if (bot === m) return 0;
    if (fact === n) return Number.MAX_SAFE_INTEGER;

    if (dp[bot][fact][fixed] !== -1) {
      return dp[bot][fact][fixed];
    }

    const [position, limit] = factory[fact];
    const skipFactory = minimumDistance(bot, fact + 1, 0);
    const distance = Math.abs(position - robot[bot]);
    const repairBot = limit > fixed ? distance + minimumDistance(bot + 1, fact, fixed + 1) : Number.MAX_SAFE_INTEGER;

    const result = Math.min(skipFactory, repairBot);

    dp[bot][fact][fixed] = result;

    return result;
  };

  return minimumDistance(0, 0, 0);
};
