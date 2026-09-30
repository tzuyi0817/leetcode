# [1111. Maximum Nesting Depth of Two Valid Parentheses Strings](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>A string is a <em>valid parentheses string</em>&nbsp;(denoted VPS) if and only if it consists of <code>"("</code> and <code>")"</code> characters only, and:</p>

<ul>
	<li>It is the empty string, or</li>
	<li>It can be written as&nbsp;<code>AB</code>&nbsp;(<code>A</code>&nbsp;concatenated with&nbsp;<code>B</code>), where&nbsp;<code>A</code>&nbsp;and&nbsp;<code>B</code>&nbsp;are VPS's, or</li>
	<li>It can be written as&nbsp;<code>(A)</code>, where&nbsp;<code>A</code>&nbsp;is a VPS.</li>
</ul>

<p>We can&nbsp;similarly define the <em>nesting depth</em> <code>depth(S)</code> of any VPS <code>S</code> as follows:</p>

<ul>
	<li><code>depth("") = 0</code></li>
	<li><code>depth(A + B) = max(depth(A), depth(B))</code>, where <code>A</code> and <code>B</code> are VPS's</li>
	<li><code>depth("(" + A + ")") = 1 + depth(A)</code>, where <code>A</code> is a VPS.</li>
</ul>

<p>For example, <code>""</code>,&nbsp;<code>"()()"</code>, and&nbsp;<code>"()(()())"</code>&nbsp;are VPS's (with nesting depths 0, 1, and 2), and <code>")("</code> and <code>"(()"</code> are not VPS's.</p>

<p>Given a VPS <font face="monospace">seq</font>, split it into two disjoint subsequences <code>A</code> and <code>B</code>, such that&nbsp;<code>A</code> and <code>B</code> are VPS's (and&nbsp;<code>A.length + B.length = seq.length</code>). The subsequences may not necessarily be contiguous.</p>

<p>For example, for the sequence <code>123456789</code>, one possible split is:</p>

<ul data-end="822" data-start="776">
	<li data-end="800" data-start="776">
	<p data-end="800" data-start="778"><code data-end="799" data-start="778">A = {1, 3, 5, 7, 9}</code>,</p>
	</li>
	<li data-end="822" data-start="801">
	<p data-end="822" data-start="803"><code data-end="821" data-start="803">B = {2, 4, 6, 8}</code>.</p>
	</li>
</ul>

<p data-end="855" data-start="824">This corresponds to the output <code>[0, 1, 0, 1, 0, 1, 0, 1, 0]</code> &nbsp;where 0 indicates membership in&nbsp;<code data-end="929" data-start="926">A</code>&nbsp;and 1 indicates membership in&nbsp;<code data-end="965" data-start="962">B</code>.</p>

<p>Now choose <strong>any</strong> such <code>A</code> and <code>B</code> such that&nbsp;<code>max(depth(A), depth(B))</code> is the minimum possible value.</p>

<p>Return an <code>answer</code> array (of length <code>seq.length</code>) that encodes such a&nbsp;choice of <code>A</code> and <code>B</code>:&nbsp; <code>answer[i] = 0</code> if <code>seq[i]</code> is part of <code>A</code>, else <code>answer[i] = 1</code>.&nbsp; Note that even though multiple answers may exist, you may return any of them.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> seq = "(()())"
<strong>Output:</strong> [0,1,1,1,1,0]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> seq = "()(())()"
<strong>Output:</strong> [0,0,0,1,1,0,1,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= seq.size &lt;= 10000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} seq
 * @return {number[]}
 */
const maxDepthAfterSplit = function (seq) {
  const result = [];
  let group = -1;

  for (const char of seq) {
    if (char === '(') {
      group += 1;
      result.push(group % 2);
    } else {
      result.push(group % 2);
      group -= 1;
    }
  }

  return result;
};
```
