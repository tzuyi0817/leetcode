/**
 * @param {string} s
 * @return {string[]}
 */
const removeInvalidParentheses = function (s) {
  const isValid = str => {
    let left = 0;

    for (const char of str) {
      if (char === '(') left += 1;
      if (char === ')') left -= 1;
      if (left < 0) return false;
    }
    return left === 0;
  };

  if (isValid(s)) return [s];
  const result = [];
  let queue = new Set([s]);

  while (queue.size) {
    const next = new Set();

    for (const str of queue) {
      for (let index = 0; index < str.length; index++) {
        const current = str[index];

        if (current !== '(' && current !== ')') continue;
        const substr = `${str.slice(0, index)}${str.slice(index + 1)}`;

        if (next.has(substr)) continue;
        if (isValid(substr)) result.push(substr);
        next.add(substr);
      }
    }
    if (result.length) return result;
    queue = next;
  }
  return [];
};
