# [2002. Maximum Product of the Length of Two Palindromic Subsequences](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, find two <strong>disjoint palindromic subsequences</strong> of <code>s</code> such that the <strong>product</strong> of their lengths is <strong>maximized</strong>. The two subsequences are <strong>disjoint</strong> if they do not both pick a character at the same index.</p>

<p>Return <em>the <strong>maximum</strong> possible <strong>product</strong> of the lengths of the two palindromic subsequences</em>.</p>

<p>A <strong>subsequence</strong> is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters. A string is <strong>palindromic</strong> if it reads the same forward and backward.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="example-1" src="https://assets.leetcode.com/uploads/2021/08/24/two-palindromic-subsequences.png" style="width: 550px; height: 124px;">
<pre><strong>Input:</strong> s = "leetcodecom"
<strong>Output:</strong> 9
<strong>Explanation</strong>: An optimal solution is to choose "ete" for the 1<sup>st</sup> subsequence and "cdc" for the 2<sup>nd</sup> subsequence.
The product of their lengths is: 3 * 3 = 9.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "bb"
<strong>Output:</strong> 1
<strong>Explanation</strong>: An optimal solution is to choose "b" (the first character) for the 1<sup>st</sup> subsequence and "b" (the second character) for the 2<sup>nd</sup> subsequence.
The product of their lengths is: 1 * 1 = 1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "accbcaxxcxx"
<strong>Output:</strong> 25
<strong>Explanation</strong>: An optimal solution is to choose "accca" for the 1<sup>st</sup> subsequence and "xxcxx" for the 2<sup>nd</sup> subsequence.
The product of their lengths is: 5 * 5 = 25.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 12</code></li>
	<li><code>s</code> consists of lowercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(3<sup>n</sup>\*n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const maxProduct = function (s) {
  const sub1 = [];
  const sub2 = [];
  const size = s.length;
  let result = 0;

  findMaxProduct();
  return result;

  function findMaxProduct(index = 0) {
    if (index >= size) {
      if (isPalindromic(sub1) && isPalindromic(sub2)) {
        result = Math.max(sub1.length * sub2.length, result);
      }
      return;
    }
    const char = s[index];

    sub1.push(char);
    findMaxProduct(index + 1);
    sub1.pop();
    sub2.push(char);
    findMaxProduct(index + 1);
    sub2.pop();
    findMaxProduct(index + 1);
  }
  function isPalindromic(sub) {
    if (!sub.length) return false;
    let left = 0;
    let right = sub.length - 1;

    while (left < right) {
      if (sub[left++] !== sub[right--]) return false;
    }
    return true;
  }
};
```
