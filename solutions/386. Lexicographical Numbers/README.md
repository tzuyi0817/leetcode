# [386. Lexicographical Numbers](https://leetcode.com/problems/lexicographical-numbers)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer <code>n</code>, return all the numbers in the range <code>[1, n]</code> sorted in lexicographical order.</p>

<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and uses <code>O(1)</code> extra space.&nbsp;</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> n = 13
<strong>Output:</strong> [1,10,11,12,13,2,3,4,5,6,7,8,9]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> [1,2]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
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
 * @param {number} n
 * @return {number[]}
 */
const lexicalOrder = function (n) {
  const result = [];

  const generateNum = num => {
    if (num > n) return;

    for (let index = 0; index <= 9; index++) {
      const current = num + index;

      if (current > n) return;
      if (index === 9 && !(current % 10)) return;
      result.push(current);
      generateNum(current * 10);
    }
  };

  generateNum(1);

  return result;
};
```
