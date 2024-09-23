# [1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are a hiker preparing for an upcoming hike. You are given <code>heights</code>, a 2D array of size <code>rows x columns</code>, where <code>heights[row][col]</code> represents the height of cell <code>(row, col)</code>. You are situated in the top-left cell, <code>(0, 0)</code>, and you hope to travel to the bottom-right cell, <code>(rows-1, columns-1)</code> (i.e.,&nbsp;<strong>0-indexed</strong>). You can move <strong>up</strong>, <strong>down</strong>, <strong>left</strong>, or <strong>right</strong>, and you wish to find a route that requires the minimum <strong>effort</strong>.</p>

<p>A route's <strong>effort</strong> is the <strong>maximum absolute difference</strong><strong> </strong>in heights between two consecutive cells of the route.</p>

<p>Return <em>the minimum <strong>effort</strong> required to travel from the top-left cell to the bottom-right cell.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/04/ex1.png" style="width: 300px; height: 300px;"></p>

<pre><strong>Input:</strong> heights = [[1,2,2],[3,8,2],[5,3,5]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/04/ex2.png" style="width: 300px; height: 300px;"></p>

<pre><strong>Input:</strong> heights = [[1,2,3],[3,8,4],[5,3,5]]
<strong>Output:</strong> 1
<strong>Explanation:</strong> The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/04/ex3.png" style="width: 300px; height: 300px;">
<pre><strong>Input:</strong> heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> This route does not require any effort.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>rows == heights.length</code></li>
	<li><code>columns == heights[i].length</code></li>
	<li><code>1 &lt;= rows, columns &lt;= 100</code></li>
	<li><code>1 &lt;= heights[i][j] &lt;= 10<sup>6</sup></code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Binary Search`**
- Time complexity: <em>O(m∗nlogheight)</em>
- Space complexity: <em>O(m∗n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    const m = heights.length;
    const n = heights[0].length;
    const visited = new Set();
    const isMiniEffort = (row, col, limit, preHeight) => {
        if (row >= m || col >= n || row < 0 | col < 0) return false;
        const position = `${row}_${col}`;
        const height = heights[row][col];

        if (visited.has(position)) return false;
        if (Math.abs(height - preHeight) > limit) return false;
        if (row === m - 1 && col === n - 1) return true;
        visited.add(position);
        return isMiniEffort(row - 1, col, limit, height) ||
        isMiniEffort(row + 1, col, limit, height) ||
        isMiniEffort(row, col - 1, limit, height) ||
        isMiniEffort(row, col + 1, limit, height);
    };
    let left = 0;
    let right = 10 ** 6;  

    while (left < right) {
        const mid =  Math.floor((left + right) / 2);

        visited.clear();
        isMiniEffort(0, 0, mid, heights[0][0]) 
            ? right = mid
            : left = mid + 1
    }
    return left;
};
```
