/**
 * @param {number} m
 * @param {number} k
 */
const MKAverage = function (m, k) {
  this.m = m;
  this.k = k;
  this.queue = [];
  this.low = [];
  this.mid = [];
  this.high = [];
  this.midSum = 0;
};

/**
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  this.queue.push(num);

  if (this.queue.length < this.m) {
    insert(this.mid, num);
    this.midSum += num;
    return;
  }

  if (this.queue.length === this.m) {
    insert(this.mid, num);
    this.midSum += num;

    while (this.low.length < this.k) {
      const smallestMid = this.mid.shift();

      this.midSum -= smallestMid;
      insert(this.low, smallestMid);
    }

    while (this.high.length < this.k) {
      const largestMid = this.mid.pop();

      this.midSum -= largestMid;
      insert(this.high, largestMid);
    }

    return;
  }

  this.removeOldValue();

  if (this.low.length && num <= this.low.at(-1)) {
    insert(this.low, num);
    const largestLow = this.low.pop();

    insert(this.mid, largestLow);
    this.midSum += largestLow;
  } else if (this.high.length && num >= this.high[0]) {
    insert(this.high, num);
    const smallestHigh = this.high.shift();

    insert(this.mid, smallestHigh);
    this.midSum += smallestHigh;
  } else {
    insert(this.mid, num);
    this.midSum += num;
  }

  while (this.low.length < this.k) {
    const smallestMid = this.mid.shift();

    this.midSum -= smallestMid;
    insert(this.low, smallestMid);
  }

  while (this.low.length > this.k) {
    const largestLow = this.low.pop();

    insert(this.mid, largestLow);
    this.midSum += largestLow;
  }

  while (this.high.length < this.k) {
    const largestMid = this.mid.pop();

    this.midSum -= largestMid;
    insert(this.high, largestMid);
  }

  while (this.high.length > this.k) {
    const smallestHigh = this.high.shift();

    insert(this.mid, smallestHigh);
    this.midSum += smallestHigh;
  }
};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  if (this.queue.length < this.m) return -1;

  return Math.floor(this.midSum / (this.m - 2 * this.k));
};

MKAverage.prototype.removeOldValue = function () {
  const old = this.queue.shift();

  if (remove(this.low, old)) return;
  if (remove(this.high, old)) return;
  if (remove(this.mid, old)) {
    this.midSum -= old;
  }
};

function insert(arr, val) {
  let left = 0,
    right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < val) left = mid + 1;
    else right = mid;
  }

  arr.splice(left, 0, val);
}

function remove(arr, val) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === val) {
      arr.splice(mid, 1);
      return true;
    } else if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

/**
 * Your MKAverage object will be instantiated and called as such:
 * var obj = new MKAverage(m, k)
 * obj.addElement(num)
 * var param_2 = obj.calculateMKAverage()
 */
