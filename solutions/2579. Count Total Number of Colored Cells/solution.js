/**
 * @param {number} n
 * @return {number}
 */
const coloredCells = function (n) {
  const lifting = 4;
  const base = 1;

  // Arithmetic progression
  // S = Number of terms / 2 × (first term + last term)

  return base + ((n - 1) / 2) * (lifting * n);
};
