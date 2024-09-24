# [1447. Simplified Fractions](https://leetcode.com/problems/simplified-fractions)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>Given an integer <code>n</code>, return <em>a list of all <strong>simplified</strong> fractions between </em><code>0</code><em> and </em><code>1</code><em> (exclusive) such that the denominator is less-than-or-equal-to </em><code>n</code>. You can return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> ["1/2"]
<strong>Explanation:</strong> "1/2" is the only unique fraction with a denominator less-than-or-equal-to 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 3
<strong>Output:</strong> ["1/2","1/3","2/3"]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 4
<strong>Output:</strong> ["1/2","1/3","1/4","2/3","3/4"]
<strong>Explanation:</strong> "2/4" is not a simplified fraction because it can be simplified to "1/2".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n^2\*logn)</em>
- Space complexity: <em>O(n^2)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {string[]}
 */
const simplifiedFractions = function (n) {
  const result = [];
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  for (let denominator = 2; denominator <= n; denominator++) {
    for (let molecular = 1; molecular < denominator; molecular++) {
      if (gcd(denominator, molecular) > 1) continue;
      result.push(`${molecular}/${denominator}`);
    }
  }
  return result;
};
```
