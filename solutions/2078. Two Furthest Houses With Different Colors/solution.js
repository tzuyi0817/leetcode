/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function(colors) {
    let result = 0;

    for (let index = colors.length - 1; index > 0; index--) {
        if (index <= result) return result;
        let different = 0;

        while (colors[index] === colors[different]) different += 1;
        result = Math.max(result, index - different);
    }
    return result;
};