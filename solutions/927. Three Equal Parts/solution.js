/**
 * @param {number[]} arr
 * @return {number[]}
 */
var threeEqualParts = function(arr) {
    const n = arr.length;
    const ones = arr.reduce((total, value) => total + value);

    if (!ones) return [0, n - 1];
    if (ones % 3) return [-1, -1];

    const preOnes = ones / 3;
    let start = 0;
    let mid = 0;
    let end = 0;
    let currentOnes = 0;

    for (let index = 0; index < n; index++) {
        const value = arr[index];

        if (!value) continue;
        if (!currentOnes) start = index;
        currentOnes += 1;
        if (currentOnes === preOnes + 1) {
            mid = index;
        }
        if (currentOnes === preOnes * 2 + 1) {
            end = index;
        }
    }

    while (end < n && arr[start] === arr[mid] && arr[mid] === arr[end]) {
        start += 1;
        mid += 1;
        end += 1;
    }
    if (end === n) return [start - 1, mid];

    return [-1, -1];
};