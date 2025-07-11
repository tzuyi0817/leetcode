/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
const mostBooked = function (n, meetings) {
  const idleRoomHeap = new MinPriorityQueue();
  const usedRoomHeap = new PriorityQueue((a, b) => a.end - b.end || a.room - b.room);
  const rooms = Array.from({ length: n }, () => 0);

  meetings.sort((a, b) => a[0] - b[0]);

  for (let room = 0; room < n; room++) {
    idleRoomHeap.enqueue(room);
  }

  for (const [start, end] of meetings) {
    while (usedRoomHeap.size() && usedRoomHeap.front().end <= start) {
      const { room } = usedRoomHeap.dequeue();

      idleRoomHeap.enqueue(room);
    }

    if (idleRoomHeap.size()) {
      const room = idleRoomHeap.dequeue();

      usedRoomHeap.enqueue({ room, end });
      rooms[room] += 1;
    } else {
      const item = usedRoomHeap.dequeue();
      const duration = end - start;

      usedRoomHeap.enqueue({ room: item.room, end: item.end + duration });
      rooms[item.room] += 1;
    }
  }

  const mostMeeting = Math.max(...rooms);

  return rooms.indexOf(mostMeeting);
};
