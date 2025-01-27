/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  const courses = Array.from({ length: numCourses }, () => []);
  const memo = Array.from({ length: numCourses }, () => {
    return new Array(numCourses).fill(null);
  });

  for (const [a, b] of prerequisites) {
    courses[b].push(a);
  }

  const isPrerequisite = (preCourse, course) => {
    if (preCourse === course) return true;
    if (memo[course][preCourse] !== null) {
      return memo[course][preCourse];
    }

    for (const pre of courses[course]) {
      if (isPrerequisite(preCourse, pre)) {
        memo[course][preCourse] = true;
        return true;
      }
    }
    memo[course][preCourse] = false;
    return false;
  };

  return queries.map(([a, b]) => isPrerequisite(a, b));
};
