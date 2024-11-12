/**
 * @param {string} text
 * @return {number}
 */
const longestDecomposition = function (text) {
  const n = text.length;
  let left = 0;
  let right = n - 1;
  let leftSub = '';
  let rightSub = '';
  let result = 0;

  while (left < right) {
    leftSub += text[left];
    rightSub = `${text[right]}${rightSub}`;

    if (leftSub === rightSub) {
      result += 2;
      leftSub = '';
      rightSub = '';
    }
    left += 1;
    right -= 1;
  }
  const remain = n % 2 || leftSub ? 1 : 0;

  return result + remain;
};
