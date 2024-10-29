/**
 * @param {number} maxSize
 */
const CustomStack = function (maxSize) {
  this.stack = [];
  this.increments = new Array(maxSize).fill(0);
  this.maxSize = maxSize;
};

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.stack.length >= this.maxSize) return;

  this.stack.push(x);
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  const n = this.stack.length;

  if (!n) return -1;
  const value = this.stack.pop();
  const increment = this.increments[n - 1];

  this.increments[n - 2] += increment;
  this.increments[n - 1] = 0;

  return value + increment;
};

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  const n = Math.min(k, this.stack.length);

  if (!n) return;
  this.increments[n - 1] += val;
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
