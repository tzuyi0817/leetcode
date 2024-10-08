# [2080. Range Frequency Queries](https://leetcode.com/problems/range-frequency-queries)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design a data structure to find the <strong>frequency</strong> of a given value in a given subarray.</p>

<p>The <strong>frequency</strong> of a value in a subarray is the number of occurrences of that value in the subarray.</p>

<p>Implement the <code>RangeFreqQuery</code> class:</p>

<ul>
	<li><code>RangeFreqQuery(int[] arr)</code> Constructs an instance of the class with the given <strong>0-indexed</strong> integer array <code>arr</code>.</li>
	<li><code>int query(int left, int right, int value)</code> Returns the <strong>frequency</strong> of <code>value</code> in the subarray <code>arr[left...right]</code>.</li>
</ul>

<p>A <strong>subarray</strong> is a contiguous sequence of elements within an array. <code>arr[left...right]</code> denotes the subarray that contains the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> (<strong>inclusive</strong>).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["RangeFreqQuery", "query", "query"]
[[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
<strong>Output</strong>
[null, 1, 2]

<strong>Explanation</strong>
RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
rangeFreqQuery.query(1, 2, 4); // return 1. The value 4 occurs 1 time in the subarray [33, 4]
rangeFreqQuery.query(0, 11, 33); // return 2. The value 33 occurs 2 times in the whole array.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= arr[i], value &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= left &lt;= right &lt; arr.length</code></li>
	<li>At most <code>10<sup>5</sup></code> calls will be made to <code>query</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table + Binary Search`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 */
const RangeFreqQuery = function (arr) {
  this.frequencyMap = arr.reduce((map, value, index) => {
    const indices = map.get(value);

    indices ? indices.push(index) : map.set(value, [index]);
    return map;
  }, new Map());
};

function binarySearch(arr, target, lower = false) {
  let left = 0;
  let right = arr.length;
  const isBigger = value => (lower ? target > value : target >= value);

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    isBigger(arr[middle]) ? (left = middle + 1) : (right = middle);
  }
  return left;
}

/**
 * @param {number} left
 * @param {number} right
 * @param {number} value
 * @return {number}
 */
RangeFreqQuery.prototype.query = function (left, right, value) {
  if (!this.frequencyMap.has(value)) return 0;
  const indices = this.frequencyMap.get(value);

  return binarySearch(indices, right) - binarySearch(indices, left, true);
};

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * var obj = new RangeFreqQuery(arr)
 * var param_1 = obj.query(left,right,value)
 */
```
