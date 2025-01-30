# [1406. Stone Game III](https://leetcode.com/problems/stone-game-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Alice and Bob continue their games with piles of stones. There are several stones <strong>arranged in a row</strong>, and each stone has an associated value which is an integer given in the array <code>stoneValue</code>.</p>

<p>Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take <code>1</code>, <code>2</code>, or <code>3</code> stones from the <strong>first</strong> remaining stones in the row.</p>

<p>The score of each player is the sum of the values of the stones taken. The score of each player is <code>0</code> initially.</p>

<p>The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.</p>

<p>Assume Alice and Bob <strong>play optimally</strong>.</p>

<p>Return <code>"Alice"</code><em> if Alice will win, </em><code>"Bob"</code><em> if Bob will win, or </em><code>"Tie"</code><em> if they will end the game with the same score</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> stoneValue = [1,2,3,7]
<strong>Output:</strong> "Bob"
<strong>Explanation:</strong> Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> stoneValue = [1,2,3,-9]
<strong>Output:</strong> "Alice"
<strong>Explanation:</strong> Alice must choose all the three piles at the first move to win and leave Bob with negative score.
If Alice chooses one pile her score will be 1 and the next move Bob's score becomes 5. In the next move, Alice will take the pile with value = -9 and lose.
If Alice chooses two piles her score will be 3 and the next move Bob's score becomes 3. In the next move, Alice will take the pile with value = -9 and also lose.
Remember that both play optimally so here Alice will choose the scenario that makes her win.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> stoneValue = [1,2,3,6]
<strong>Output:</strong> "Tie"
<strong>Explanation:</strong> Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= stoneValue.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-1000 &lt;= stoneValue[i] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} stoneValue
 * @return {string}
 */
const stoneGameIII = function (stoneValue) {
  const n = stoneValue.length;
  const dp = Array.from({ length: n }, () => null);

  const choosePiles = start => {
    if (start >= n) return 0;
    if (dp[start] !== null) return dp[start];

    let score = 0;
    let result = Number.MIN_SAFE_INTEGER;

    for (let index = start; index < Math.min(start + 3, n); index++) {
      score += stoneValue[index];

      result = Math.max(score - choosePiles(index + 1), result);
    }
    dp[start] = result;

    return result;
  };

  const aliceAdvantage = choosePiles(0);

  if (aliceAdvantage > 0) return 'Alice';
  if (aliceAdvantage < 0) return 'Bob';

  return 'Tie';
};
```
