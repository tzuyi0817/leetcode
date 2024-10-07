/**
 * @param {string} s
 * @return {number}
 */
const minLength = function (s) {
  const stack = [];

  for (const letter of s) {
    if (stack.length && /AB|CD/.test(`${stack.at(-1)}${letter}`)) {
      stack.pop();
      continue;
    }
    stack.push(letter);
  }
  return stack.length;
};
