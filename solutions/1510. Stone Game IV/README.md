# [1510. Stone Game IV](https://leetcode.com/problems/stone-game-iv)

## Description

<div class="elfjS" data-track-load="description_content"><p>Alice and Bob take turns playing a game, with Alice starting first.</p>

<p>Initially, there are <code>n</code> stones in a pile. On each player's turn, that player makes a <em>move</em> consisting of removing <strong>any</strong> non-zero <strong>square number</strong> of stones in the pile.</p>

<p>Also, if a player cannot make a move, he/she loses the game.</p>

<p>Given a positive integer <code>n</code>, return <code>true</code> if and only if Alice wins the game otherwise return <code>false</code>, assuming both players play optimally.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> true
<strong>Explanation: </strong>Alice can remove 1 stone winning the game because Bob doesn't have any moves.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> false
<strong>Explanation: </strong>Alice can only remove 1 stone, after that Bob removes the last one winning the game (2 -&gt; 1 -&gt; 0).
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 4
<strong>Output:</strong> true
<strong>Explanation:</strong> n is already a perfect square, Alice can win with one move, removing 4 stones (4 -&gt; 0).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>1.5</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {boolean}
 */
const winnerSquareGame = function (n) {
  const dp = Array.from({ length: n + 1 }, () => null);

  const removeStones = stones => {
    if (!stones) return false;
    if (dp[stones] !== null) return dp[stones];

    const maxValue = Math.floor(Math.sqrt(stones));

    for (let value = maxValue; value >= 1; value--) {
      if (removeStones(stones - value ** 2)) continue;

      dp[stones] = true;

      return true;
    }

    dp[stones] = false;

    return false;
  };

  return removeStones(n);
};
```
