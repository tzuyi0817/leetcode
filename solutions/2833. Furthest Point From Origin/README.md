# [2833. Furthest Point From Origin](https://leetcode.com/problems/furthest-point-from-origin)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a string <code>moves</code> of length <code>n</code> consisting only of characters <code>'L'</code>, <code>'R'</code>, and <code>'_'</code>. The string represents your movement on a number line starting from the origin <code>0</code>.</p>

<p>In the <code>i<sup>th</sup></code> move, you can choose one of the following directions:</p>

<ul>
	<li>move to the left if <code>moves[i] = 'L'</code> or <code>moves[i] = '_'</code></li>
	<li>move to the right if <code>moves[i] = 'R'</code> or <code>moves[i] = '_'</code></li>
</ul>

<p>Return <em>the <strong>distance from the origin</strong> of the <strong>furthest</strong> point you can get to after </em><code>n</code><em> moves</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> moves = "L_RL__R"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The furthest point we can reach from the origin 0 is point -3 through the following sequence of moves "LLRLLLR".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> moves = "_R__LL_"
<strong>Output:</strong> 5
<strong>Explanation:</strong> The furthest point we can reach from the origin 0 is point -5 through the following sequence of moves "LRLLLLL".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> moves = "_______"
<strong>Output:</strong> 7
<strong>Explanation:</strong> The furthest point we can reach from the origin 0 is point 7 through the following sequence of moves "RRRRRRR".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= moves.length == n &lt;= 50</code></li>
	<li><code>moves</code> consists only of characters <code>'L'</code>, <code>'R'</code> and <code>'_'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Counting`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} moves
 * @return {number}
 */
const furthestDistanceFromOrigin = function (moves) {
  let left = 0;
  let right = 0;
  let custom = 0;

  for (const move of moves) {
    if (move === 'L') {
      left += 1;
    } else if (move === 'R') {
      right += 1;
    } else {
      custom += 1;
    }
  }

  return Math.abs(left - right) + custom;
};
```
