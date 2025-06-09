# [440. K-th Smallest in Lexicographical Order](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two integers <code>n</code> and <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>lexicographically smallest integer in the range</em> <code>[1, n]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 13, k = 2
<strong>Output:</strong> 10
<strong>Explanation:</strong> The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1, k = 1
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie`**

- Time complexity: <em>O(log<sup>2</sup>n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const findKthNumber = function (n, k) {
  let current = 1;

  const getGap = num => {
    let start = num;
    let end = num + 1;
    let gap = 0;

    while (start <= n) {
      gap += Math.min(n + 1, end) - start;
      start *= 10;
      end *= 10;
    }

    return gap;
  };

  k -= 1;

  while (k) {
    const gap = getGap(current);

    if (gap <= k) {
      current += 1;
      k -= gap;
    } else {
      current *= 10;
      k -= 1;
    }
  }

  return current;
};
```
