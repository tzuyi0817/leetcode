/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
var kthDistinct = function(arr, k) {
    const countMap = arr.reduce((map, char) => {
        const count = map.get(char) ?? 0;

        return map.set(char, count + 1);
    }, new Map());

    for (let index = 0; index < arr.length; index++) {
        const char = arr[index];
        const count = countMap.get(char);

        if (count > 1) continue;
        k -= 1;
        if (k === 0) return char;
    }
    return '';
};