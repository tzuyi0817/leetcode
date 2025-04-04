# [1585. Check If String Is Transformable With Substring Sort Operations](https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two strings <code>s</code> and <code>t</code>, transform string <code>s</code> into string <code>t</code> using the following operation any number of times:</p>

<ul>
	<li>Choose a <strong>non-empty</strong> substring in <code>s</code> and sort it in place so the characters are in <strong>ascending order</strong>.
    <ul>
    	<li>For example, applying the operation on the underlined substring in <code>"1<u>4234</u>"</code> results in <code>"1<u>2344</u>"</code>.</li>
    </ul>
    </li>
</ul>

<p>Return <code>true</code> if <em>it is possible to transform <code>s</code> into <code>t</code></em>. Otherwise, return <code>false</code>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "84532", t = "34852"
<strong>Output:</strong> true
<strong>Explanation:</strong> You can transform s into t using the following sort operations:
"84<u>53</u>2" (from index 2 to 3) -&gt; "84<u>35</u>2"
"<u>843</u>52" (from index 0 to 2) -&gt; "<u>348</u>52"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "34521", t = "23415"
<strong>Output:</strong> true
<strong>Explanation:</strong> You can transform s into t using the following sort operations:
"<u>3452</u>1" -&gt; "<u>2345</u>1"
"234<u>51</u>" -&gt; "234<u>15</u>"
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "12345", t = "12435"
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>s.length == t.length</code></li>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> and <code>t</code> consist of only digits.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n + 10n -> n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isTransformable = function (s, t) {
  const n = s.length;
  const positions = Array.from({ length: 10 }, () => []);

  for (let index = n - 1; index >= 0; index--) {
    const num = Number(s[index]);

    positions[num].push(index);
  }

  for (const char of t) {
    const num = Number(char);

    if (!positions[num].length) return false;
    const index = positions[num].pop();

    for (let smaller = 0; smaller < num; smaller++) {
      if (!positions[smaller].length) continue;
      if (positions[smaller].at(-1) < index) return false;
    }
  }

  return true;
};
```
