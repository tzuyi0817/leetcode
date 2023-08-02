# [1481. Least Number of Unique Integers after K Removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>Given an array of integers&nbsp;<code>arr</code>&nbsp;and an integer <code>k</code>.&nbsp;Find the <em>least number of unique integers</em>&nbsp;after removing <strong>exactly</strong> <code>k</code> elements<b>.</b></p>

<ol>
</ol>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input: </strong>arr = [5,5,4], k = 1
<strong>Output: </strong>1
<strong>Explanation</strong>: Remove the single 4, only 5 is left.
</pre>
<strong class="example">Example 2:</strong>

<pre><strong>Input: </strong>arr = [4,3,1,1,3,3,2], k = 3
<strong>Output: </strong>2
<strong>Explanation</strong>: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length&nbsp;&lt;= 10^5</code></li>
	<li><code>1 &lt;= arr[i] &lt;= 10^9</code></li>
	<li><code>0 &lt;= k&nbsp;&lt;= arr.length</code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**
- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function(arr, k) {
    const countMap = arr.reduce((map, num) => {
        const count = map.get(num) ?? 0;

        return map.set(num, count + 1);
    }, new Map());
    const counts = [...countMap.values()];
    const size = counts.length;

    counts.sort((a, b) => a - b);

    for (let index = 0; index < size; index++) {
        k -= counts[index];
        if (k === 0) return size - index - 1;
        if (k < 0) return size - index;
    }
};
```
