/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const size = num.length;
    const halfSize = size / 2;
    let different = 0;

    for (let index = 0; index < halfSize; index++) {
        const value = num[index];

        different += value === '?' ? 4.5 : +value;
    }
    for (let index = halfSize; index < size; index++) {
        const value = num[index];

        different -= value === '?' ? 4.5 : +value;
    }
    return different !== 0;
};