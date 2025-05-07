# [282. Expression Add Operators](https://leetcode.com/problems/expression-add-operators)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>num</code> that contains only digits and an integer <code>target</code>, return <em><strong>all possibilities</strong> to insert the binary operators </em><code>'+'</code><em>, </em><code>'-'</code><em>, and/or </em><code>'*'</code><em> between the digits of </em><code>num</code><em> so that the resultant expression evaluates to the </em><code>target</code><em> value</em>.</p>

<p>Note that operands in the returned expressions <strong>should not</strong> contain leading zeros.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> num = "123", target = 6
<strong>Output:</strong> ["1*2*3","1+2+3"]
<strong>Explanation:</strong> Both "1*2*3" and "1+2+3" evaluate to 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num = "232", target = 8
<strong>Output:</strong> ["2*3+2","2+3*2"]
<strong>Explanation:</strong> Both "2*3+2" and "2+3*2" evaluate to 8.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> num = "3456237490", target = 9191
<strong>Output:</strong> []
<strong>Explanation:</strong> There are no expressions that can be created from "3456237490" to evaluate to 9191.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num.length &lt;= 10</code></li>
	<li><code>num</code> consists of only digits.</li>
	<li><code>-2<sup>31</sup> &lt;= target &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(4<sup>n</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
const addOperators = function (num, target) {
  const n = num.length;
  const result = [];
  const backtrackingExpression = (start, expression, total, last) => {
    if (start === n) {
      total === target && result.push(expression);
      return;
    }
    let current = '';

    for (let index = start; index < n; index++) {
      current += num[index];

      if (current.length > 1 && current[0] === '0') return;
      const next = +current;
      const product = last * next;

      backtrackingExpression(index + 1, `${expression}+${current}`, total + next, next);
      backtrackingExpression(index + 1, `${expression}-${current}`, total - next, -next);
      backtrackingExpression(index + 1, `${expression}*${current}`, total - last + product, product);
    }
  };
  let current = '';

  for (let index = 0; index < n; index++) {
    current += num[index];

    if (current.length > 1 && current[0] === '0') break;

    backtrackingExpression(index + 1, current, +current, +current);
  }

  return result;
};
```
