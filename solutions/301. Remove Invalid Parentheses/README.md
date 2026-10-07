# [301. Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code> that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.</p>

<p>Return <em>a list of <strong>unique strings</strong> that are valid with the minimum number of removals</em>. You may return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "()())()"
<strong>Output:</strong> ["(())()","()()()"]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "(a)())()"
<strong>Output:</strong> ["(a())()","(a)()()"]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = ")("
<strong>Output:</strong> [""]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 25</code></li>
	<li><code>s</code> consists of lowercase English letters and parentheses <code>'('</code> and <code>')'</code>.</li>
	<li>There will be at most <code>20</code> parentheses in <code>s</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(2<sup>n</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string[]}
 */
const removeInvalidParentheses = function (s) {
  const n = s.length;
  let invalidLeft = 0;
  let invalidRight = 0;

  for (const char of s) {
    if (char !== '(' && char !== ')') continue;

    if (char === '(') {
      invalidLeft += 1;

      continue;
    }

    if (invalidLeft === 0) {
      invalidRight += 1;
    } else {
      invalidLeft -= 1;
    }
  }

  const removeable = invalidLeft + invalidRight;

  if (removeable === n) return [''];

  if (removeable === 0) return [s];

  const result = new Set();

  const dfs = (index, current, left, right, diff) => {
    if (n - index < left + right) return;

    if (index === n) {
      if (diff === 0) {
        result.add(current);
      }

      return;
    }

    const char = s[index];
    const nextCurrent = `${current}${char}`;

    if (char !== '(' && char !== ')') {
      dfs(index + 1, nextCurrent, left, right, diff);

      return;
    }

    if (char !== ')' || diff) {
      const nextDiff = diff + (char === '(' ? 1 : -1);

      dfs(index + 1, nextCurrent, left, right, nextDiff);
    }

    if (char === '(' && left) {
      dfs(index + 1, current, left - 1, right, diff);
    }

    if (char === ')' && right) {
      dfs(index + 1, current, left, right - 1, diff);
    }
  };

  dfs(0, '', invalidLeft, invalidRight, 0);

  return [...result];
};
```
