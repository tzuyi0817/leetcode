# [1563. Stone Game V](https://leetcode.com/problems/stone-game-v)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are several stones <strong>arranged in a row</strong>, and each stone has an associated value which is an integer given in the array <code>stoneValue</code>.</p>

<p>In each round of the game, Alice divides the row into <strong>two non-empty rows</strong> (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.</p>

<p>The game ends when there is only <strong>one stone remaining</strong>. Alice's is initially <strong>zero</strong>.</p>

<p>Return <i>the maximum score that Alice can obtain</i>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> stoneValue = [6,2,3,4,5,5]
<strong>Output:</strong> 18
<strong>Explanation:</strong> In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> stoneValue = [7,7,7,7,7,7,7]
<strong>Output:</strong> 28
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> stoneValue = [4]
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= stoneValue.length &lt;= 500</code></li>
	<li><code>1 &lt;= stoneValue[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} stoneValue
 * @return {number}
 */
const stoneGameV = function (stoneValue) {
  const n = stoneValue.length;
  const prefixScore = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

  for (let index = 1; index <= n; index++) {
    prefixScore[index] = prefixScore[index - 1] + stoneValue[index - 1];
  }

  const getMaxScore = (left, right) => {
    if (left >= right) return 0;
    if (dp[left][right] !== -1) return dp[left][right];
    let result = 0;

    for (let index = left; index < right; index++) {
      const heap1 = prefixScore[index + 1] - prefixScore[left];
      const heap2 = prefixScore[right + 1] - prefixScore[index + 1];

      if (heap1 > heap2) {
        const score = heap2 + getMaxScore(index + 1, right);

        result = Math.max(score, result);
      } else if (heap1 < heap2) {
        const score = heap1 + getMaxScore(left, index);

        result = Math.max(score, result);
      } else {
        const score1 = heap2 + getMaxScore(index + 1, right);
        const score2 = heap1 + getMaxScore(left, index);

        result = Math.max(result, score1, score2);
      }
    }

    dp[left][right] = result;

    return result;
  };

  return getMaxScore(0, n - 1);
};
```
