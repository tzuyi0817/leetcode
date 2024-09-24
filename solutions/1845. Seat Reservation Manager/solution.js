/**
 * @param {number} n
 */
const SeatManager = function (n) {
  this.setPriorityQueue = new MinPriorityQueue();

  for (let num = 1; num <= n; num++) {
    this.setPriorityQueue.enqueue(num);
  }
};

/**
 * @return {number}
 */
SeatManager.prototype.reserve = function () {
  return this.setPriorityQueue.dequeue().element;
};

/**
 * @param {number} seatNumber
 * @return {void}
 */
SeatManager.prototype.unreserve = function (seatNumber) {
  this.setPriorityQueue.enqueue(seatNumber);
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * var obj = new SeatManager(n)
 * var param_1 = obj.reserve()
 * obj.unreserve(seatNumber)
 */
