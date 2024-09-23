/**
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function(courses) {
    courses = courses.filter(([duration, lastDay]) => lastDay >= duration);

    if (!courses.length) return 0;

    courses.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

    const queue = new MaxPriorityQueue();
    let current = 0;

    for (const [duration, lastDay] of courses) {
        const finishedDay = current + duration;

        if (finishedDay <= lastDay) {
            current += duration;
            queue.enqueue(duration);
            continue;
        }
        if (queue.isEmpty() || queue.front().element <= duration) continue;
        const removeCourseDuration = queue.dequeue().element;

        current += duration - removeCourseDuration;
        queue.enqueue(duration);
    }
    return queue.size();
};