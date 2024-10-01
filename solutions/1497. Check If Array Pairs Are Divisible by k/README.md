# [1497. Check If Array Pairs Are Divisible by k](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>Given an array of integers <code>arr</code> of even length <code>n</code> and an integer <code>k</code>.</p>

<p>We want to divide the array into exactly <code>n / 2</code> pairs such that the sum of each pair is divisible by <code>k</code>.</p>

<p>Return <code>true</code><em> If you can find a way to do that or </em><code>false</code><em> otherwise</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3,4,5,10,6,7,8,9], k = 5
<strong>Output:</strong> true
<strong>Explanation:</strong> Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3,4,5,6], k = 7
<strong>Output:</strong> true
<strong>Explanation:</strong> Pairs are (1,6),(2,5) and(3,4).
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3,4,5,6], k = 10
<strong>Output:</strong> false
<strong>Explanation:</strong> You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>arr.length == n</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>n</code> is even.</li>
	<li><code>-10<sup>9</sup> &lt;= arr[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Counting`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
const canArrange = function (arr, k) {
  const remainderMap = new Map();

  for (const num of arr) {
    const remainder = ((num % k) + k) % k;
    const count = remainderMap.get(remainder) ?? 0;

    remainderMap.set(remainder, count + 1);
  }

  if (remainderMap.get(0) % 2) return false;

  for (let num = 1; num <= k / 2; num++) {
    const count = remainderMap.get(num);
    const pair = k - num;

    if (count !== remainderMap.get(pair)) return false;
  }
  return true;
};
```
