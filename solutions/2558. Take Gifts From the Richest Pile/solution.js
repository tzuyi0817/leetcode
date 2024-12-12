/**
 * @param {number[]} gifts
 * @param {number} k
 * @return {number}
 */
const pickGifts = function (gifts, k) {
  const n = gifts.length;
  const queue = new MaxPriorityQueue();
  const totalGifts = gifts.reduce((total, gift) => total + gift);
  let pickupGifts = 0;

  for (let index = 0; index < n; index++) {
    queue.enqueue(gifts[index]);
  }

  for (let index = 0; index < k; index++) {
    const gift = queue.dequeue().element;
    const leftGift = Math.floor(Math.sqrt(gift));

    queue.enqueue(leftGift);
    pickupGifts += gift - leftGift;
  }
  return totalGifts - pickupGifts;
};
