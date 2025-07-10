/**
 * @param {number} eventTime
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
const maxFreeTime = function (eventTime, startTime, endTime) {
  const n = startTime.length;
  const gaps = [startTime[0]];
  const maxGapFromLeft = Array.from({ length: n + 1 }, () => 0);
  const maxGapFromRight = Array.from({ length: n + 1 }, () => 0);
  let result = 0;

  for (let index = 1; index < n; index++) {
    const gap = startTime[index] - endTime[index - 1];

    gaps.push(gap);
  }

  gaps.push(eventTime - endTime[n - 1]);
  maxGapFromLeft[0] = gaps[0];
  maxGapFromRight[n] = gaps[n];

  for (let index = 1; index <= n; index++) {
    maxGapFromLeft[index] = Math.max(gaps[index], maxGapFromLeft[index - 1]);
  }

  for (let index = n - 1; index >= 0; index--) {
    maxGapFromRight[index] = Math.max(gaps[index], maxGapFromRight[index + 1]);
  }

  for (let index = 0; index < n; index++) {
    const duration = endTime[index] - startTime[index];
    const adjustGap = gaps[index] + gaps[index + 1];
    const leftMaxGap = maxGapFromLeft[index - 1] ?? 0;
    const rightMaxGap = maxGapFromRight[index + 2] ?? 0;
    const maxGap = Math.max(leftMaxGap, rightMaxGap);
    const rescheduleGap = adjustGap + (duration <= maxGap ? duration : 0);

    result = Math.max(rescheduleGap, result);
  }

  return result;
};
