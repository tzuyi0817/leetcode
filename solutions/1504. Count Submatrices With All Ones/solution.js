/**
 * @param {number[][]} mat
 * @return {number}
 */
const numSubmat = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const cols = Array.from({ length: n }, () => 0);
  let result = 0;

  const countSubmat = () => {
    const submat = new Array(n).fill(0);
    const stack = [];

    for (let col = 0; col < n; col++) {
      while (stack.length && cols[stack.at(-1)] >= cols[col]) {
        stack.pop();
      }

      if (stack.length) {
        const prev = stack.at(-1);

        submat[col] = submat[prev] + cols[col] * (col - prev);
      } else {
        submat[col] = cols[col] * (col + 1);
      }

      stack.push(col);
    }

    return submat.reduce((result, count) => result + count);
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      cols[col] = mat[row][col] ? cols[col] + 1 : 0;
    }

    result += countSubmat();
  }

  return result;
};
