# [1477. Find Two Non-overlapping Sub-arrays Each With Target Sum](https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>You are given an array of integers <code>arr</code> and an integer <code>target</code>.</p>

<p>You have to find <strong>two non-overlapping sub-arrays</strong> of <code>arr</code> each with a sum equal <code>target</code>. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is <strong>minimum</strong>.</p>

<p>Return <em>the minimum sum of the lengths</em> of the two required sub-arrays, or return <code>-1</code> if you cannot find such two sub-arrays.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [3,2,2,4,3], target = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> Only two sub-arrays have sum = 3 ([3] and [3]). The sum of their lengths is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [7,3,4,7], target = 7
<strong>Output:</strong> 2
<strong>Explanation:</strong> Although we have three non-overlapping sub-arrays of sum = 7 ([7], [3,4] and [7]), but we will choose the first and third sub-arrays as the sum of their lengths is 2.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> arr = [4,3,2,6,2,3,4], target = 6
<strong>Output:</strong> -1
<strong>Explanation:</strong> We have only one sub-array of sum = 6.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= arr[i] &lt;= 1000</code></li>
	<li><code>1 &lt;= target &lt;= 10<sup>8</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window + Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const minSumOfLengths = function (arr, target) {
  const n = arr.length;
  const prefix = Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER);
  let left = 0;
  let sum = 0;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    sum += arr[index];

    while (left < index && sum > target) {
      sum -= arr[left];
      left += 1;
    }

    if (sum === target) {
      const len = index - left + 1;
      const total = len + prefix[left];

      result = Math.min(total, result);
      prefix[index + 1] = Math.min(len, prefix[index]);
    } else {
      prefix[index + 1] = prefix[index];
    }
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
```
