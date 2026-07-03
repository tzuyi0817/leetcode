# [3620. Network Recovery Pathways](https://leetcode.com/problems/network-recovery-pathways)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a string <code>s</code> consisting of lowercase English letters and the special characters: <code>'*'</code>, <code>'#'</code>, and <code>'%'</code>.</p>

<p>You are also given an integer <code>k</code>.</p>

<p>Build a new string <code>result</code> by processing <code>s</code> according to the following rules from left to right:</p>

<ul>
	<li>If the letter is a <strong>lowercase</strong> English letter append it to <code>result</code>.</li>
	<li>A <code>'*'</code> <strong>removes</strong> the last character from <code>result</code>, if it exists.</li>
	<li>A <code>'#'</code> <strong>duplicates</strong> the current <code>result</code> and <strong>appends</strong> it to itself.</li>
	<li>A <code>'%'</code> <strong>reverses</strong> the current <code>result</code>.</li>
</ul>

<p>Return the <code>k<sup>th</sup></code> character of the final string <code>result</code>. If <code>k</code> is out of the bounds of <code>result</code>, return <code>'.'</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "a#b%*", k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">"a"</span></p>

<p><strong>Explanation:</strong></p>

<table style="border: 1px solid black;"><thead><tr><th style="border: 1px solid black;"><code>i</code></th><th style="border: 1px solid black;"><code>s[i]</code></th><th style="border: 1px solid black;">Operation</th><th style="border: 1px solid black;">Current <code>result</code></th></tr></thead><tbody><tr><td style="border: 1px solid black;">0</td><td style="border: 1px solid black;"><code>'a'</code></td><td style="border: 1px solid black;">Append <code>'a'</code></td><td style="border: 1px solid black;"><code>"a"</code></td></tr><tr><td style="border: 1px solid black;">1</td><td style="border: 1px solid black;"><code>'#'</code></td><td style="border: 1px solid black;">Duplicate <code>result</code></td><td style="border: 1px solid black;"><code>"aa"</code></td></tr><tr><td style="border: 1px solid black;">2</td><td style="border: 1px solid black;"><code>'b'</code></td><td style="border: 1px solid black;">Append <code>'b'</code></td><td style="border: 1px solid black;"><code>"aab"</code></td></tr><tr><td style="border: 1px solid black;">3</td><td style="border: 1px solid black;"><code>'%'</code></td><td style="border: 1px solid black;">Reverse <code>result</code></td><td style="border: 1px solid black;"><code>"baa"</code></td></tr><tr><td style="border: 1px solid black;">4</td><td style="border: 1px solid black;"><code>'*'</code></td><td style="border: 1px solid black;">Remove the last character</td><td style="border: 1px solid black;"><code>"ba"</code></td></tr></tbody></table>

<p>The final <code>result</code> is <code>"ba"</code>. The character at index <code>k = 1</code> is <code>'a'</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "cd%#*#", k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">"d"</span></p>

<p><strong>Explanation:</strong></p>

<table style="border: 1px solid black;"><thead><tr><th style="border: 1px solid black;"><code>i</code></th><th style="border: 1px solid black;"><code>s[i]</code></th><th style="border: 1px solid black;">Operation</th><th style="border: 1px solid black;">Current <code>result</code></th></tr></thead><tbody><tr><td style="border: 1px solid black;">0</td><td style="border: 1px solid black;"><code>'c'</code></td><td style="border: 1px solid black;">Append <code>'c'</code></td><td style="border: 1px solid black;"><code>"c"</code></td></tr><tr><td style="border: 1px solid black;">1</td><td style="border: 1px solid black;"><code>'d'</code></td><td style="border: 1px solid black;">Append <code>'d'</code></td><td style="border: 1px solid black;"><code>"cd"</code></td></tr><tr><td style="border: 1px solid black;">2</td><td style="border: 1px solid black;"><code>'%'</code></td><td style="border: 1px solid black;">Reverse <code>result</code></td><td style="border: 1px solid black;"><code>"dc"</code></td></tr><tr><td style="border: 1px solid black;">3</td><td style="border: 1px solid black;"><code>'#'</code></td><td style="border: 1px solid black;">Duplicate <code>result</code></td><td style="border: 1px solid black;"><code>"dcdc"</code></td></tr><tr><td style="border: 1px solid black;">4</td><td style="border: 1px solid black;"><code>'*'</code></td><td style="border: 1px solid black;">Remove the last character</td><td style="border: 1px solid black;"><code>"dcd"</code></td></tr><tr><td style="border: 1px solid black;">5</td><td style="border: 1px solid black;"><code>'#'</code></td><td style="border: 1px solid black;">Duplicate <code>result</code></td><td style="border: 1px solid black;"><code>"dcddcd"</code></td></tr></tbody></table>

