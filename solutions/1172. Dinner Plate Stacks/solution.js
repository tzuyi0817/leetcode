/**
 * @param {number} capacity
 */
const DinnerPlates = function (capacity) {
  this.platesStacks = [];
  this.capacity = capacity;
  this.stackQueue = new MaxPriorityQueue();
  this.notFullQueue = new MinPriorityQueue();
  this.emptyStackMemo = new Set();
};

/**
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
  if (this.notFullQueue.isEmpty()) {
    this.notFullQueue.enqueue(this.platesStacks.length);
  }
  const index = this.notFullQueue.front().element;

  if (!this.platesStacks[index]) {
    this.platesStacks[index] = [];
  }
  const stack = this.platesStacks[index];

  if (!stack.length) {
    this.stackQueue.enqueue(index);
  }
  stack.push(val);
  if (stack.length !== this.capacity) return;

  this.notFullQueue.dequeue();
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
  if (this.stackQueue.isEmpty()) return -1;

  let index = this.stackQueue.front().element;

  if (this.emptyStackMemo.has(index)) {
    this.stackQueue.dequeue();
    this.emptyStackMemo.delete(index);
    if (this.stackQueue.isEmpty()) return -1;

    index = this.stackQueue.front().element;
  }
  const stack = this.platesStacks[index];

  if (stack.length === this.capacity) {
    this.notFullQueue.enqueue(index);
  }
  const value = stack.pop();

  if (stack.length) return value;

  this.stackQueue.dequeue();
  return value;
};

/**
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
  const stack = this.platesStacks[index];

  if (!stack?.length) return -1;
  if (stack.length === this.capacity) {
    this.notFullQueue.enqueue(index);
  }
  const value = stack.pop();

  if (stack.length) return value;

  this.emptyStackMemo.add(index);
  return value;
};

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * var obj = new DinnerPlates(capacity)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAtStack(index)
 */
