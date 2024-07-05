# [715. Range Module](https://leetcode.com/problems/range-module)

## Description

<div class="elfjS" data-track-load="description_content"><p>A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as <strong>half-open intervals</strong> and query about them.</p>

<p>A <strong>half-open interval</strong> <code>[left, right)</code> denotes all the real numbers <code>x</code> where <code>left &lt;= x &lt; right</code>.</p>

<p>Implement the <code>RangeModule</code> class:</p>

<ul>
	<li><code>RangeModule()</code> Initializes the object of the data structure.</li>
	<li><code>void addRange(int left, int right)</code> Adds the <strong>half-open interval</strong> <code>[left, right)</code>, tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval <code>[left, right)</code> that are not already tracked.</li>
	<li><code>boolean queryRange(int left, int right)</code> Returns <code>true</code> if every real number in the interval <code>[left, right)</code> is currently being tracked, and <code>false</code> otherwise.</li>
	<li><code>void removeRange(int left, int right)</code> Stops tracking every real number currently being tracked in the <strong>half-open interval</strong> <code>[left, right)</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
<strong>Output</strong>
[null, null, null, true, false, true]

<strong>Explanation</strong>
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= left &lt; right &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>addRange</code>, <code>queryRange</code>, and <code>removeRange</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
var RangeModule = function() {
    this.intervals = [];
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.addRange = function(left, right) {
    const n = this.intervals.length;
    const intervals = [];
    let index = 0;

    while (index < n && this.intervals[index].right < left) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    const interval = { left, right };

    while (index < n && this.intervals[index].left <= interval.right) {
        interval.left = Math.min(this.intervals[index].left, interval.left);
        interval.right = Math.max(this.intervals[index].right, interval.right);
        index += 1;
    }
    intervals.push(interval);

    while (index < n) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    this.intervals = intervals;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {boolean}
 */
RangeModule.prototype.queryRange = function(left, right) {
    let low = 0;
    let high = this.intervals.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const interval = this.intervals[mid];

        if (interval.left <= left && interval.right >= right) return true;

        interval.left > left ? high = mid - 1 : low = mid + 1;
    }
    return false;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.removeRange = function(left, right) {
    const n = this.intervals.length;
    const intervals = [];
    let index = 0;

    if (index < n && this.intervals[index].left > right) return;

    while (index < n && this.intervals[index].right < left) {
        intervals.push(this.intervals[index]);
        index += 1;
    }

    if (index < n && this.intervals[index].left < left) {
        const intervalFirst = { left: this.intervals[index].left, right: left };

        intervals.push(intervalFirst);

        if (this.intervals[index].right > right) {
            const intervalSecond = { left: right, right: this.intervals[index].right };

            intervals.push(intervalSecond);
        }
        index += 1;
    }

    while (index < n && this.intervals[index].right <= right) index += 1;

    if (index < n && this.intervals[index].left < right) {
        intervals.push({ left: right, right: this.intervals[index].right });
        index += 1;
    }

    while (index < n) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    this.intervals = intervals;
};

/** 
 * Your RangeModule object will be instantiated and called as such:
 * var obj = new RangeModule()
 * obj.addRange(left,right)
 * var param_2 = obj.queryRange(left,right)
 * obj.removeRange(left,right)
 */
```
