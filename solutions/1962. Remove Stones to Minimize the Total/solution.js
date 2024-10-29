/**
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
const minStoneSum = function (piles, k) {
  const CORNER_PILE = 10 ** 4;
  const pileCounts = Array.from({ length: CORNER_PILE + 1 }).fill(0);
  let result = 0;

  for (const pile of piles) pileCounts[pile] += 1;
  for (let pile = CORNER_PILE; pile > 0; pile--) {
    while (k && pileCounts[pile]) {
      const stones = Math.floor(pile / 2);

      pileCounts[pile - stones] += 1;
      pileCounts[pile] -= 1;
      k -= 1;
    }
    if (!pileCounts[pile]) continue;
    result += pileCounts[pile] * pile;
  }
  return result;
};
