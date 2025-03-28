# [1641. Count Sorted Vowel Strings](https://leetcode.com/problems/count-sorted-vowel-strings)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given an integer <code>n</code>, return <em>the number of strings of length </em><code>n</code><em> that consist only of vowels (</em><code>a</code><em>, </em><code>e</code><em>, </em><code>i</code><em>, </em><code>o</code><em>, </em><code>u</code><em>) and are <strong>lexicographically sorted</strong>.</em></p>

<p>A string <code>s</code> is <strong>lexicographically sorted</strong> if for all valid <code>i</code>, <code>s[i]</code> is the same as or comes before <code>s[i+1]</code> in the alphabet.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 5
<strong>Explanation:</strong> The 5 sorted strings that consist of vowels only are <code>["a","e","i","o","u"].</code>
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 15
<strong>Explanation:</strong> The 15 sorted strings that consist of vowels only are
["aa","ae","ai","ao","au","ee","ei","eo","eu","ii","io","iu","oo","ou","uu"].
Note that "ea" is not a valid string since 'e' comes after 'a' in the alphabet.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 33
<strong>Output:</strong> 66045
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 50</code>&nbsp;</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*5)</em>
- Space complexity: <em>O(5)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countVowelStrings = function (n) {
  const dp = Array.from({length: 5}).fill(1);

  for (let count = 2; count <= n; count++) {
    let sum = 0;
    for (let index = 0; index < 5; index++) {
      sum += dp[index];
      dp[index] = sum;
    }
  }
  return dp.reduce((result, count) => result + count);
};
```
