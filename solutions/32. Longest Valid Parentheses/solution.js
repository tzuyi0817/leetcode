/**
 * @param {string} s
 * @return {number}
 */
const longestValidParentheses = function (s) {
  const size = s.length;
  const stack = [];
  let result = 0;
  let current = 0;

  for (let index = 0; index < size; index++) {
    current += 1;
    if (s[index] === '(') {
      stack.push(index);
      continue;
    }
    if (!stack.length) {
      current = 0;
      continue;
    }
    stack.pop();
    const length = stack.length ? index - stack.at(-1) : current;

    result = Math.max(length, result);
  }
  return result;
};
