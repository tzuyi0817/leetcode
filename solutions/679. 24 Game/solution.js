/**
 * @param {number[]} cards
 * @return {boolean}
 */
const judgePoint24 = function (cards) {
  const n = cards.length;

  if (n === 1) return Math.abs(cards[0] - 24) < 10e-9;

  const getValues = (a, b) => {
    const values = [a + b, a * b, a - b, b - a];

    if (a) values.push(b / a);
    if (b) values.push(a / b);

    return values;
  };

  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b < n; b++) {
      const values = getValues(cards[a], cards[b]);
      const nextCards = cards.filter((_, index) => index !== a && index !== b);

      for (const value of values) {
        nextCards.push(value);

        if (judgePoint24(nextCards)) return true;

        nextCards.pop();
      }
    }
  }

  return false;
};
