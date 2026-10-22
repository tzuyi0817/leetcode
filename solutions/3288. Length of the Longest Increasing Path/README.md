# [3288. Length of the Longest Increasing Path](https://leetcode.com/problems/length-of-the-longest-increasing-path)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a 2D array of integers <code>coordinates</code> of length <code>n</code> and an integer <code>k</code>, where <code>0 &lt;= k &lt; n</code>.</p>

<p><code>coordinates[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> indicates the point <code>(x<sub>i</sub>, y<sub>i</sub>)</code> in a 2D plane.</p>

<p>An <strong>increasing path</strong> of length <code>m</code> is defined as a list of points <code>(x<sub>1</sub>, y<sub>1</sub>)</code>, <code>(x<sub>2</sub>, y<sub>2</sub>)</code>, <code>(x<sub>3</sub>, y<sub>3</sub>)</code>, ..., <code>(x<sub>m</sub>, y<sub>m</sub>)</code> such that:</p>

<ul>
	<li><code>x<sub>i</sub> &lt; x<sub>i + 1</sub></code> and <code>y<sub>i</sub> &lt; y<sub>i + 1</sub></code> for all <code>i</code> where <code>1 &lt;= i &lt; m</code>.</li>
	<li><code>(x<sub>i</sub>, y<sub>i</sub>)</code> is in the given coordinates for all <code>i</code> where <code>1 &lt;= i &lt;= m</code>.</li>
</ul>

<p>Return the <strong>maximum</strong> length of an <strong>increasing path</strong> that contains <code>coordinates[k]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">coordinates = [[3,1],[2,2],[4,1],[0,0],[5,3]], k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p><code>(0, 0)</code>, <code>(2, 2)</code>, <code>(5, 3)</code> is the longest increasing path that contains <code>(2, 2)</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">coordinates = [[2,1],[7,0],[5,6]], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p><code>(2, 1)</code>, <code>(5, 6)</code> is the longest increasing path that contains <code>(5, 6)</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == coordinates.length &lt;= 10<sup>5</sup></code></li>
	<li><code>coordinates[i].length == 2</code></li>
	<li><code>0 &lt;= coordinates[i][0], coordinates[i][1] &lt;= 10<sup>9</sup></code></li>
	<li>All elements in <code>coordinates</code> are <strong>distinct</strong>.</li>
	<li><code>0 &lt;= k &lt;= n - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} coordinates
 * @param {number} k
 * @return {number}
 */
const maxPathLength = function (coordinates, k) {
  const [xk, yk] = coordinates[k];
  const leftCoordinates = [];
  const rightCoordinates = [];

  for (const [x, y] of coordinates) {
    if (x < xk && y < yk) {
      leftCoordinates.push({ x, y });
    } else if (x > xk && y > yk) {
      rightCoordinates.push({ x, y });
    }
  }

  return 1 + getLISLength(leftCoordinates) + getLISLength(rightCoordinates);
};

function getLISLength(coordinates) {
  const tails = [];

  coordinates.sort((a, b) => a.x - b.x || b.y - a.y);

  for (const { y } of coordinates) {
    if (!tails.length || tails.at(-1) < y) {
      tails.push(y);
    } else {
      const pos = findFirstGreaterEqual(tails, y);

      tails[pos] = y;
    }
  }

  return tails.length;
}

function findFirstGreaterEqual(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    nums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
}
```
