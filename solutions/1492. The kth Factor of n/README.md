# [1492. The kth Factor of n](https://leetcode.com/problems/the-kth-factor-of-n)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>You are given two positive integers <code>n</code> and <code>k</code>. A factor of an integer <code>n</code> is defined as an integer <code>i</code> where <code>n % i == 0</code>.</p>

<p>Consider a list of all factors of <code>n</code> sorted in <strong>ascending order</strong>, return <em>the </em><code>k<sup>th</sup></code><em> factor</em> in this list or return <code>-1</code> if <code>n</code> has less than <code>k</code> factors.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 12, k = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> Factors list is [1, 2, 3, 4, 6, 12], the 3<sup>rd</sup> factor is 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 7, k = 2
<strong>Output:</strong> 7
<strong>Explanation:</strong> Factors list is [1, 7], the 2<sup>nd</sup> factor is 7.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 4, k = 4
<strong>Output:</strong> -1
<strong>Explanation:</strong> Factors list is [1, 2, 4], there is only 3 factors. We should return -1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= n &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong></p>

<p>Could you solve this problem in less than O(n) complexity?</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(sqrt(n))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthFactor = function (n, k) {
  const factors = [];

  for (let num = 1; num ** 2 <= n; num++) {
    if (n % num) continue;
    const factor = n / num;

    if (factor !== num) factors.push(factor);
    k -= 1;
    if (k === 0) return num;
  }
  return k > factors.length ? -1 : factors.at(-k);
};
```
