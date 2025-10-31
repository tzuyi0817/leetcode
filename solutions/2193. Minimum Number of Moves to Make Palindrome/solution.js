/**
 * @param {string} s
 * @return {number}
 */
const minMovesToMakePalindrome = function (s) {
  const chars = [...s];
  let result = 0;

  while (chars.length) {
    const len = chars.length;
    const lastChar = chars.pop();
    const index = chars.indexOf(lastChar);

    if (index === -1) {
      result += Math.floor(len / 2);
    } else {
      chars.splice(index, 1);
      result += index;
    }
  }

  return result;
};
