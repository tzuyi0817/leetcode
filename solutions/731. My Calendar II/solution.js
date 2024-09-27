const MyCalendarTwo = function () {
  this.events = [];
  this.doubleEvents = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (start, end) {
  for (const event of this.doubleEvents) {
    if (start < event.end && end > event.start) return false;
  }

  for (const event of this.events) {
    if (start >= event.end || end <= event.start) continue;
    const overlayStart = Math.max(event.start, start);
    const overlayEnd = Math.min(event.end, end);

    this.doubleEvents.push({ start: overlayStart, end: overlayEnd });
  }
  this.events.push({ start, end });

  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
