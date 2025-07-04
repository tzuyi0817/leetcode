/**
 * @param {number[][]} rooms
 * @param {number[][]} queries
 * @return {number[]}
 */
const closestRoom = function (rooms, queries) {
  const n = rooms.length;
  const k = queries.length;
  const indexdQueries = queries.map(([preferred, minSize], index) => {
    return { preferred, minSize, index };
  });
  const result = Array.from({ length: k }, () => -1);
  const sortedRooms = [];
  let roomIndex = 0;

  const insertRoom = id => {
    let left = 0;
    let right = sortedRooms.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedRooms[mid] < id) left = mid + 1;
      else right = mid;
    }

    sortedRooms.splice(left, 0, id);
  };

  const searchClosest = id => {
    if (!sortedRooms.length) return -1;
    let left = 0,
      right = sortedRooms.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedRooms[mid] < id) left = mid + 1;
      else right = mid - 1;
    }

    if (left >= sortedRooms.length && right < 0) return -1;
    if (right < 0) return sortedRooms[left];
    if (left >= sortedRooms.length) return sortedRooms[right];
    const leftDiff = Math.abs(sortedRooms[left] - id);
    const rightDiff = Math.abs(sortedRooms[right] - id);

    if (leftDiff === rightDiff) return Math.min(sortedRooms[left], sortedRooms[right]);

    return leftDiff > rightDiff ? sortedRooms[right] : sortedRooms[left];
  };

  rooms.sort((a, b) => b[1] - a[1]);
  indexdQueries.sort((a, b) => b.minSize - a.minSize);

  for (const { preferred, minSize, index } of indexdQueries) {
    while (roomIndex < n && rooms[roomIndex][1] >= minSize) {
      const roomId = rooms[roomIndex][0];

      insertRoom(roomId);
      roomIndex += 1;
    }

    result[index] = searchClosest(preferred);
  }

  return result;
};
