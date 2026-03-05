/**
 * @param {string} s
 * @return {number}
 */
const minOperations = function (s) {
  const n = s.length;

  const changeOperations = start => {
    let operations = 0;

    for (let index = 0; index < n; index++) {
      const value = Number(s[index]);
      const target = index % 2 ? start ^ 1 : start;

      operations += value === target ? 0 : 1;
    }

    return operations;
  };

  return Math.min(changeOperations(0), changeOperations(1));
};
