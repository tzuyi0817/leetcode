/**
 * @param {string} seq
 * @return {number[]}
 */
const maxDepthAfterSplit = function (seq) {
  const result = [];
  let group = -1;

  for (const char of seq) {
    if (char === '(') {
      group += 1;
      result.push(group % 2);
    } else {
      result.push(group % 2);
      group -= 1;
    }
  }

  return result;
};
