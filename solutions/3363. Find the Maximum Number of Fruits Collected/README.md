# [3363. Find the Maximum Number of Fruits Collected](https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a game dungeon comprised of&nbsp;<code>n x n</code> rooms arranged in a grid.</p>

<p>You are given a 2D array <code>fruits</code> of size <code>n x n</code>, where <code>fruits[i][j]</code> represents the number of fruits in the room <code>(i, j)</code>. Three children will play in the game dungeon, with <strong>initial</strong> positions at the corner rooms <code>(0, 0)</code>, <code>(0, n - 1)</code>, and <code>(n - 1, 0)</code>.</p>

<p>The children will make <strong>exactly</strong> <code>n - 1</code> moves according to the following rules to reach the room <code>(n - 1, n - 1)</code>:</p>

<ul>
	<li>The child starting from <code>(0, 0)</code> must move from their current room <code>(i, j)</code> to one of the rooms <code>(i + 1, j + 1)</code>, <code>(i + 1, j)</code>, and <code>(i, j + 1)</code> if the target room exists.</li>
	<li>The child starting from <code>(0, n - 1)</code> must move from their current room <code>(i, j)</code> to one of the rooms <code>(i + 1, j - 1)</code>, <code>(i + 1, j)</code>, and <code>(i + 1, j + 1)</code> if the target room exists.</li>
	<li>The child starting from <code>(n - 1, 0)</code> must move from their current room <code>(i, j)</code> to one of the rooms <code>(i - 1, j + 1)</code>, <code>(i, j + 1)</code>, and <code>(i + 1, j + 1)</code> if the target room exists.</li>
</ul>

<p>When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.</p>

<p>Return the <strong>maximum</strong> number of fruits the children can collect from the dungeon.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]</span></p>

<p><strong>Output:</strong> <span class="example-io">100</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/10/15/example_1.gif" style="width: 250px; height: 214px;"></p>

<p>In this example:</p>

<ul>
	<li>The 1<sup>st</sup> child (green) moves on the path <code>(0,0) -&gt; (1,1) -&gt; (2,2) -&gt; (3, 3)</code>.</li>
	<li>The 2<sup>nd</sup> child (red) moves on the path <code>(0,3) -&gt; (1,2) -&gt; (2,3) -&gt; (3, 3)</code>.</li>
	<li>The 3<sup>rd</sup> child (blue) moves on the path <code>(3,0) -&gt; (3,1) -&gt; (3,2) -&gt; (3, 3)</code>.</li>
</ul>

<p>In total they collect <code>1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100</code> fruits.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">fruits = [[1,1],[1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>In this example:</p>

<ul>
	<li>The 1<sup>st</sup> child moves on the path <code>(0,0) -&gt; (1,1)</code>.</li>
	<li>The 2<sup>nd</sup> child moves on the path <code>(0,1) -&gt; (1,1)</code>.</li>
	<li>The 3<sup>rd</sup> child moves on the path <code>(1,0) -&gt; (1,1)</code>.</li>
</ul>

<p>In total they collect <code>1 + 1 + 1 + 1 = 4</code> fruits.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == fruits.length == fruits[i].length &lt;= 1000</code></li>
	<li><code>0 &lt;= fruits[i][j] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} fruits
 * @return {number}
 */
const maxCollectedFruits = function (fruits) {
  const n = fruits.length;

  const getTopLeft = () => {
    let result = 0;

    for (let i = 0; i < n; ++i) {
      result += fruits[i][i];
    }
    return result;
  };

  const getTopRight = () => {
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    dp[0][n - 1] = fruits[0][n - 1];

    for (let x = 0; x < n; ++x) {
      for (let y = 0; y < n; ++y) {
        if (x >= y && (x !== n - 1 || y !== n - 1)) continue;

        for (const [dx, dy] of [
          [1, -1],
          [1, 0],
          [1, 1],
        ]) {
          const i = x - dx;
          const j = y - dy;

          if (i < 0 || i >= n || j < 0 || j >= n) continue;
          if (i < j && j < n - 1 - i) continue;

          dp[x][y] = Math.max(dp[x][y], dp[i][j] + fruits[x][y]);
        }
      }
    }

    return dp[n - 1][n - 1];
  };

  const getBottomLeft = () => {
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    dp[n - 1][0] = fruits[n - 1][0];

    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (x <= y && (x !== n - 1 || y !== n - 1)) continue;

        for (const [dx, dy] of [
          [-1, 1],
          [0, 1],
          [1, 1],
        ]) {
          const i = x - dx;
          const j = y - dy;

          if (i < 0 || i >= n || j < 0 || j >= n) continue;
          if (j < i && i < n - 1 - j) continue;

          dp[x][y] = Math.max(dp[x][y], dp[i][j] + fruits[x][y]);
        }
      }
    }

    return dp[n - 1][n - 1];
  };

  return getTopLeft() + getTopRight() + getBottomLeft() - 2 * fruits[n - 1][n - 1];
};
```
