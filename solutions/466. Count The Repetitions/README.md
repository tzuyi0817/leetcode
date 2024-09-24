# [466. Count The Repetitions](https://leetcode.com/problems/count-the-repetitions)

## Description

<div class="elfjS" data-track-load="description_content"><p>We define <code>str = [s, n]</code> as the string <code>str</code> which consists of the string <code>s</code> concatenated <code>n</code> times.</p>

<ul>
	<li>For example, <code>str == ["abc", 3] =="abcabcabc"</code>.</li>
</ul>

<p>We define that string <code>s1</code> can be obtained from string <code>s2</code> if we can remove some characters from <code>s2</code> such that it becomes <code>s1</code>.</p>

<ul>
	<li>For example, <code>s1 = "abc"</code> can be obtained from <code>s2 = "ab<strong><u>dbe</u></strong>c"</code> based on our definition by removing the bolded underlined characters.</li>
</ul>

<p>You are given two strings <code>s1</code> and <code>s2</code> and two integers <code>n1</code> and <code>n2</code>. You have the two strings <code>str1 = [s1, n1]</code> and <code>str2 = [s2, n2]</code>.</p>

<p>Return <em>the maximum integer </em><code>m</code><em> such that </em><code>str = [str2, m]</code><em> can be obtained from </em><code>str1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
<strong>Output:</strong> 2
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
<strong>Output:</strong> 1
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s1.length, s2.length &lt;= 100</code></li>
	<li><code>s1</code> and <code>s2</code> consist of lowercase English letters.</li>
	<li><code>1 &lt;= n1, n2 &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(n1\*s1.length)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
// TODO: Optimize using dynamic programming
/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
const getMaxRepetitions = function (s1, n1, s2, n2) {
  const n = s1.length;
  const m = s2.length;
  let current = (repeatS1 = repeatS2 = 0);

  while (repeatS1 < n1) {
    for (let index = 0; index < n; index++) {
      if (s2[current] !== s1[index]) continue;
      current += 1;
      if (current !== m) continue;
      current = 0;
      repeatS2 += 1;
    }
    repeatS1 += 1;
    if (!current) break;
  }
  return Math.floor(((repeatS2 / n2) * n1) / repeatS1);
};
```
