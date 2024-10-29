/**
 * @param {number[]} changed
 * @return {number[]}
 */
const findOriginalArray = function (changed) {
  const changedMap = changed.reduce((map, value) => {
    const count = map.get(value) ?? 0;

    return map.set(value, count + 1);
  }, new Map());
  const result = [];
  const values = [...changedMap.keys()].sort((a, b) => a - b);

  for (const value of values) {
    const count = changedMap.get(value);

    if (!count) continue;
    if (value === 0) {
      if (count % 2) return [];
      result.push(...Array.from({ length: count / 2 }).fill(0));
      continue;
    }
    if (changedMap.has(value * 2)) {
      const doubledCount = changedMap.get(value * 2);

      if (count > doubledCount) return [];
      result.push(...new Array(count).fill(value));
      changedMap.set(value * 2, doubledCount - count);
      continue;
    }
    return [];
  }
  return result;
};
