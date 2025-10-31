# [2193. Minimum Number of Moves to Make Palindrome](https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting only of lowercase English letters.</p>

<p>In one <strong>move</strong>, you can select any two <strong>adjacent</strong> characters of <code>s</code> and swap them.</p>

<p>Return <em>the <strong>minimum number of moves</strong> needed to make</em> <code>s</code> <em>a palindrome</em>.</p>

<p><strong>Note</strong> that the input will be generated such that <code>s</code> can always be converted to a palindrome.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aabb"
<strong>Output:</strong> 2
<strong>Explanation:</strong>
We can obtain two palindromes from s, "abba" and "baab". 
- We can obtain "abba" from s in 2 moves: "a<u><strong>ab</strong></u>b" -&gt; "ab<u><strong>ab</strong></u>" -&gt; "abba".
- We can obtain "baab" from s in 2 moves: "a<u><strong>ab</strong></u>b" -&gt; "<u><strong>ab</strong></u>ab" -&gt; "baab".
Thus, the minimum number of moves needed to make s a palindrome is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "letelt"
<strong>Output:</strong> 2
<strong>Explanation:</strong>
One of the palindromes we can obtain from s in 2 moves is "lettel".
One of the ways we can obtain it is "lete<u><strong>lt</strong></u>" -&gt; "let<u><strong>et</strong></u>l" -&gt; "lettel".
Other palindromes such as "tleelt" can also be obtained in 2 moves.
It can be shown that it is not possible to obtain a palindrome in less than 2 moves.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code> consists only of lowercase English letters.</li>
	<li><code>s</code> can be converted to a palindrome using a finite number of moves.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const minMovesToMakePalindrome = function (s) {
  const chars = [...s];
  let result = 0;

  while (chars.length) {
    const len = chars.length;
    const lastChar = chars.pop();
    const index = chars.indexOf(lastChar);

    if (index === -1) {
      result += Math.floor(len / 2);
    } else {
      chars.splice(index, 1);
      result += index;
    }
  }

  return result;
};
```
