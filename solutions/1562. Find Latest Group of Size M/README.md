# [1562. Find Latest Group of Size M](https://leetcode.com/problems/find-latest-group-of-size-m)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given an array <code>arr</code> that represents a permutation of numbers from <code>1</code> to <code>n</code>.</p>

<p>You have a binary string of size <code>n</code> that initially has all its bits set to zero. At each step <code>i</code> (assuming both the binary string and <code>arr</code> are 1-indexed) from <code>1</code> to <code>n</code>, the bit at position <code>arr[i]</code> is set to <code>1</code>.</p>

<p>You are also given an integer <code>m</code>. Find the latest step at which there exists a group of ones of length <code>m</code>. A group of ones is a contiguous substring of <code>1</code>'s such that it cannot be extended in either direction.</p>

<p>Return <em>the latest step at which there exists a group of ones of length <strong>exactly</strong></em> <code>m</code>. <em>If no such group exists, return</em> <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [3,5,1,2,4], m = 1
<strong>Output:</strong> 4
<strong>Explanation:</strong> 
Step 1: "00<u>1</u>00", groups: ["1"]
Step 2: "0010<u>1</u>", groups: ["1", "1"]
Step 3: "<u>1</u>0101", groups: ["1", "1", "1"]
Step 4: "1<u>1</u>101", groups: ["111", "1"]
Step 5: "111<u>1</u>1", groups: ["11111"]
The latest step at which there exists a group of size 1 is step 4.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [3,1,5,4,2], m = 2
<strong>Output:</strong> -1
<strong>Explanation:</strong> 
Step 1: "00<u>1</u>00", groups: ["1"]
Step 2: "<u>1</u>0100", groups: ["1", "1"]
Step 3: "1010<u>1</u>", groups: ["1", "1", "1"]
Step 4: "101<u>1</u>1", groups: ["1", "111"]
Step 5: "1<u>1</u>111", groups: ["11111"]
No group of size 2 exists during any step.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == arr.length</code></li>
	<li><code>1 &lt;= m &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= arr[i] &lt;= n</code></li>
	<li>All integers in <code>arr</code> are <strong>distinct</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @param {number} m
 * @return {number}
 */
const findLatestStep = function (arr, m) {
  const size = arr.length;
  const sizes = new Array(size + 2).fill(0);
  const counts = new Array(size + 2).fill(0);

  return arr.reduce((result, position, index) => {
    const left = sizes[position - 1];
    const right = sizes[position + 1];
    const length = right + left + 1;

    sizes[position] = sizes[position - left] = sizes[position + right] = length;
    counts[left] -= 1;
    counts[right] -= 1;
    counts[length] += 1;
    return counts[m] ? index + 1 : result;
  }, -1);
};
```
