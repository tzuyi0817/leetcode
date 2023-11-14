/**
 * @param {number} n
 * @return {number}
 */
var reinitializePermutation = function(n) {
    const BASE_INDEX = 1;
    let result = 1;
    let index = n / 2 + (BASE_INDEX - 1) / 2;

    while (index !== BASE_INDEX) {
        index = index % 2
            ? n / 2 + (index - 1) / 2
            : index / 2;
        result += 1;
    }
    return result;
};
