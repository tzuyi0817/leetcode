/**
 * @param {string} s
 * @return {string}
 */
const clearDigits = function (s) {
  const stack = [];

  for (const str of s) {
    if (isNaN(str)) {
      stack.push(str);
    } else {
      stack.pop();
    }
  }

  return stack.join('');
};
