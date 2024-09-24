/**
 * @param {string} s
 * @return {boolean}
 */
const areNumbersAscending = function (s) {
  const numbers = s.replace(/[a-z]/g, '').split(' ').filter(Boolean);

  for (let index = 1; index < numbers.length; index++) {
    if (+numbers[index] <= +numbers[index - 1]) return false;
  }
  return true;
};
