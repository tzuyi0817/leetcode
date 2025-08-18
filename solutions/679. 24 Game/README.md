# [679. 24 Game](https://leetcode.com/problems/24-game)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>cards</code> of length <code>4</code>. You have four cards, each containing a number in the range <code>[1, 9]</code>. You should arrange the numbers on these cards in a mathematical expression using the operators <code>['+', '-', '*', '/']</code> and the parentheses <code>'('</code> and <code>')'</code> to get the value 24.</p>

<p>You are restricted with the following rules:</p>

<ul>
	<li>The division operator <code>'/'</code> represents real division, not integer division.
	<ul>
		<li>For example, <code>4 / (1 - 2 / 3) = 4 / (1 / 3) = 12</code>.</li>
	</ul>
	</li>
	<li>Every operation done is between two numbers. In particular, we cannot use <code>'-'</code> as a unary operator.
	<ul>
		<li>For example, if <code>cards = [1, 1, 1, 1]</code>, the expression <code>"-1 - 1 - 1 - 1"</code> is <strong>not allowed</strong>.</li>
	</ul>
	</li>
	<li>You cannot concatenate numbers together
	<ul>
		<li>For example, if <code>cards = [1, 2, 1, 2]</code>, the expression <code>"12 + 12"</code> is not valid.</li>
	</ul>
	</li>
</ul>

<p>Return <code>true</code> if you can get such expression that evaluates to <code>24</code>, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> cards = [4,1,8,7]
<strong>Output:</strong> true
<strong>Explanation:</strong> (8-4) * (7-1) = 24
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> cards = [1,2,1,2]
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>cards.length == 4</code></li>
	<li><code>1 &lt;= cards[i] &lt;= 9</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(2<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} cards
 * @return {boolean}
 */
const judgePoint24 = function (cards) {
  const n = cards.length;

  if (n === 1) return Math.abs(cards[0] - 24) < 10e-9;

  const getValues = (a, b) => {
    const values = [a + b, a * b, a - b, b - a];

    if (a) values.push(b / a);
    if (b) values.push(a / b);

    return values;
  };

  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b < n; b++) {
      const values = getValues(cards[a], cards[b]);
      const nextCards = cards.filter((_, index) => index !== a && index !== b);

      for (const value of values) {
        nextCards.push(value);

        if (judgePoint24(nextCards)) return true;

        nextCards.pop();
      }
    }
  }

  return false;
};
```
