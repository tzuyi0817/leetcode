/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = function (numRows) {
  const result = [[1]];

  for (let row = 2; row <= numRows; row++) {
    const prev = result.at(-1);
    const values = [1];

    for (let index = 1; index < prev.length; index++) {
      values.push(prev[index] + prev[index - 1]);
    }

    values.push(1);
    result.push(values);
  }

  return result;
};
