/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function(numCourses, prerequisites, queries) {
    const courses = Array(numCourses).fill('').map(_ => new Set());
    const prerequisiteMap = new Map();

    prerequisites.forEach(([pre, current]) => {
        courses[current].add(pre);
    });

    const checkPrerequisite = (course) => {
        if (prerequisiteMap.has(course)) return prerequisiteMap.get(course);
        const prerequisite =  prerequisiteMap.get(course) ?? new Set();

        courses[course].forEach(pre => {
            prerequisite.add(pre);
            checkPrerequisite(pre).forEach(grand => {
                prerequisite.add(grand);
            });
        });
        prerequisiteMap.set(course, prerequisite);
        return prerequisite;
    };

    for (let course = 0; course < numCourses; course++) {
        checkPrerequisite(course);
    }
    return queries.map(([pre, current]) => {
        return prerequisiteMap.get(current).has(pre);
    });
};
