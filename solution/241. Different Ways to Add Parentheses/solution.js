/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    const memo = new Map();

    const calculate = (a, b, mathSymbol) => {
        if (mathSymbol === '*') return a * b;
        if (mathSymbol === '-') return a - b;
        return a + b;
    };

    const computeExpression = (current) => {
        if (memo.has(current)) return memo.get(current);
        const n = current.length;
        const values = [];

        for (let index = 0; index < n; index++) {
            const str = current[index];

            if (/[0-9]/.test(str)) continue;
            const leftHalf = current.slice(0, index);
            const rightHalf = current.slice(index + 1);
            const values1 = computeExpression(leftHalf);
            const values2 = computeExpression(rightHalf);

            for (const value1 of values1) {
                for (const value2 of values2) {
                    const value = calculate(value1, value2, str);

                    values.push(value);
                }
            }
        }
        const result = values.length ? values : [+current];

        memo.set(current, result);
        return result;
    };

    return computeExpression(expression);
};