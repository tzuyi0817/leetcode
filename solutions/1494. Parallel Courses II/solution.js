/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number} k
 * @return {number}
 */
const minNumberOfSemesters = function (n, relations, k) {
  const totalMask = (1 << n) - 1;
  const courses = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: totalMask }, () => -1);

  for (const [prevCourse, nextCourse] of relations) {
    courses[nextCourse] |= 1 << (prevCourse - 1);
  }

  const countBits = num => {
    let result = 0;

    while (num > 0) {
      result += num & 1;
      num >>= 1;
    }

    return result;
  };

  const takeCourse = mask => {
    if (mask === totalMask) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let takesMask = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let course = 1; course <= n; course++) {
      const courseMask = 1 << (course - 1);

      if (mask & courseMask) continue;
      const needMask = courses[course];

      if ((mask & needMask) !== needMask) continue;

      takesMask |= courseMask;
    }

    for (let subset = takesMask; subset > 0; subset = (subset - 1) & takesMask) {
      if (countBits(subset) > k) continue;
      const semesters = 1 + takeCourse(mask | subset);

      result = Math.min(semesters, result);
    }

    dp[mask] = result;

    return result;
  };

  return takeCourse(0);
};
