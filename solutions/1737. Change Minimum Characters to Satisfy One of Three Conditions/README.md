# [1737. Change Minimum Characters to Satisfy One of Three Conditions](https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are given two strings <code>a</code> and <code>b</code> that consist of lowercase letters. In one operation, you can change any character in <code>a</code> or <code>b</code> to <strong>any lowercase letter</strong>.</p>

<p>Your goal is to satisfy <strong>one</strong> of the following three conditions:</p>

<ul>
	<li><strong>Every</strong> letter in <code>a</code> is <strong>strictly less</strong> than <strong>every</strong> letter in <code>b</code> in the alphabet.</li>
	<li><strong>Every</strong> letter in <code>b</code> is <strong>strictly less</strong> than <strong>every</strong> letter in <code>a</code> in the alphabet.</li>
	<li><strong>Both</strong> <code>a</code> and <code>b</code> consist of <strong>only one</strong> distinct letter.</li>
</ul>

<p>Return <em>the <strong>minimum</strong> number of operations needed to achieve your goal.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> a = "aba", b = "caa"
<strong>Output:</strong> 2
<strong>Explanation:</strong> Consider the best way to make each condition true:
1) Change b to "ccc" in 2 operations, then every letter in a is less than every letter in b.
2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b is less than every letter in a.
3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of one distinct letter.
The best way was done in 2 operations (either condition 1 or condition 3).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> a = "dabadd", b = "cda"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The best way is to make condition 1 true by changing b to "eee".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= a.length, b.length &lt;= 10<sup>5</sup></code></li>
	<li><code>a</code> and <code>b</code> consist only of lowercase letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**
- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(26)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var minCharacters = function(a, b) {
    const CODE_BASE = 'a'.charCodeAt(0);
    const m = a.length;
    const n = b.length;
    const countA = Array(26).fill(0);
    const countB = Array(26).fill(0);
    let result = m + n;

    for (const char of a) countA[char.charCodeAt(0) - CODE_BASE] += 1;
    for (const char of b) countB[char.charCodeAt(0) - CODE_BASE] += 1;
    for (let index = 0; index < 26; index++) {
        result = Math.min(m + n - countA[index] - countB[index], result);

        if (index > 0) {
            countA[index] += countA[index - 1];
            countB[index] += countB[index - 1];
        }
        if (index >= 25) continue;
        result = Math.min(m - countA[index] + countB[index], result);
        result = Math.min(n + countA[index] - countB[index], result);
    }
    return result;
};
```
