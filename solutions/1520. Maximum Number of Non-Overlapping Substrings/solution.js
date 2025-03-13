/**
 * @param {string} s
 * @return {string[]}
 */
const maxNumOfSubstrings = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const leftIndices = Array.from({ length: 26 }, () => n);
  const rightIndices = Array.from({ length: 26 }, () => -1);

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    leftIndices[code] = Math.min(index, leftIndices[code]);
    rightIndices[code] = Math.max(index, rightIndices[code]);
  }

  const result = [];
  let currentRight = -1;

  const getRight = (start, end) => {
    let right = end;

    for (let index = start; index <= right; index++) {
      const code = s[index].charCodeAt(0) - BASE_CODE;

      if (leftIndices[code] < start) return -1;

      right = Math.max(rightIndices[code], right);
    }

    return right;
  };

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    if (leftIndices[code] !== index) continue;
    const right = getRight(index, rightIndices[code]);

    if (right === -1) continue;
    const subStr = s.slice(index, right + 1);

    if (result.length && index < currentRight) {
      result[result.length - 1] = subStr;
    } else {
      result.push(subStr);
    }

    currentRight = right;
  }

  return result;
};
