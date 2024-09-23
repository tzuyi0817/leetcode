/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    const stack = [];

    for (const digit of num) {
        while (k && stack.length && stack.at(-1) > digit) {
            stack.pop();
            k -= 1;
        }
        if (!stack.length && digit === '0') continue;
        stack.push(digit);
    }
    return stack.slice(0, stack.length - k).join('') || '0';
};