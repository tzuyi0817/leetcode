/**
 * @param {string} text
 * @return {number}
 */
const distinctEchoSubstrings = function (text) {
  const n = text.length;
  const distinctSubStr = new Set();

  for (let length = 1; length <= Math.floor(n / 2); length++) {
    let left = 0;
    let sameCount = 0;

    for (let index = length; index < n; index++) {
      const letter = text[index];

      sameCount = text[left] === letter ? sameCount + 1 : 0;
      left += 1;

      if (sameCount !== length) continue;
      const subStr = text.slice(index - length + 1, index + 1);

      distinctSubStr.add(subStr);
      sameCount -= 1;
    }
  }
  return distinctSubStr.size;
};
