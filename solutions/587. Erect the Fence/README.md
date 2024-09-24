# [587. Erect the Fence](https://leetcode.com/problems/erect-the-fence)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>trees</code> where <code>trees[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents the location of a tree in the garden.</p>

<p>Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if <strong>all the trees are enclosed</strong>.</p>

<p>Return <em>the coordinates of trees that are exactly located on the fence perimeter</em>. You may return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/erect2-plane.jpg" style="width: 400px; height: 393px;">
<pre><strong>Input:</strong> trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
<strong>Output:</strong> [[1,1],[2,0],[4,2],[3,3],[2,4]]
<strong>Explanation:</strong> All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/erect1-plane.jpg" style="width: 400px; height: 393px;">
<pre><strong>Input:</strong> trees = [[1,2],[2,2],[4,2]]
<strong>Output:</strong> [[4,2],[2,2],[1,2]]
<strong>Explanation:</strong> The fence forms a line that passes through all the trees.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= trees.length &lt;= 3000</code></li>
	<li><code>trees[i].length == 2</code></li>
	<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 100</code></li>
	<li>All the given positions are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Monotone Chain Algorithm`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} trees
 * @return {number[][]}
 */
const outerTrees = function (trees) {
  const n = trees.length;

  if (n <= 1) return trees;

  const crossProduct = (a, b, c) => {
    const BAx = a[0] - b[0];
    const BAy = a[1] - b[1];
    const BCx = c[0] - b[0];
    const BCy = c[1] - b[1];

    return BAx * BCy - BAy * BCx;
  };

  trees.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const lower = [];
  const upper = [];

  for (const point of trees) {
    while (lower.length >= 2 && crossProduct(lower.at(-2), lower.at(-1), point) < 0) {
      lower.pop();
    }
    lower.push(point);
  }

  for (let index = n - 1; index >= 0; index--) {
    const point = trees[index];

    while (upper.length >= 2 && crossProduct(upper.at(-2), upper.at(-1), point) < 0) {
      upper.pop();
    }
    upper.push(point);
  }

  return [...new Set([...lower, ...upper])];
};
```
