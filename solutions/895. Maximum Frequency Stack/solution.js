const FreqStack = function () {
  this.maxFrequency = 0;
  this.frequencyMap = new Map();
  this.frequencies = [];
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  const frequency = (this.frequencyMap.get(val) ?? 0) + 1;

  this.frequencyMap.set(val, frequency);
  if (!this.frequencies[frequency]) this.frequencies[frequency] = [];
  this.frequencies[frequency].push(val);
  this.maxFrequency = Math.max(frequency, this.maxFrequency);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const frequencies = this.frequencies[this.maxFrequency];
  const value = frequencies.pop();
  const frequency = this.frequencyMap.get(value);

  this.frequencyMap.set(value, frequency - 1);
  if (!frequencies.length) this.maxFrequency -= 1;
  return value;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
