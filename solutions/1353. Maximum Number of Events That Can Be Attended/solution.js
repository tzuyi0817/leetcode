/**
 * @param {number[][]} events
 * @return {number}
 */
const maxEvents = function (events) {
  const n = events.length;
  const endDayHeap = new MinPriorityQueue();
  let currentDay = 0;
  let index = 0;
  let result = 0;

  events.sort((a, b) => a[0] - b[0]);

  while (index < n || endDayHeap.size()) {
    if (!endDayHeap.size()) {
      const startDay = events[index][0];

      currentDay = startDay;
    }

    while (index < n && events[index][0] <= currentDay) {
      const endDay = events[index][1];

      endDayHeap.enqueue(endDay);
      index += 1;
    }

    result += 1;
    currentDay += 1;
    endDayHeap.dequeue();

    while (endDayHeap.size() && endDayHeap.front() < currentDay) {
      endDayHeap.dequeue();
    }
  }

  return result;
};
