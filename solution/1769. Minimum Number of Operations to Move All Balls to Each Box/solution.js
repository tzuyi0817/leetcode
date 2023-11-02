/**
 * @param {string} boxes
 * @return {number[]}
 */
var minOperations = function(boxes) {
    const size = boxes.length;
    const left = Array(size).fill(0);
    const right = Array(size).fill(0);
    const result = [];
    let count = 0;

    count = +boxes[0];
    for (let index = 1; index < size; index++) {
        left[index] = count + left[index - 1];
        count += +boxes[index];
    }

    count = +boxes[size - 1];
    for (let index = size - 2; index >= 0; index--) {
        right[index] = count + right[index + 1];
        count += +boxes[index];
    }

    for (let index = 0; index < size; index++) {
        result[index] = left[index] + right[index];
    }
    return result;
};
