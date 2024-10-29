/**
 * @param {number[][]} students
 * @param {number[][]} mentors
 * @return {number}
 */
const maxCompatibilitySum = function (students, mentors) {
  const size = students.length;
  const assigned = new Array(size);
  let result = 0;

  function backtracking(student, score) {
    if (student >= size) {
      result = Math.max(score, result);
      return;
    }
    for (let index = 0; index < size; index++) {
      if (assigned[index]) continue;
      const compatibilityScore = calculateScore(students[student], mentors[index]);

      assigned[index] = true;
      backtracking(student + 1, compatibilityScore + score);
      assigned[index] = false;
    }
  }
  function calculateScore(studentAnswers, mentorAnswers) {
    return studentAnswers.reduce((sum, answer, index) => {
      return sum + (answer === mentorAnswers[index] ? 1 : 0);
    }, 0);
  }

  backtracking(0, 0);
  return result;
};
