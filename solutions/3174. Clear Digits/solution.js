/**
 * @param {string} s
 * @return {string}
 */
const clearDigits = function (s) {
  const stack = [];

  for (const str of s) {
    if (Number.isNaN(Number(str))) {
      stack.push(str);
    } else {
      stack.pop();
    }
  }

  return stack.join('');
};
