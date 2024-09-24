const StockPrice = function () {
  this.latest = 0;
  this.minQueue = new MinPriorityQueue({ priority: ({ price }) => price });
  this.maxQueue = new MaxPriorityQueue({ priority: ({ price }) => price });
  this.stockMap = new Map();
};

/**
 * @param {number} timestamp
 * @param {number} price
 * @return {void}
 */
StockPrice.prototype.update = function (timestamp, price) {
  this.minQueue.enqueue({ timestamp, price });
  this.maxQueue.enqueue({ timestamp, price });
  this.stockMap.set(timestamp, price);
  this.latest = Math.max(timestamp, this.latest);
};

/**
 * @return {number}
 */
StockPrice.prototype.current = function () {
  return this.stockMap.get(this.latest);
};

/**
 * @return {number}
 */
StockPrice.prototype.maximum = function () {
  let result = this.maxQueue.front().element;

  while (result.price !== this.stockMap.get(result.timestamp)) {
    this.maxQueue.dequeue();
    result = this.maxQueue.front().element;
  }
  return result.price;
};

/**
 * @return {number}
 */
StockPrice.prototype.minimum = function () {
  let result = this.minQueue.front().element;

  while (result.price !== this.stockMap.get(result.timestamp)) {
    this.minQueue.dequeue();
    result = this.minQueue.front().element;
  }
  return result.price;
};

/**
 * Your StockPrice object will be instantiated and called as such:
 * var obj = new StockPrice()
 * obj.update(timestamp,price)
 * var param_2 = obj.current()
 * var param_3 = obj.maximum()
 * var param_4 = obj.minimum()
 */
