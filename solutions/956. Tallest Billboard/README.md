# [956. Tallest Billboard](https://leetcode.com/problems/tallest-billboard)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.</p>

<p>You are given a collection of <code>rods</code> that can be welded together. For example, if you have rods of lengths <code>1</code>, <code>2</code>, and <code>3</code>, you can weld them together to make a support of length <code>6</code>.</p>

<p>Return <em>the largest possible height of your billboard installation</em>. If you cannot support the billboard, return <code>0</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> rods = [1,2,3,6]
<strong>Output:</strong> 6
<strong>Explanation:</strong> We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> rods = [1,2,3,4,5,6]
<strong>Output:</strong> 10
<strong>Explanation:</strong> We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> rods = [1,2]
<strong>Output:</strong> 0
<strong>Explanation:</strong> The billboard cannot be supported, so we return 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= rods.length &lt;= 20</code></li>
	<li><code>1 &lt;= rods[i] &lt;= 1000</code></li>
	<li><code>sum(rods[i]) &lt;= 5000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n \* sumRods)</em>
- Space complexity: <em>O(sumRods)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} rods
 * @return {number}
 */
const tallestBillboard = function (rods) {
  const sumRods = rods.reduce((result, rod) => result + rod);
  const dp = new Array(sumRods + 1).fill(-1);

  dp[0] = 0;

  for (const rod of rods) {
    const previous = [...dp];

    for (let h = 0; h <= sumRods - rod; h++) {
      if (previous[h] < 0) continue;
      const diff = Math.abs(h - rod);

      dp[h] = Math.max(dp[h], previous[h]);
      dp[h + rod] = Math.max(dp[h + rod], previous[h]);
      dp[diff] = Math.max(dp[diff], previous[h] + Math.min(rod, h));
    }
  }
  return dp[0];
};
```
