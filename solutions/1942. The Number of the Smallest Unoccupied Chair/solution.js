/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
const smallestChair = function (times, targetFriend) {
  const occupiedChair = new MinPriorityQueue({ priority: ({ time }) => time });
  const emptyChair = new MinPriorityQueue({ priority: chair => chair });
  const friendList = times.map(([arrival, leaving], index) => {
    return { arrival, leaving, friend: index };
  });
  let currentChair = 0;

  friendList.sort((a, b) => a.arrival - b.arrival);

  for (const { arrival, leaving, friend } of friendList) {
    while (!occupiedChair.isEmpty() && occupiedChair.front().element.time <= arrival) {
      const { chair } = occupiedChair.dequeue().element;

      emptyChair.enqueue(chair);
    }
    const chair = emptyChair.isEmpty() ? currentChair++ : emptyChair.dequeue().element;

    if (friend === targetFriend) return chair;
    occupiedChair.enqueue({ time: leaving, chair });
  }
  return currentChair;
};
