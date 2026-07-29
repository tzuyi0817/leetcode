# [3102. Minimize Manhattan Distances](https://leetcode.com/problems/minimize-manhattan-distances)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an array <code>points</code> representing integer coordinates of some points on a 2D plane, where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>.</p>

<p>The distance between two points is defined as their <span data-keyword="manhattan-distance" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1l_" data-state="closed" class="">Manhattan distance</button></span>.</p>

<p>Return <em>the <strong>minimum</strong> possible value for <strong>maximum</strong> distance between any two points by removing exactly one point</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[3,10],[5,15],[10,2],[4,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">12</span></p>

<p><strong>Explanation:</strong></p>

<p>The maximum distance after removing each point is the following:</p>

<ul>
	<li>After removing the 0<sup>th</sup> point the maximum distance is between points (5, 15) and (10, 2), which is <code>|5 - 10| + |15 - 2| = 18</code>.</li>
	<li>After removing the 1<sup>st</sup> point the maximum distance is between points (3, 10) and (10, 2), which is <code>|3 - 10| + |10 - 2| = 15</code>.</li>
	<li>After removing the 2<sup>nd</sup> point the maximum distance is between points (5, 15) and (4, 4), which is <code>|5 - 4| + |15 - 4| = 12</code>.</li>
	<li>After removing the 3<sup>rd</sup> point the maximum distance is between points (5, 15) and (10, 2), which is <code>|5 - 10| + |15 - 2| = 18</code>.</li>
</ul>

<p>12 is the minimum possible maximum distance between any two points after removing exactly one point.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[1,1],[1,1],[1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>Removing any of the points results in the maximum distance between any two points of 0.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= points.length &lt;= 10<sup>5</sup></code></li>
	<li><code>points[i].length == 2</code></li>
	<li><code>1 &lt;= points[i][0], points[i][1] &lt;= 10<sup>8</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
const minimumDistance = function (points) {
  const n = points.length;

  const getMaxManhattanDistance = (excludedIndex = -1) => {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let minSum = Number.MAX_SAFE_INTEGER;
    let maxDiff = Number.MIN_SAFE_INTEGER;
    let minDiff = Number.MAX_SAFE_INTEGER;
    let maxSumIndex = -1;
    let minSumIndex = -1;
    let maxDiffIndex = -1;
    let minDiffIndex = -1;

    for (let index = 0; index < n; index++) {
      if (index === excludedIndex) continue;

      const [x, y] = points[index];
      const sum = x + y;
      const diff = x - y;

      if (sum > maxSum) {
        maxSum = sum;
        maxSumIndex = index;
      }

      if (sum < minSum) {
        minSum = sum;
        minSumIndex = index;
      }

      if (diff > maxDiff) {
        maxDiff = diff;
        maxDiffIndex = index;
      }

      if (diff < minDiff) {
        minDiff = diff;
        minDiffIndex = index;
      }
    }

    if (maxSum - minSum > maxDiff - minDiff) {
      return [minSumIndex, maxSumIndex];
    }

    return [minDiffIndex, maxDiffIndex];
  };

  const manhattan = (a, b) => {
    const [x1, y1] = points[a];
    const [x2, y2] = points[b];

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const [excludedA, excludedB] = getMaxManhattanDistance();
  const [a, b] = getMaxManhattanDistance(excludedA);
  const [c, d] = getMaxManhattanDistance(excludedB);

  return Math.min(manhattan(a, b), manhattan(c, d));
};
```
