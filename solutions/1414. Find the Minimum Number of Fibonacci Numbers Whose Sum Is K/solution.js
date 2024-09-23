/**
 * @param {number} k
 * @return {number}
 */
var findMinFibonacciNumbers = function(k) {
    const fibonacciDp = [0, 1, 1];
    const fibonacci = (n) => fibonacciDp[n] = fibonacciDp[n - 1] + fibonacciDp[n - 2];
    let current = 3;
    let result = 0;

    while (fibonacciDp.at(-1) < k) {
        fibonacci(current++);
    }
    for (let index = fibonacciDp.length - 1; index > 0; index--) {
        const value = fibonacciDp[index];

        if (k < value) continue;
        k -= value;
        result += 1;
        if (k === 0) return result;
    }
    return result;
};
