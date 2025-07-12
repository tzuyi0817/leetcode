# [1900. The Earliest and Latest Rounds Where Players Compete](https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a tournament where <code>n</code> players are participating. The players are standing in a single row and are numbered from <code>1</code> to <code>n</code> based on their <strong>initial</strong> standing position (player <code>1</code> is the first player in the row, player <code>2</code> is the second player in the row, etc.).</p>

<p>The tournament consists of multiple rounds (starting from round number <code>1</code>). In each round, the <code>i<sup>th</sup></code> player from the front of the row competes against the <code>i<sup>th</sup></code> player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.</p>

<ul>
	<li>For example, if the row consists of players <code>1, 2, 4, 6, 7</code>
    <ul>
    	<li>Player <code>1</code> competes against player <code>7</code>.</li>
    	<li>Player <code>2</code> competes against player <code>6</code>.</li>
    	<li>Player <code>4</code> automatically advances to the next round.</li>
    </ul>
    </li>
</ul>

<p>After each round is over, the winners are lined back up in the row based on the <strong>original ordering</strong> assigned to them initially (ascending order).</p>

<p>The players numbered <code>firstPlayer</code> and <code>secondPlayer</code> are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may <strong>choose</strong> the outcome of this round.</p>

<p>Given the integers <code>n</code>, <code>firstPlayer</code>, and <code>secondPlayer</code>, return <em>an integer array containing two values, the <strong>earliest</strong> possible round number and the&nbsp;<strong>latest</strong> possible round number in which these two players will compete against each other, respectively</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 11, firstPlayer = 2, secondPlayer = 4
<strong>Output:</strong> [3,4]
<strong>Explanation:</strong>
One possible scenario which leads to the earliest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 2, 3, 4, 5, 6, 11
Third round: 2, 3, 4
One possible scenario which leads to the latest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 1, 2, 3, 4, 5, 6
Third round: 1, 2, 4
Fourth round: 2, 4
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 5, firstPlayer = 1, secondPlayer = 5
<strong>Output:</strong> [1,1]
<strong>Explanation:</strong> The players numbered 1 and 5 compete in the first round.
There is no way to make them compete in any other round.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 28</code></li>
	<li><code>1 &lt;= firstPlayer &lt; secondPlayer &lt;= n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>4</sup>)</em>
- Space complexity: <em>O(n<sup>3</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
const earliestAndLatest = function (n, firstPlayer, secondPlayer) {
  const dp = Array.from({ length: n + 1 }, () => {
    return new Array(n + 1)
      .fill('')
      .map(_ => new Array(n + 1).fill(null));
  });

  const getRounds = (left, right, players) => {
    if (left === right) return [1, 1];
    if (left > right) return getRounds(right, left, players);
    if (dp[left][right][players]) return dp[left][right][players];
    const nextRoundPlayers = Math.ceil(players / 2);
    const loserPlayers = players - nextRoundPlayers;
    const minRequiredWinners = left + right - loserPlayers;
    let minRound = Number.MAX_SAFE_INTEGER;
    let maxRound = Number.MIN_SAFE_INTEGER;

    for (let leftWin = 1; leftWin <= left; leftWin++) {
      for (let rightWin = left - leftWin + 1; rightWin <= right - leftWin; rightWin++) {
        const totalWinners = leftWin + rightWin;

        if (totalWinners > nextRoundPlayers || totalWinners < minRequiredWinners) continue;
        const [earliest, latest] = getRounds(leftWin, rightWin, nextRoundPlayers);

        minRound = Math.min(minRound, earliest + 1);
        maxRound = Math.max(maxRound, latest + 1);
      }
    }

    const result = [minRound, maxRound];

    dp[left][right][players] = result;

    return result;
  };

  return getRounds(firstPlayer, n - secondPlayer + 1, n);
};
```
