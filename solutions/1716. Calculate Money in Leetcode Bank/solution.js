/**
 * @param {number} n
 * @return {number}
 */
const totalMoney = function (n) {
  const weeks = Math.floor(n / 7);

  const trapezoid = (a, b) => ((a + b) * (b - a + 1)) / 2;

  const firstWeek = trapezoid(1, 7);
  const totalFullWeek = trapezoid(0, weeks - 1) * 7 + firstWeek * weeks;
  const days = n % 7;
  const remainingDays = trapezoid(1, days) + weeks * days;

  return totalFullWeek + remainingDays;
};
