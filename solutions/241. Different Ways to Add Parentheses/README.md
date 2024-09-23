# [241. Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>expression</code> of numbers and operators, return <em>all possible results from computing all the different possible ways to group numbers and operators</em>. You may return the answer in <strong>any order</strong>.</p>

<p>The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed <code>10<sup>4</sup></code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> expression = "2-1-1"
<strong>Output:</strong> [0,2]
<strong>Explanation:</strong>
((2-1)-1) = 0 
(2-(1-1)) = 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> expression = "2*3-4*5"
<strong>Output:</strong> [-34,-14,-10,-10,10]
<strong>Explanation:</strong>
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= expression.length &lt;= 20</code></li>
	<li><code>expression</code> consists of digits and the operator <code>'+'</code>, <code>'-'</code>, and <code>'*'</code>.</li>
	<li>All the integer values in the input expression are in the range <code>[0, 99]</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Recursion + Memoization`**
- Time complexity: <em>O(2<sup>n</sup>)</em>
- Space complexity: <em>O(n*2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    const memo = new Map();

    const calculate = (a, b, mathSymbol) => {
        if (mathSymbol === '*') return a * b;
        if (mathSymbol === '-') return a - b;
        return a + b;
    };

    const computeExpression = (current) => {
        if (memo.has(current)) return memo.get(current);
        const n = current.length;
        const values = [];

        for (let index = 0; index < n; index++) {
            const str = current[index];

            if (/[0-9]/.test(str)) continue;
            const leftHalf = current.slice(0, index);
            const rightHalf = current.slice(index + 1);
            const values1 = computeExpression(leftHalf);
            const values2 = computeExpression(rightHalf);

            for (const value1 of values1) {
                for (const value2 of values2) {
                    const value = calculate(value1, value2, str);

                    values.push(value);
                }
            }
        }
        const result = values.length ? values : [+current];

        memo.set(current, result);
        return result;
    };

    return computeExpression(expression);
};
```
