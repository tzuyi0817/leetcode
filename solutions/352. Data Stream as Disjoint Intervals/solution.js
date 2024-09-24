const SummaryRanges = function () {
  this.intervals = [];
};

/**
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function (value) {
  const newInterval = [value, value];

  if (!this.intervals.length) {
    this.intervals.push(newInterval);
    return;
  }
  const n = this.intervals.length;
  const result = [];
  let index = 0;

  while (index < n && this.intervals[index][1] + 1 < newInterval[0]) {
    result.push(this.intervals[index++]);
  }
  while (index < n && this.intervals[index][0] <= newInterval[1] + 1) {
    newInterval[0] = Math.min(this.intervals[index][0], newInterval[0]);
    newInterval[1] = Math.max(this.intervals[index][1], newInterval[1]);
    index += 1;
  }
  result.push(newInterval);
  this.intervals = [...result, ...this.intervals.slice(index)];
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function () {
  return this.intervals;
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */
