/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
const countStudents = function (students, sandwiches) {
  const size = students.length;
  const studentMap = students.reduce((map, sandwich) => {
    const count = map.get(sandwich) ?? 0;

    return map.set(sandwich, count + 1);
  }, new Map());

  for (let index = 0; index < size; index++) {
    const sandwich = sandwiches[index];
    const studentCount = studentMap.get(sandwich);

    if (!studentCount) return size - index;
    studentMap.set(sandwich, studentCount - 1);
  }
  return 0;
};
