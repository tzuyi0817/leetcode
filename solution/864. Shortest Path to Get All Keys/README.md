# [864. Shortest Path to Get All Keys](https://leetcode.com/problems/shortest-path-to-get-all-keys)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> grid <code>grid</code> where:</p>

<ul>
	<li><code>'.'</code> is an empty cell.</li>
	<li><code>'#'</code> is a wall.</li>
	<li><code>'@'</code> is the starting point.</li>
	<li>Lowercase letters represent keys.</li>
	<li>Uppercase letters represent locks.</li>
</ul>

<p>You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.</p>

<p>If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.</p>

<p>For some <code><font face="monospace">1 &lt;= k &lt;= 6</font></code>, there is exactly one lowercase and one uppercase letter of the first <code>k</code> letters of the English alphabet in the grid. This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.</p>

<p>Return <em>the lowest number of moves to acquire all keys</em>. If it is impossible, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys2.jpg" style="width: 404px; height: 245px;">
<pre><strong>Input:</strong> grid = ["@.a..","###.#","b.A.B"]
<strong>Output:</strong> 8
<strong>Explanation:</strong> Note that the goal is to obtain all the keys not to open all the locks.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-key2.jpg" style="width: 404px; height: 245px;">
<pre><strong>Input:</strong> grid = ["@..aA","..B#.","....b"]
<strong>Output:</strong> 6
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys3.jpg" style="width: 244px; height: 85px;">
<pre><strong>Input:</strong> grid = ["@Aa"]
<strong>Output:</strong> -1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 30</code></li>
	<li><code>grid[i][j]</code> is either an English letter, <code>'.'</code>, <code>'#'</code>, or <code>'@'</code>.&nbsp;</li>
	<li>There is exactly one&nbsp;<code>'@'</code>&nbsp;in the grid.</li>
	<li>The number of keys in the grid is in the range <code>[1, 6]</code>.</li>
	<li>Each key in the grid is <strong>unique</strong>.</li>
	<li>Each key in the grid has a matching lock.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Bit Manipulation`**
- Time complexity: <em>O(mn*2<sup>keys.length</sup>)</em>
- Space complexity: <em>O(mn*2<sup>keys.length</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} grid
 * @return {number}
 */
var shortestPathAllKeys = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const visited = new Set();
    let startPoint = { row: -1, col: -1 };
    let totalKeys = 0;

    const isKey = (value) => /[a-z]/.test(value);
    const isLock = (value) => /[A-Z]/.test(value);

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const value = grid[row][col];

            if (isKey(value)) totalKeys += 1;
            if (value === '@') {
                startPoint.row = row;
                startPoint.col = col;
                visited.add(`${row * n + col}_0`)
            }
        }
    }
    const moveDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const bitmaskMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };
    const keysBitmask = (1 << totalKeys) - 1;
    let queue = [{ ...startPoint, keys: 0 }];
    let result = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const { row, col, keys } of queue) {
            for (const [moveRow, moveCol] of moveDirections) {
                const nextRow = row + moveRow;
                const nextCol = col + moveCol;

                if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
                const value = grid[nextRow][nextCol];
                let nextKeys = keys;

                if (value === '#') continue;

                if (isLock(value)) {
                    const bitmask = 1 << bitmaskMap[value.toLowerCase()];

                    if ((nextKeys & bitmask) !== bitmask) continue;
                }
                if (isKey(value)) {
                    nextKeys |= (1 << bitmaskMap[value]);
                    if (nextKeys === keysBitmask) return result + 1;
                }
                const visitedKey = `${nextRow * n + nextCol}_${nextKeys}`;

                if (visited.has(visitedKey)) continue;
                visited.add(visitedKey);
                nextQueue.push({ row: nextRow, col: nextCol, keys: nextKeys });
            }
        }
        result += 1;
        queue = nextQueue;
    }
    return -1;
};
```
