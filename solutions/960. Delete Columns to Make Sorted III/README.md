# [960. Delete Columns to Make Sorted III](https://leetcode.com/problems/delete-columns-to-make-sorted-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array of <code>n</code> strings <code>strs</code>, all of the same length.</p>

<p>We may choose any deletion indices, and we delete all the characters in those indices for each string.</p>

<p>For example, if we have <code>strs = ["abcdef","uvwxyz"]</code> and deletion indices <code>{0, 2, 3}</code>, then the final array after deletions is <code>["bef", "vyz"]</code>.</p>

<p>Suppose we chose a set of deletion indices <code>answer</code> such that after deletions, the final array has <strong>every string (row) in lexicographic</strong> order. (i.e., <code>(strs[0][0] &lt;= strs[0][1] &lt;= ... &lt;= strs[0][strs[0].length - 1])</code>, and <code>(strs[1][0] &lt;= strs[1][1] &lt;= ... &lt;= strs[1][strs[1].length - 1])</code>, and so on). Return <em>the minimum possible value of</em> <code>answer.length</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> strs = ["babca","bbazb"]
<strong>Output:</strong> 3
<strong>Explanation:</strong> After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
Both these rows are individually in lexicographic order (ie. strs[0][0] &lt;= strs[0][1] and strs[1][0] &lt;= strs[1][1]).
Note that strs[0] &gt; strs[1] - the array strs is not necessarily in lexicographic order.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> strs = ["edcba"]
<strong>Output:</strong> 4
<strong>Explanation:</strong> If we delete less than 4 columns, the only row will not be lexicographically sorted.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> strs = ["ghi","def","abc"]
<strong>Output:</strong> 0
<strong>Explanation:</strong> All rows are already lexicographically sorted.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == strs.length</code></li>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>
	<li><code>strs[i]</code> consists of lowercase English letters.</li>
</ul>

<ul>
	<li>&nbsp;</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(str.length<sup>2</sup>\*n)</em>
- Space complexity: <em>O(str.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} strs
 * @return {number}
 */
const minDeletionSize = function (strs) {
  const m = strs[0].length;
  const dp = new Array(m).fill(1);

  const isSorted = (a, b) => {
    for (const word of strs) {
      if (word[b] > word[a]) return false;
    }
    return true;
  };

  for (let a = 1; a < m; a++) {
    for (let b = 0; b < a; b++) {
      if (!isSorted(a, b)) continue;
      dp[a] = Math.max(dp[b] + 1, dp[a]);
    }
  }
  return m - Math.max(...dp);
};
```
