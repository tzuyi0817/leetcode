# [1691. Maximum Height by Stacking Cuboids](https://leetcode.com/problems/maximum-height-by-stacking-cuboids)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given <code>n</code> <code>cuboids</code> where the dimensions of the <code>i<sup>th</sup></code> cuboid is <code>cuboids[i] = [width<sub>i</sub>, length<sub>i</sub>, height<sub>i</sub>]</code> (<strong>0-indexed</strong>). Choose a <strong>subset</strong> of <code>cuboids</code> and place them on each other.</p>

<p>You can place cuboid <code>i</code> on cuboid <code>j</code> if <code>width<sub>i</sub> &lt;= width<sub>j</sub></code> and <code>length<sub>i</sub> &lt;= length<sub>j</sub></code> and <code>height<sub>i</sub> &lt;= height<sub>j</sub></code>. You can rearrange any cuboid's dimensions by rotating it to put it on another cuboid.</p>

<p>Return <em>the <strong>maximum height</strong> of the stacked</em> <code>cuboids</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/10/21/image.jpg" style="width: 420px; height: 299px;"></strong></p>

<pre><strong>Input:</strong> cuboids = [[50,45,20],[95,37,53],[45,23,12]]
<strong>Output:</strong> 190
<strong>Explanation:</strong>
Cuboid 1 is placed on the bottom with the 53x37 side facing down with height 95.
Cuboid 0 is placed next with the 45x20 side facing down with height 50.
Cuboid 2 is placed next with the 23x12 side facing down with height 45.
The total height is 95 + 50 + 45 = 190.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> cuboids = [[38,25,45],[76,35,3]]
<strong>Output:</strong> 76
<strong>Explanation:</strong>
You can't place any of the cuboids on the other.
We choose cuboid 1 and rotate it so that the 35x3 side is facing down and its height is 76.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
<strong>Output:</strong> 102
<strong>Explanation:</strong>
After rearranging the cuboids, you can see that all cuboids have the same dimension.
You can place the 11x7 side down on all cuboids so their heights are 17.
The maximum height of stacked cuboids is 6 * 17 = 102.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == cuboids.length</code></li>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= width<sub>i</sub>, length<sub>i</sub>, height<sub>i</sub> &lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nlogn+n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} cuboids
 * @return {number}
 */
const maxHeight = function (cuboids) {
  const n = cuboids.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  for (const cuboid of cuboids) {
    cuboid.sort((a, b) => a - b);
  }

  cuboids.sort((a, b) => {
    const [widthA, lengthA, heightA] = a;
    const [widthB, lengthB, heightB] = b;

    return widthB - widthA || lengthB - lengthA || heightB - heightA;
  });

  const stackCuboid = (index, prev) => {
    if (index >= n) return 0;
    if (dp[index][prev + 1] !== -1) return dp[index][prev + 1];
    const [width, length, height] = cuboids[index];
    const prevCuboid = cuboids[prev];
    let result = stackCuboid(index + 1, prev);

    if (prevCuboid) {
      const [prevWidth, prevLength, prevHeight] = prevCuboid;

      if (width <= prevWidth && length <= prevLength && height <= prevHeight) {
        const stackHeight = stackCuboid(index + 1, index);

        result = Math.max(height + stackHeight, result);
      }
    } else {
      const stackHeight = stackCuboid(index + 1, index);

      result = Math.max(height + stackHeight, result);
    }

    dp[index][prev + 1] = result;

    return result;
  };

  return stackCuboid(0, -1);
};
```
