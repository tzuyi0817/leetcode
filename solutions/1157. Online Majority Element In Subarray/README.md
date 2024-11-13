# [1157. Online Majority Element In Subarray](https://leetcode.com/problems/online-majority-element-in-subarray)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design a data structure that efficiently finds the <strong>majority element</strong> of a given subarray.</p>

<p>The <strong>majority element</strong> of a subarray is an element that occurs <code>threshold</code> times or more in the subarray.</p>

<p>Implementing the <code>MajorityChecker</code> class:</p>

<ul>
	<li><code>MajorityChecker(int[] arr)</code> Initializes the instance of the class with the given array <code>arr</code>.</li>
	<li><code>int query(int left, int right, int threshold)</code> returns the element in the subarray <code>arr[left...right]</code> that occurs at least <code>threshold</code> times, or <code>-1</code> if no such element exists.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["MajorityChecker", "query", "query", "query"]
[[[1, 1, 2, 2, 1, 1]], [0, 5, 4], [0, 3, 3], [2, 3, 2]]
<strong>Output</strong>
[null, 1, -1, 2]

<strong>Explanation</strong>
MajorityChecker majorityChecker = new MajorityChecker([1, 1, 2, 2, 1, 1]);
majorityChecker.query(0, 5, 4); // return 1
majorityChecker.query(0, 3, 3); // return -1
majorityChecker.query(2, 3, 2); // return 2
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= arr[i] &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>0 &lt;= left &lt;= right &lt; arr.length</code></li>
	<li><code>threshold &lt;= right - left + 1</code></li>
	<li><code>2 * threshold &gt; right - left + 1</code></li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to <code>query</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O(20logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
const MajorityChecker = function (arr) {
  const n = arr.length;

  this.arr = arr;
  this.majorityMap = new Map();
  this.checkTimes = Math.ceil(Math.log2(10 ** 4));

  for (let index = 0; index < n; index++) {
    const num = arr[index];

    if (!this.majorityMap.has(num)) {
      this.majorityMap.set(num, []);
    }
    const indices = this.majorityMap.get(num);

    indices.push(index);
  }
};

MajorityChecker.prototype.query = function (left, right, threshold) {
  const findIndex = (indices, target) => {
    let low = 0;
    let high = indices.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      indices[mid] > target ? (high = mid - 1) : (low = mid + 1);
    }
    return { low, high };
  };

  for (let index = 0; index < this.checkTimes; index++) {
    const random = Math.floor(Math.random() * (right - left) + left);
    const num = this.arr[random];
    const indices = this.majorityMap.get(num);
    const { low: leftIndex } = findIndex(indices, left - 1);
    const { high: rightIndex } = findIndex(indices, right);

    if (rightIndex < leftIndex) continue;
    if (rightIndex - leftIndex + 1 >= threshold) return num;
  }
  return -1;
};
```
