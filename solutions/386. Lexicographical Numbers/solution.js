/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function(n) {
    const result = [];

    const generateNum = (num) => {
        if (num > n) return;

        for (let index = 0; index <= 9; index++) {
            const current = num + index;

            if (current > n) return;
            if (index === 9 && !(current % 10)) return;
            result.push(current);
            generateNum(current * 10);
        }
    };

    generateNum(1);

    return result;
};