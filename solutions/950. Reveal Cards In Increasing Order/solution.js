/**
 * @param {number[]} deck
 * @return {number[]}
 */
const deckRevealedIncreasing = function (deck) {
  const size = deck.length;
  const result = Array(size);
  const queue = deck.map((_, index) => index);

  deck.sort((a, b) => a - b);
  for (const card of deck) {
    const index = queue.shift();

    result[index] = card;
    queue.push(queue.shift());
  }
  return result;
};
