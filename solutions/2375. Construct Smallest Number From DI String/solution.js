/**
 * @param {string} pattern
 * @return {string}
 */
const smallestNumber = function (pattern) {
  const n = pattern.length;
  const stack = [];
  let result = '';

  for (let index = 0; index <= n; index++) {
    const num = index + 1;

    stack.push(num);

    if (pattern[index] === 'I' || index === n) {
      while (stack.length) {
        result += stack.pop();
      }
    }
  }

  return result;
};
