/**
 * @param {string} s
 * @return {string[]}
 */
const maxNumOfSubstrings = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const firstIndices = Array.from({ length: 26 }, () => n);
  const lastIndices = Array.from({ length: 26 }, () => -1);
  const stack = [];

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    firstIndices[code] = Math.min(index, firstIndices[code]);
    lastIndices[code] = Math.max(index, lastIndices[code]);
  }

  const getEnd = (l, r) => {
    let end = r;

    for (let index = l; index <= end; index++) {
      const code = s[index].charCodeAt(0) - BASE_CODE;
      const first = firstIndices[code];

      if (first < l) return -1;

      end = Math.max(lastIndices[code], end);
    }

    return end;
  };

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;
    const start = firstIndices[code];

    if (start !== index) continue;

    const end = getEnd(start, lastIndices[code]);

    if (end === -1) continue;

    if (stack.length && end < stack.at(-1).end) {
      stack[stack.length - 1] = { start, end };
    } else {
      stack.push({ start, end });
    }
  }

  return stack.map(({ start, end }) => s.slice(start, end + 1));
};
