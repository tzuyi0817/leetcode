# [675. Cut Off Trees for Golf Event](https://leetcode.com/problems/cut-off-trees-for-golf-event)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an <code>m x n</code> matrix. In this matrix:</p>

<ul>
	<li><code>0</code> means the cell cannot be walked through.</li>
	<li><code>1</code> represents an empty cell that can be walked through.</li>
	<li>A number greater than <code>1</code> represents a tree in a cell that can be walked through, and this number is the tree's height.</li>
</ul>

<p>In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.</p>

<p>You must cut off the trees in order from shortest to tallest. When you cut off a tree, the value at its cell becomes <code>1</code> (an empty cell).</p>

<p>Starting from the point <code>(0, 0)</code>, return <em>the minimum steps you need to walk to cut off all the trees</em>. If you cannot cut off all the trees, return <code>-1</code>.</p>

<p><strong>Note:</strong> The input is generated such that no two trees have the same height, and there is at least one tree needs to be cut off.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/trees1.jpg" style="width: 242px; height: 242px;">
<pre><strong>Input:</strong> forest = [[1,2,3],[0,0,4],[7,6,5]]
<strong>Output:</strong> 6
<strong>Explanation:</strong> Following the path above allows you to cut off the trees from shortest to tallest in 6 steps.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/trees2.jpg" style="width: 242px; height: 242px;">
<pre><strong>Input:</strong> forest = [[1,2,3],[0,0,0],[7,6,5]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> The trees in the bottom row cannot be accessed as the middle row is blocked.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> forest = [[2,3,4],[0,0,5],[8,7,6]]
<strong>Output:</strong> 6
<b>Explanation:</b> You can follow the same path as Example 1 to cut off all the trees.
Note that you can cut off the first tree at (0, 0) before making any steps.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == forest.length</code></li>
	<li><code>n == forest[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 50</code></li>
	<li><code>0 &lt;= forest[i][j] &lt;= 10<sup>9</sup></code></li>
	<li>Heights of all trees are <strong>distinct</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(m<sup>2</sup>n<sup>2</sup>)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} forest
 * @return {number}
 */
const cutOffTree = function (forest) {
  if (!forest[0][0]) return -1;
  const m = forest.length;
  const n = forest[0].length;
  const trees = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const height = forest[row][col];

      if (height <= 1) continue;
      trees.push({ row, col, height });
    }
  }

  trees.sort((a, b) => a.height - b.height);

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  let current = [0, 0];
  let result = 0;

  const getMoveStep = (start, destination) => {
    const visited = new Array(m)
      .fill('')
      .map(_ => new Array(n).fill(false));
    let queue = [start];
    let steps = 0;

    visited[start[0]][start[1]] = true;

    while (queue.length) {
      const size = queue.length;
      const nextQueue = [];

      for (let index = 0; index < size; index++) {
        const [row, col] = queue[index];

        if (row === destination.row && col === destination.col) return steps;

        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;

          if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
          if (!forest[nextRow][nextCol]) continue;
          if (visited[nextRow][nextCol]) continue;
          nextQueue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
      queue = nextQueue;
      steps += 1;
    }
    return -1;
  };

  for (const { row, col } of trees) {
    const steps = getMoveStep(current, { row, col });

    if (steps === -1) return -1;
    current = [row, col];
    result += steps;
  }

  return result;
};
```
