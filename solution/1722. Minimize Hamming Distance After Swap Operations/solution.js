/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function(source, target, allowedSwaps) {
    const size = source.length;
    const union = Array(size).fill('').map((_, index) => index);
    const swapMap = new Map();
    const find = (node) => union[node] === node ? node : find(union[node]);
    let result = 0;

    for (const [a, b] of allowedSwaps) {
        const parentA = find(a);
        const parentB = find(b);

        if (parentA === parentB) continue;
        union[parentA] = parentB;
    }
    for (let index = 0; index < size; index++) {
        const parent = find(index);
        const group = swapMap.get(parent);
        const value = source[index];

        group 
            ? group.set(value, (group.get(value) ?? 0) + 1)
            : swapMap.set(parent, new Map([[value, 1]]));
    }
    for (let index = 0; index < size; index++) {
        const parent = find(index);
        const group = swapMap.get(parent);
        const value = target[index];
        const count = group.get(value);

        count ? group.set(value, count - 1) : result += 1;
    }
    return result;
};
