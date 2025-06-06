# [1643. Kth Smallest Instructions](https://leetcode.com/problems/kth-smallest-instructions)

## Description

<div class="elfjS" data-track-load="description_content"><p>Bob is standing at cell <code>(0, 0)</code>, and he wants to reach <code>destination</code>: <code>(row, column)</code>. He can only travel <strong>right</strong> and <strong>down</strong>. You are going to help Bob by providing <strong>instructions</strong> for him to reach <code>destination</code>.</p>

<p>The <strong>instructions</strong> are represented as a string, where each character is either:</p>

<ul>
	<li><code>'H'</code>, meaning move horizontally (go <strong>right</strong>), or</li>
	<li><code>'V'</code>, meaning move vertically (go <strong>down</strong>).</li>
</ul>

<p>Multiple <strong>instructions</strong> will lead Bob to <code>destination</code>. For example, if <code>destination</code> is <code>(2, 3)</code>, both <code>"HHHVV"</code> and <code>"HVHVH"</code> are valid <strong>instructions</strong>.</p>

<p>However, Bob is very picky. Bob has a lucky number <code>k</code>, and he wants the <code>k<sup>th</sup></code> <strong>lexicographically smallest instructions</strong> that will lead him to <code>destination</code>. <code>k</code> is <strong>1-indexed</strong>.</p>

<p>Given an integer array <code>destination</code> and an integer <code>k</code>, return <em>the </em><code>k<sup>th</sup></code><em> <strong>lexicographically smallest instructions</strong> that will take Bob to </em><code>destination</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/12/ex1.png" style="width: 300px; height: 229px;"></p>

<pre><strong>Input:</strong> destination = [2,3], k = 1
<strong>Output:</strong> "HHHVV"
<strong>Explanation:</strong> All the instructions that reach (2, 3) in lexicographic order are as follows:
["HHHVV", "HHVHV", "HHVVH", "HVHHV", "HVHVH", "HVVHH", "VHHHV", "VHHVH", "VHVHH", "VVHHH"].
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/12/ex2.png" style="width: 300px; height: 229px;"></strong></p>

<pre><strong>Input:</strong> destination = [2,3], k = 2
<strong>Output:</strong> "HHVHV"
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/12/ex3.png" style="width: 300px; height: 229px;"></strong></p>

<pre><strong>Input:</strong> destination = [2,3], k = 3
<strong>Output:</strong> "HHVVH"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>destination.length == 2</code></li>
	<li><code>1 &lt;= row, column &lt;= 15</code></li>
	<li><code>1 &lt;= k &lt;= nCr(row + column, row)</code>, where <code>nCr(a, b)</code> denotes <code>a</code> choose <code>b</code>​​​​​.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Combinatorics`**

- Time complexity: <em>O((row+column)<sup>2</sup>)</em>
- Space complexity: <em>O((row+column)<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} destination
 * @param {number} k
 * @return {string}
 */
const kthSmallestPath = function (destination, k) {
  let [row, col] = destination;
  const steps = row + col;
  const comb = Array.from({ length: steps + 1 }, () => new Array(steps + 1).fill(1));
  const result = [];

  for (let a = 2; a <= steps; a++) {
    for (let b = 1; b < a; b++) {
      comb[a][b] = comb[a - 1][b] + comb[a - 1][b - 1];
    }
  }

  for (let step = 1; step <= steps; step++) {
    const count = comb[row + col - 1][col - 1];

    if (count >= k) {
      col -= 1;
      result.push('H');
    } else {
      row -= 1;
      k -= count;
      result.push('V');
    }
  }

  return result.join('');
};
```
