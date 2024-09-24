/**
 * @param {number[][]} logs
 * @param {number} k
 * @return {number[]}
 */
const findingUsersActiveMinutes = function (logs, k) {
  const activeMap = logs.reduce((map, [id, time]) => {
    return (map[id] = (map[id] ?? new Set()).add(time)), map;
  }, {});
  const result = Array(k).fill(0);
  const actives = Object.values(activeMap);

  for (const active of actives) {
    result[active.size - 1] += 1;
  }
  return result;
};
