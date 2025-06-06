# [354. Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D array of integers <code>envelopes</code> where <code>envelopes[i] = [w<sub>i</sub>, h<sub>i</sub>]</code> represents the width and the height of an envelope.</p>

<p>One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.</p>

<p>Return <em>the maximum number of envelopes you can Russian doll (i.e., put one inside the other)</em>.</p>

<p><strong>Note:</strong> You cannot rotate an envelope.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> envelopes = [[5,4],[6,4],[6,7],[2,3]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The maximum number of envelopes you can Russian doll is <code>3</code> ([2,3] =&gt; [5,4] =&gt; [6,7]).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> envelopes = [[1,1],[1,1],[1,1]]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= envelopes.length &lt;= 10<sup>5</sup></code></li>
	<li><code>envelopes[i].length == 2</code></li>
	<li><code>1 &lt;= w<sub>i</sub>, h<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = function (envelopes) {
  const dp = [];

  envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (const envelope of envelopes) {
    const height = envelope[1];
    let left = 0;
    let right = dp.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      dp[mid] >= height ? (right = mid) : (left = mid + 1);
    }
    left >= dp.length ? dp.push(height) : (dp[left] = height);
  }
  return dp.length;
};
```
