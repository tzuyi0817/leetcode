/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
const maxFreeTime = function (eventTime, k, startTime, endTime) {
  const n = startTime.length;
  const gaps = [startTime[0]];

  for (let index = 1; index < n; index++) {
    const gap = startTime[index] - endTime[index - 1];

    gaps.push(gap);
  }

  gaps.push(eventTime - endTime[n - 1]);

  let currentGap = gaps.slice(0, k + 1).reduce((total, gap) => total + gap);
  let result = currentGap;

  for (let index = k + 1; index <= n; index++) {
    currentGap += gaps[index] - gaps[index - k - 1];
    result = Math.max(currentGap, result);
  }

  return result;
};
