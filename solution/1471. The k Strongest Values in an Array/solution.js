/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getStrongest = function(arr, k) {
    arr.sort((a, b) => a - b);

    const size = arr.length;
    const median = arr[Math.floor((size - 1) / 2)];
    const result = [];
    let left = 0;
    let right = size - 1;

    while (left <= right && result.length < k) {
        if (median - arr[left] > arr[right] - median) {
            result.push(arr[left]);
            left += 1;
        } else {
            result.push(arr[right]);
            right -= 1;
        }
    }
    return result;
};
