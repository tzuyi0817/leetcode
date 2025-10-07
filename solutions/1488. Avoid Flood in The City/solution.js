/**
 * @param {number[]} rains
 * @return {number[]}
 */
const avoidFlood = function (rains) {
  const n = rains.length;
  const lakeMap = new Map();
  const result = Array.from({ length: n }, () => -1);
  const dryDays = [];

  const findFirstGreaterEqual = target => {
    let left = 0;
    let right = dryDays.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      dryDays[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let index = 0; index < n; index++) {
    const lake = rains[index];

    if (lake === 0) {
      dryDays.push(index);
      result[index] = 1;
      continue;
    }

    if (lakeMap.has(lake)) {
      if (!dryDays.length) return [];

      const day = lakeMap.get(lake);
      const dryIndex = findFirstGreaterEqual(day);
      const dryDay = dryDays[dryIndex];

      if (dryDay < day || dryIndex >= dryDays.length) return [];

      dryDays.splice(dryIndex, 1);
      result[dryDay] = lake;
    }

    lakeMap.set(lake, index);
  }

  return result;
};
