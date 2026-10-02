/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  const result = [];

  const dfs = (current, left, right) => {
    if (left === n && right === n) {
      result.push(current);

      return;
    }

    if (left < n) {
      const nextCurrent = `${current}(`;

      dfs(nextCurrent, left + 1, right);
    }

    if (left > right) {
      const nextCurrent = `${current})`;

      dfs(nextCurrent, left, right + 1);
    }
  };

  dfs('', 0, 0);

  return result;
};
