# [1896. Minimum Cost to Change the Final Value of Expression](https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>valid</strong> boolean expression as a string <code>expression</code> consisting of the characters <code>'1'</code>,<code>'0'</code>,<code>'&amp;'</code> (bitwise <strong>AND</strong> operator),<code>'|'</code> (bitwise <strong>OR</strong> operator),<code>'('</code>, and <code>')'</code>.</p>

<ul>
	<li>For example, <code>"()1|1"</code> and <code>"(1)&amp;()"</code> are <strong>not valid</strong> while <code>"1"</code>, <code>"(((1))|(0))"</code>, and <code>"1|(0&amp;(1))"</code> are <strong>valid</strong> expressions.</li>
</ul>

<p>Return<em> the <strong>minimum cost</strong> to change the final value of the expression</em>.</p>

<ul>
	<li>For example, if <code>expression = "1|1|(0&amp;0)&amp;1"</code>, its <strong>value</strong> is <code>1|1|(0&amp;0)&amp;1 = 1|1|0&amp;1 = 1|0&amp;1 = 1&amp;1 = 1</code>. We want to apply operations so that the<strong> new</strong> expression evaluates to <code>0</code>.</li>
</ul>

<p>The <strong>cost</strong> of changing the final value of an expression is the <strong>number of operations</strong> performed on the expression. The types of <strong>operations</strong> are described as follows:</p>

<ul>
	<li>Turn a <code>'1'</code> into a <code>'0'</code>.</li>
	<li>Turn a <code>'0'</code> into a <code>'1'</code>.</li>
	<li>Turn a <code>'&amp;'</code> into a <code>'|'</code>.</li>
	<li>Turn a <code>'|'</code> into a <code>'&amp;'</code>.</li>
</ul>

<p><strong>Note:</strong> <code>'&amp;'</code> does <strong>not</strong> take precedence over <code>'|'</code> in the <strong>order of calculation</strong>. Evaluate parentheses <strong>first</strong>, then in <strong>left-to-right</strong> order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> expression = "1&amp;(0|1)"
<strong>Output:</strong> 1
<strong>Explanation:</strong> We can turn "1&amp;(0<u><strong>|</strong></u>1)" into "1&amp;(0<u><strong>&amp;</strong></u>1)" by changing the '|' to a '&amp;' using 1 operation.
The new expression evaluates to 0. 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> expression = "(0&amp;0)&amp;(0&amp;0&amp;0)"
<strong>Output:</strong> 3
<strong>Explanation:</strong> We can turn "(0<u><strong>&amp;0</strong></u>)<strong><u>&amp;</u></strong>(0&amp;0&amp;0)" into "(0<u><strong>|1</strong></u>)<u><strong>|</strong></u>(0&amp;0&amp;0)" using 3 operations.
The new expression evaluates to 1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> expression = "(0|(1|0&amp;1))"
<strong>Output:</strong> 1
<strong>Explanation:</strong> We can turn "(0|(<u><strong>1</strong></u>|0&amp;1))" into "(0|(<u><strong>0</strong></u>|0&amp;1))" using 1 operation.
The new expression evaluates to 0.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= expression.length &lt;= 10<sup>5</sup></code></li>
	<li><code>expression</code>&nbsp;only contains&nbsp;<code>'1'</code>,<code>'0'</code>,<code>'&amp;'</code>,<code>'|'</code>,<code>'('</code>, and&nbsp;<code>')'</code></li>
	<li>All parentheses&nbsp;are properly matched.</li>
	<li>There will be no empty parentheses (i.e:&nbsp;<code>"()"</code>&nbsp;is not a substring of&nbsp;<code>expression</code>).</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} expression
 * @return {number}
 */
const minOperationsToFlip = function (expression) {
  const n = expression.length;
  const stack = [];
  const bracketMap = new Map();

  for (let index = 0; index < n; index++) {
    const char = expression[index];

    if (char === '(') {
      stack.push(index);
    } else if (char === ')') {
      bracketMap.set(index, stack.pop());
    }
  }

  const getMinFlipCost = (start, end) => {
    if (start === end) return [Number(expression[start]), 1];
    const startBracket = bracketMap.get(end) ?? end;

    if (start === startBracket) return getMinFlipCost(start + 1, end - 1);
    const [value1, cost1] = getMinFlipCost(start, startBracket - 2);
    const [value2, cost2] = getMinFlipCost(startBracket, end);
    const operator = expression[startBracket - 1];

    if (operator === '&') {
      if (value1 === 0 && value2 === 0) {
        return [0, Math.min(cost1 + 1, cost2 + 1, cost1 + cost2)];
      }

      if (value1 === 1 && value2 === 1) {
        return [1, Math.min(cost1, cost2)];
      }

      return [0, 1];
    } else {
      if (value1 === 0 && value2 === 0) {
        return [0, Math.min(cost1, cost2)];
      }

      if (value1 === 1 && value2 === 1) {
        return [1, Math.min(cost1 + 1, cost2 + 1, cost1 + cost2)];
      }

      return [1, 1];
    }
  };

  return getMinFlipCost(0, n - 1)[1];
};
```
