const MyCalendarThree = function () {
  this.timeline = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
  this.timeline.push({ time: startTime, event: 1 });
  this.timeline.push({ time: endTime, event: -1 });
  this.timeline.sort((a, b) => a.time - b.time || a.event - b.event);

  let current = (maxEvents = 0);

  for (const { event } of this.timeline) {
    current += event;
    maxEvents = Math.max(current, maxEvents);
  }
  return maxEvents;
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */
