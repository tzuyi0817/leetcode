# [87. Scramble String](https://leetcode.com/problems/scramble-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>We can scramble a string s to get a string t using the following algorithm:</p>

<ol>
	<li>If the length of the string is 1, stop.</li>
	<li>If the length of the string is &gt; 1, do the following:
	<ul>
		<li>Split the string into two non-empty substrings at a random index, i.e., if the string is <code>s</code>, divide it to <code>x</code> and <code>y</code> where <code>s = x + y</code>.</li>
		<li><strong>Randomly</strong>&nbsp;decide to swap the two substrings or to keep them in the same order. i.e., after this step, <code>s</code> may become <code>s = x + y</code> or <code>s = y + x</code>.</li>
		<li>Apply step 1 recursively on each of the two substrings <code>x</code> and <code>y</code>.</li>
	</ul>
	</li>
</ol>

<p>Given two strings <code>s1</code> and <code>s2</code> of <strong>the same length</strong>, return <code>true</code> if <code>s2</code> is a scrambled string of <code>s1</code>, otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s1 = "great", s2 = "rgeat"
<strong>Output:</strong> true
<strong>Explanation:</strong> One possible scenario applied on s1 is:
"great" --&gt; "gr/eat" // divide at random index.
"gr/eat" --&gt; "gr/eat" // random decision is not to swap the two substrings and keep them in order.
"gr/eat" --&gt; "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
"g/r / e/at" --&gt; "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
"r/g / e/at" --&gt; "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
"r/g / e/ a/t" --&gt; "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
The algorithm stops now, and the result string is "rgeat" which is s2.
As one possible scenario led s1 to be scrambled to s2, we return true.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s1 = "abcde", s2 = "caebd"
<strong>Output:</strong> false
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s1 = "a", s2 = "a"
<strong>Output:</strong> true
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>s1.length == s2.length</code></li>
	<li><code>1 &lt;= s1.length &lt;= 30</code></li>
	<li><code>s1</code> and <code>s2</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Recursion`**

- Time complexity: <em>O(n<sup>4</sup>)</em>
- Space complexity: <em>O(n<sup>3</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = function (s1, s2) {
  if (s1 === s2) return true;
  const n = s1.length;
  const memo = new Array(n)
    .fill('')
    .map(_ =>
      new Array(n)
        .fill('')
        .map(_ => new Array(n + 1).fill(-1)),
    );
  const checkScramble = (index1, index2, length) => {
    if (length === 1) memo[index1][index2][length] = s1[index1] === s2[index2];
    if (memo[index1][index2][length] !== -1) return memo[index1][index2][length];

    for (let k = 1; k < length; k++) {
      if (checkScramble(index1, index2, k) && checkScramble(index1 + k, index2 + k, length - k)) {
        return (memo[index1][index2][length] = true);
      }
      if (!checkScramble(index1, index2 + length - k, k)) continue;
      if (!checkScramble(index1 + k, index2, length - k)) continue;
      return (memo[index1][index2][length] = true);
    }
    return (memo[index1][index2][length] = false);
  };

  return checkScramble(0, 0, n);
};
```
