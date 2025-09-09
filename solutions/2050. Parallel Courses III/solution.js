/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number[]} time
 * @return {number}
 */
const minimumTime = function (n, relations, time) {
  const courses = Array.from({ length: n + 1 }, () => []);
  const indegree = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n + 1 }, () => 0);
  let queue = [];

  for (const [prevCourse, nextCourse] of relations) {
    courses[prevCourse].push(nextCourse);
    indegree[nextCourse] += 1;
  }

  for (let course = 1; course <= n; course++) {
    if (indegree[course]) continue;

    queue.push(course);
    dp[course] = time[course - 1];
  }

  while (queue.length) {
    const nextQueue = [];

    for (const course of queue) {
      for (const nextCourse of courses[course]) {
        const months = dp[course] + time[nextCourse - 1];

        dp[nextCourse] = Math.max(months, dp[nextCourse]);
        indegree[nextCourse] -= 1;

        if (indegree[nextCourse] === 0) {
          nextQueue.push(nextCourse);
        }
      }
    }

    queue = nextQueue;
  }

  return Math.max(...dp);
};