<p>The final <code>result</code> is <code>"dcddcd"</code>. The character at index <code>k = 3</code> is <code>'d'</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "z*#", k = 0</span></p>

<p><strong>Output:</strong> <span class="example-io">"."</span></p>

<p><strong>Explanation:</strong></p>

<table style="border: 1px solid black;"><thead><tr><th style="border: 1px solid black;"><code>i</code></th><th style="border: 1px solid black;"><code>s[i]</code></th><th style="border: 1px solid black;">Operation</th><th style="border: 1px solid black;">Current <code>result</code></th></tr></thead><tbody><tr><td style="border: 1px solid black;">0</td><td style="border: 1px solid black;"><code>'z'</code></td><td style="border: 1px solid black;">Append <code>'z'</code></td><td style="border: 1px solid black;"><code>"z"</code></td></tr><tr><td style="border: 1px solid black;">1</td><td style="border: 1px solid black;"><code>'*'</code></td><td style="border: 1px solid black;">Remove the last character</td><td style="border: 1px solid black;"><code>""</code></td></tr><tr><td style="border: 1px solid black;">2</td><td style="border: 1px solid black;"><code>'#'</code></td><td style="border: 1px solid black;">Duplicate the string</td><td style="border: 1px solid black;"><code>""</code></td></tr></tbody></table>

<p>The final <code>result</code> is <code>""</code>. Since index <code>k = 0</code> is out of bounds, the output is <code>'.'</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of only lowercase English letters and special characters <code>'*'</code>, <code>'#'</code>, and <code>'%'</code>.</li>
	<li><code>0 &lt;= k &lt;= 10<sup>15</sup></code></li>
	<li>The length of <code>result</code> after processing <code>s</code> will not exceed <code>10<sup>15</sup></code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Breadth-First Search`**

- Time complexity: <em>O(E\*logn\*logW)</em>
- Space complexity: <em>O(n+E)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} edges
 * @param {boolean[]} online
 * @param {number} k
 * @return {number}
 */
const findMaxPathScore = function (edges, online, k) {
  const n = online.length;
  const graph = Array.from({ length: n }, () => []);
  let left = Number.MAX_SAFE_INTEGER;
  let right = 0;

  for (const [u, v, cost] of edges) {
    if (!online[u] || !online[v]) continue;

    graph[u].push({ node: v, cost });
    left = Math.min(cost, left);
    right = Math.max(cost, right);
  }

  const isValidCost = targetCost => {
    const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const minHeap = new MinHeap(({ cost }) => cost);

    minHeap.push({ node: 0, cost: 0 });
    dist[0] = 0;

    while (minHeap.size()) {
      const { cost, node } = minHeap.pop();

      if (cost > k) return false;

      if (node === n - 1) return true;

      if (cost !== dist[node]) continue;

      for (const neighbor of graph[node]) {
        if (neighbor.cost < targetCost) continue;

        const nextCost = cost + neighbor.cost;

        if (nextCost >= dist[neighbor.node]) continue;

        minHeap.push({ node: neighbor.node, cost: nextCost });
        dist[neighbor.node] = nextCost;
      }
    }

    return false;
  };

  if (!isValidCost(left)) return -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isValidCost(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return right;
};
```
