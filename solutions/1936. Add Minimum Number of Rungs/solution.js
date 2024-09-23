/**
 * @param {number[]} rungs
 * @param {number} dist
 * @return {number}
 */
var addRungs = function(rungs, dist) {
    let result = 0;

    for (let index = 0; index < rungs.length; index++) {
        const previousRug = rungs[index - 1] ?? 0;
        const diff = rungs[index] - previousRug;

        if (diff <= dist) continue;
        result += Math.floor((diff - 1) / dist);
    }
    return result;
};