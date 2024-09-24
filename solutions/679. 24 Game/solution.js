/**
 * @param {number[]} cards
 * @return {boolean}
 */
const judgePoint24 = function (cards) {
  if (cards.length === 1) return Math.abs(cards[0] - 24) < 1e-6;

  const n = cards.length;

  const getValues = (a, b) => {
    const values = [a + b, a * b, a - b, b - a];

    if (a) values.push(b / a);
    if (b) values.push(a / b);
    return values;
  };

  for (let a = 1; a < n; a++) {
    for (let b = 0; b < a; b++) {
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
