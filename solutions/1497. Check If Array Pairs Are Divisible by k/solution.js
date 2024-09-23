/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
var canArrange = function(arr, k) {
    const remainMap = arr.reduce((map, integer) => {
        const remain = (integer % k + k) % k;
        const count = map.get(remain) ?? 0;

        return map.set(remain, count + 1);
    }, new Map());

    for (const [remain, count] of remainMap) {
        if (!remain) {
            if (count % 2) return false;
            continue;
        }
        if (remainMap.get(remain) === remainMap.get(k - remain)) continue;
        return false;
    }
    return true;
};
