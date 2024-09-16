/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    const MAX_MINUTE = 24 * 60;
    const n = timePoints.length;
    const times = Array(MAX_MINUTE + 1).fill(false);
    let result = MAX_MINUTE;
    let minTime = MAX_MINUTE;

    for (let index = 0; index < n; index++) {
        const [hour, minute] = timePoints[index].split(':');
        const time = hour * 60 + +minute;

        if (times[time]) return 0;
        times[time] = true;
        minTime = Math.min(time, minTime);
    }
    let previous = minTime;

    for (let time = 1; time < times.length; time++) {
        if (!times[time] || time === minTime) continue;

        result = Math.min(time - previous, result);
        previous = time;
    }
    const headTailDiff = minTime - previous + MAX_MINUTE;

    return Math.min(result, headTailDiff);
};