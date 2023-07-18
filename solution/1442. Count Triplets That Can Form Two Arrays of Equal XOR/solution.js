/**
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    let result = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let current = arr[i];

        for (let k = i + 1; k < arr.length; k++) {
            current ^= arr[k];
            if (current !== 0) continue;
            result += k - i;
        }
    }
    return result;
};
