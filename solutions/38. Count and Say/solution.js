/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = function (n) {
  if (n === 1) return '1';
  const origin = countAndSay(n - 1);
  let count = 1;
  let result = '';

  for (let index = 1; index <= origin.length; index++) {
    const char = origin[index];
    const prevChar = origin[index - 1];

    if (char !== prevChar) {
      result += `${count}${prevChar}`;
      count = 1;
    } else {
      count += 1;
    }
  }

  return result;
};
