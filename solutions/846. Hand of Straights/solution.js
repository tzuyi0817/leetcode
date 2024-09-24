/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
const isNStraightHand = function (hand, groupSize) {
  const n = hand.length;

  if (n % groupSize) return false;
  hand.sort((a, b) => a - b);

  const cardMap = hand.reduce((map, card) => {
    const count = map.get(card) ?? 0;

    return map.set(card, count + 1);
  }, new Map());

  for (const [card, count] of cardMap) {
    if (!count) continue;

    for (let current = card + 1; current < card + groupSize; current++) {
      const currentCount = cardMap.get(current) ?? 0;

      if (currentCount < count) return false;
      cardMap.set(current, currentCount - count);
    }
  }
  return true;
};
