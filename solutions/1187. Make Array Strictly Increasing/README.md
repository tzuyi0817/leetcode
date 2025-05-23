# [1187. Make Array Strictly Increasing](https://leetcode.com/problems/make-array-strictly-increasing)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two integer arrays&nbsp;<code>arr1</code> and <code>arr2</code>, return the minimum number of operations (possibly zero) needed&nbsp;to make <code>arr1</code> strictly increasing.</p>

<p>In one operation, you can choose two indices&nbsp;<code>0 &lt;=&nbsp;i &lt; arr1.length</code>&nbsp;and&nbsp;<code>0 &lt;= j &lt; arr2.length</code>&nbsp;and do the assignment&nbsp;<code>arr1[i] = arr2[j]</code>.</p>

<p>If there is no way to make&nbsp;<code>arr1</code>&nbsp;strictly increasing,&nbsp;return&nbsp;<code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
<strong>Output:</strong> 1
<strong>Explanation:</strong> Replace <code>5</code> with <code>2</code>, then <code>arr1 = [1, 2, 3, 6, 7]</code>.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr1 = [1,5,3,6,7], arr2 = [4,3,1]
<strong>Output:</strong> 2
<strong>Explanation:</strong> Replace <code>5</code> with <code>3</code> and then replace <code>3</code> with <code>4</code>. <code>arr1 = [1, 3, 4, 6, 7]</code>.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
<strong>Output:</strong> -1
<strong>Explanation:</strong> You can't make <code>arr1</code> strictly increasing.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr1.length, arr2.length &lt;= 2000</code></li>
	<li><code>0 &lt;= arr1[i], arr2[i] &lt;= 10^9</code></li>
</ul>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Binary Search`**

- Time complexity: <em>O(arr1.length\*nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
const makeArrayIncreasing = function (arr1, arr2) {
  const n = arr2.length;
  let dp = new Map([[-1, 0]]);

  arr2.sort((a, b) => a - b);

  const getAssignIndex = target => {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      arr2[mid] > target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  for (const num of arr1) {
    const nextDp = new Map();

    for (const [value, times] of dp) {
      if (num > value) {
        const numTimes = nextDp.get(num) ?? Number.MAX_SAFE_INTEGER;

        nextDp.set(num, Math.min(numTimes, times));
      }
      const index = getAssignIndex(value);

      if (index === n) continue;
      const assignNum = arr2[index];
      const assignNumTimes = nextDp.get(assignNum) ?? Number.MAX_SAFE_INTEGER;

      nextDp.set(assignNum, Math.min(assignNumTimes, times + 1));
    }
    if (!nextDp.size) return -1;
    dp = nextDp;
  }
  return Math.min(...dp.values());
};
```
