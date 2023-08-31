/**
 * @param {number[]} arr
 * @return {number}
 */
var findLengthOfShortestSubarray = function(arr) {
    const size = arr.length;
    let right = size - 1;

    while (right >=0 && arr[right - 1] <= arr[right]) right -= 1;

    if (right === 0) return 0;
    let result = right;

    for (let index = 0; index < size; index++) {
        if (arr[index - 1] > arr[index]) break;
        while (arr[index] > arr[right]) right += 1;
        result = Math.min(result, right - index - 1);
    }
    return result;
};
