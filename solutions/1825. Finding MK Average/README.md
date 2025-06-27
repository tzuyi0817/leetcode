# [1825. Finding MK Average](https://leetcode.com/problems/finding-mk-average)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two integers, <code>m</code> and <code>k</code>, and a stream of integers. You are tasked to implement a data structure that calculates the <strong>MKAverage</strong> for the stream.</p>

<p>The <strong>MKAverage</strong> can be calculated using these steps:</p>

<ol>
	<li>If the number of the elements in the stream is less than <code>m</code> you should consider the <strong>MKAverage</strong> to be <code>-1</code>. Otherwise, copy the last <code>m</code> elements of the stream to a separate container.</li>
	<li>Remove the smallest <code>k</code> elements and the largest <code>k</code> elements from the container.</li>
	<li>Calculate the average value for the rest of the elements <strong>rounded down to the nearest integer</strong>.</li>
</ol>

<p>Implement the <code>MKAverage</code> class:</p>

<ul>
	<li><code>MKAverage(int m, int k)</code> Initializes the <strong>MKAverage</strong> object with an empty stream and the two integers <code>m</code> and <code>k</code>.</li>
	<li><code>void addElement(int num)</code> Inserts a new element <code>num</code> into the stream.</li>
	<li><code>int calculateMKAverage()</code> Calculates and returns the <strong>MKAverage</strong> for the current stream <strong>rounded down to the nearest integer</strong>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["MKAverage", "addElement", "addElement", "calculateMKAverage", "addElement", "calculateMKAverage", "addElement", "addElement", "addElement", "calculateMKAverage"]
[[3, 1], [3], [1], [], [10], [], [5], [5], [5], []]
<strong>Output</strong>
[null, null, null, -1, null, 3, null, null, null, 5]

<strong>Explanation</strong>
<code>MKAverage obj = new MKAverage(3, 1); 
obj.addElement(3);        // current elements are [3]
obj.addElement(1);        // current elements are [3,1]
obj.calculateMKAverage(); // return -1, because m = 3 and only 2 elements exist.
obj.addElement(10);       // current elements are [3,1,10]
obj.calculateMKAverage(); // The last 3 elements are [3,1,10].
                          // After removing smallest and largest 1 element the container will be [3].
                          // The average of [3] equals 3/1 = 3, return 3
obj.addElement(5);        // current elements are [3,1,10,5]
obj.addElement(5);        // current elements are [3,1,10,5,5]
obj.addElement(5);        // current elements are [3,1,10,5,5,5]
obj.calculateMKAverage(); // The last 3 elements are [5,5,5].
                          // After removing smallest and largest 1 element the container will be [5].
                          // The average of [5] equals 5/1 = 5, return 5
</code></pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= m &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt; k*2 &lt; m</code></li>
	<li><code>1 &lt;= num &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>10<sup>5</sup></code> calls will be made to <code>addElement</code> and <code>calculateMKAverage</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
