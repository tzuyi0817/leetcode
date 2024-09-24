# [488. Zuma Game](https://leetcode.com/problems/zuma-game)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are playing a variation of the game Zuma.</p>

<p>In this variation of Zuma, there is a <strong>single row</strong> of colored balls on a board, where each ball can be colored red <code>'R'</code>, yellow <code>'Y'</code>, blue <code>'B'</code>, green <code>'G'</code>, or white <code>'W'</code>. You also have several colored balls in your hand.</p>

<p>Your goal is to <strong>clear all</strong> of the balls from the board. On each turn:</p>

<ul>
	<li>Pick <strong>any</strong> ball from your hand and insert it in between two balls in the row or on either end of the row.</li>
	<li>If there is a group of <strong>three or more consecutive balls</strong> of the <strong>same color</strong>, remove the group of balls from the board.
	<ul>
		<li>If this removal causes more groups of three or more of the same color to form, then continue removing each group until there are none left.</li>
	</ul>
	</li>
	<li>If there are no more balls on the board, then you win the game.</li>
	<li>Repeat this process until you either win or do not have any more balls in your hand.</li>
</ul>

<p>Given a string <code>board</code>, representing the row of balls on the board, and a string <code>hand</code>, representing the balls in your hand, return <em>the <strong>minimum</strong> number of balls you have to insert to clear all the balls from the board. If you cannot clear all the balls from the board using the balls in your hand, return </em><code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> board = "WRRBBW", hand = "RB"
<strong>Output:</strong> -1
<strong>Explanation:</strong> It is impossible to clear all the balls. The best you can do is:
- Insert 'R' so the board becomes WRR<u>R</u>BBW. W<u>RRR</u>BBW -&gt; WBBW.
- Insert 'B' so the board becomes WBB<u>B</u>W. W<u>BBB</u>W -&gt; WW.
There are still balls remaining on the board, and you are out of balls to insert.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> board = "WWRRBBWW", hand = "WRBRW"
<strong>Output:</strong> 2
<strong>Explanation:</strong> To make the board empty:
- Insert 'R' so the board becomes WWRR<u>R</u>BBWW. WW<u>RRR</u>BBWW -&gt; WWBBWW.
- Insert 'B' so the board becomes WWBB<u>B</u>WW. WW<u>BBB</u>WW -&gt; <u>WWWW</u> -&gt; empty.
2 balls from your hand were needed to clear the board.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> board = "G", hand = "GGGGG"
<strong>Output:</strong> 2
<strong>Explanation:</strong> To make the board empty:
- Insert 'G' so the board becomes G<u>G</u>.
- Insert 'G' so the board becomes GG<u>G</u>. <u>GGG</u> -&gt; empty.
2 balls from your hand were needed to clear the board.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= board.length &lt;= 16</code></li>
	<li><code>1 &lt;= hand.length &lt;= 5</code></li>
	<li><code>board</code> and <code>hand</code> consist of the characters <code>'R'</code>, <code>'Y'</code>, <code>'B'</code>, <code>'G'</code>, and <code>'W'</code>.</li>
	<li>The initial row of balls on the board will <strong>not</strong> have any groups of three or more consecutive balls of the same color.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(m<sup>2</sup>n<sup>2</sup>)</em>
- Space complexity: <em>O(m<sup>2</sup>n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const handMap = new Map();

  for (const ball of hand) {
    const count = handMap.get(ball) ?? 0;

    handMap.set(ball, count + 1);
  }

  const removeGroupBall = board => {
    let left = 0;

    for (let right = 1; right <= board.length; right++) {
      if (board[right] && board[left] === board[right]) continue;
      if (right - left < 3) left = right;
      else return removeGroupBall(`${board.slice(0, left)}${board.slice(right)}`);
    }
    return board;
  };
  const findGroupBall = board => {
    board = removeGroupBall(board);
    if (!board) return 0;
    let left = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let right = 1; right <= board.length; right++) {
      if (board[right] && board[left] === board[right]) continue;
      const ball = board[left];
      const needCount = 3 - (right - left);
      const count = handMap.get(ball) ?? 0;

      if (count >= needCount) {
        handMap.set(ball, count - needCount);
        const nextBoard = `${board.slice(0, left)}${board.slice(right)}`;
        const insertCount = findGroupBall(nextBoard);

        if (insertCount !== Number.MAX_SAFE_INTEGER) {
          result = Math.min(insertCount + needCount, result);
        }
        handMap.set(ball, count);
      }
      left = right;
    }
    return result;
  };
  const result = findGroupBall(board);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
```
