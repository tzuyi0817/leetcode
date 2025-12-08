/**
 * @param {number} n
 * @return {number}
 */
const countTriples = function (n) {
  const maxSquare = n ** 2;
  let result = 0;

  for (let a = 1; a <= n; a++) {
    const square = a ** 2;

    for (let b = 1; square + b ** 2 <= maxSquare; b++) {
      const sum = square + b ** 2;

      if (Math.sqrt(sum) % 1) continue;

      result += 1;
    }
  }

  return result;
};
