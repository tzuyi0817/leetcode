# [224. Basic Calculator](https://leetcode.com/problems/basic-calculator)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it, and return <em>the result of the evaluation</em>.</p>

<p><strong>Note:</strong> You are <strong>not</strong> allowed to use any built-in function which evaluates strings as mathematical expressions, such as <code>eval()</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "1 + 1"
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = " 2-1 + 2 "
<strong>Output:</strong> 3
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "(1+(4+5+2)-3)+(6+8)"
<strong>Output:</strong> 23
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
	<li><code>s</code> consists of digits, <code>'+'</code>, <code>'-'</code>, <code>'('</code>, <code>')'</code>, and <code>' '</code>.</li>
	<li><code>s</code> represents a valid expression.</li>
	<li><code>'+'</code> is <strong>not</strong> used as a unary operation (i.e., <code>"+1"</code> and <code>"+(2 + 3)"</code> is invalid).</li>
	<li><code>'-'</code> could be used as a unary operation (i.e., <code>"-1"</code> and <code>"-(2 + 3)"</code> is valid).</li>
	<li>There will be no two consecutive operators in the input.</li>
	<li>Every number and running calculation will fit in a signed 32-bit integer.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  const signStack = [1];
  let sign = 1;
  let index = 0;
  let result = 0;

  while (index < s.length) {
    let current = s[index];

    if (current === '(') {
      signStack.push(signStack.at(-1) * sign);
      sign = 1;
    } else if (current === ')') signStack.pop();
    else if (current === '+') sign = 1;
    else if (current === '-') sign = -1;
    else if (current !== ' ') {
      while (/\d/.test(s[index + 1])) {
        index += 1;
        current += s[index];
      }
      result += sign * current * signStack.at(-1);
    }

    index += 1;
  }
  return result;
};
```
