/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
const minTaps = function (n, ranges) {
  const intervals = Array.from({ length: n + 1 }, () => 0);

  for (let index = 0; index <= n; index++) {
    const range = ranges[index];
    const start = Math.max(index - range, 0);
    const end = Math.min(index + range, n);

    intervals[start] = Math.max(end - start, intervals[start]);
  }
  let end = 0;
  let farthest = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    farthest = Math.max(index + intervals[index], farthest);

    if (index === end) {
      end = farthest;
      result += 1;
    }
  }
  return end === n ? result : -1;
};
