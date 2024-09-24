const MedianFinder = function () {
  this.smallQueue = new MaxPriorityQueue();
  this.largeQueue = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.smallQueue.enqueue(num);
  this.largeQueue.enqueue(this.smallQueue.dequeue().element);

  if (this.smallQueue.size() >= this.largeQueue.size()) return;
  this.smallQueue.enqueue(this.largeQueue.dequeue().element);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const median = this.smallQueue.front().element;

  return this.smallQueue.size() > this.largeQueue.size() ? median : (median + this.largeQueue.front().element) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
