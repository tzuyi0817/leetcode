/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function(logs) {
    let level = 0;

    for (const log of logs) {
        if (log === './') continue;

        level = log === '../' ? Math.max(level - 1, 0) : level + 1;
    }
    return level;
};
