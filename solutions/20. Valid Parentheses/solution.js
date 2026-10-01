/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const parenthesesMap = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ]);
  const stack = [];

  for (const char of s) {
    if (parenthesesMap.has(char)) {
      const target = parenthesesMap.get(char);
      const last = stack.pop();

      if (last !== target) return false;

      continue;
    }

    stack.push(char);
  }

  return stack.length === 0;
};
