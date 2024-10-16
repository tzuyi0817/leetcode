# [1405. Longest Happy String](https://leetcode.com/problems/longest-happy-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>A string <code>s</code> is called <strong>happy</strong> if it satisfies the following conditions:</p>

<ul>
	<li><code>s</code> only contains the letters <code>'a'</code>, <code>'b'</code>, and <code>'c'</code>.</li>
	<li><code>s</code> does not contain any of <code>"aaa"</code>, <code>"bbb"</code>, or <code>"ccc"</code> as a substring.</li>
	<li><code>s</code> contains <strong>at most</strong> <code>a</code> occurrences of the letter <code>'a'</code>.</li>
	<li><code>s</code> contains <strong>at most</strong> <code>b</code> occurrences of the letter <code>'b'</code>.</li>
	<li><code>s</code> contains <strong>at most</strong> <code>c</code> occurrences of the letter <code>'c'</code>.</li>
</ul>

<p>Given three integers <code>a</code>, <code>b</code>, and <code>c</code>, return <em>the <strong>longest possible happy </strong>string</em>. If there are multiple longest happy strings, return <em>any of them</em>. If there is no such string, return <em>the empty string </em><code>""</code>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> a = 1, b = 1, c = 7
<strong>Output:</strong> "ccaccbcc"
<strong>Explanation:</strong> "ccbccacc" would also be a correct answer.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> a = 7, b = 1, c = 0
<strong>Output:</strong> "aabaa"
<strong>Explanation:</strong> It is the only correct answer in this case.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= a, b, c &lt;= 100</code></li>
	<li><code>a + b + c &gt; 0</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
const longestDiverseString = function (a, b, c) {
  const n = a + b + c;
  let result = '';
  let repeat = 1;

  const checkRepeat = (count, previous, target) => {
    return repeat === 2 && count && previous !== target;
  };

  for (let index = 0; index < n; index++) {
    const previous = result[index - 1];

    if ((a && a >= b && a >= c && repeat < 2) || checkRepeat(a, previous, 'a')) {
      result += 'a';
      a -= 1;
    } else if ((b && b >= a && b >= c && repeat < 2) || checkRepeat(b, previous, 'b')) {
      result += 'b';
      b -= 1;
    } else if ((c && c >= a && c >= b && repeat < 2) || checkRepeat(c, previous, 'c')) {
      result += 'c';
      c -= 1;
    }

    if (!result[index]) return result;

    repeat = result[index] === previous ? repeat + 1 : 1;
  }
  return result;
};
```
