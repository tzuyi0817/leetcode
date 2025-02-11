/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
const removeOccurrences = function (s, part) {
  const m = part.length;
  const stack = [];
  let index = 0;

  for (const letter of s) {
    stack[index] = letter;
    index += 1;

    if (index < m) continue;
    if (stack[index - m] !== part[0]) continue;
    if (letter !== part[m - 1]) continue;

    if (stack.slice(index - m, index).join('') === part) {
      index -= m;
    }
  }

  return stack.slice(0, index).join('');
};
