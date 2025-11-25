# [2262. Total Appeal of A String](https://leetcode.com/problems/total-appeal-of-a-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <b>appeal</b> of a string is the number of <strong>distinct</strong> characters found in the string.</p>

<ul>
	<li>For example, the appeal of <code>"abbca"</code> is <code>3</code> because it has <code>3</code> distinct characters: <code>'a'</code>, <code>'b'</code>, and <code>'c'</code>.</li>
</ul>

<p>Given a string <code>s</code>, return <em>the <strong>total appeal of all of its <strong>substrings</strong>.</strong></em></p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abbca"
<strong>Output:</strong> 28
<strong>Explanation:</strong> The following are the substrings of "abbca":
- Substrings of length 1: "a", "b", "b", "c", "a" have an appeal of 1, 1, 1, 1, and 1 respectively. The sum is 5.
- Substrings of length 2: "ab", "bb", "bc", "ca" have an appeal of 2, 1, 2, and 2 respectively. The sum is 7.
- Substrings of length 3: "abb", "bbc", "bca" have an appeal of 2, 2, and 3 respectively. The sum is 7.
- Substrings of length 4: "abbc", "bbca" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 5: "abbca" has an appeal of 3. The sum is 3.
The total sum is 5 + 7 + 7 + 6 + 3 = 28.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "code"
<strong>Output:</strong> 20
<strong>Explanation:</strong> The following are the substrings of "code":
- Substrings of length 1: "c", "o", "d", "e" have an appeal of 1, 1, 1, and 1 respectively. The sum is 4.
- Substrings of length 2: "co", "od", "de" have an appeal of 2, 2, and 2 respectively. The sum is 6.
- Substrings of length 3: "cod", "ode" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 4: "code" has an appeal of 4. The sum is 4.
The total sum is 4 + 6 + 6 + 4 = 20.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const appealSum = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const lastSeen = Array.from({ length: 26 }, () => -1);
  let dp = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    dp += index - lastSeen[code];
    result += dp;
    lastSeen[code] = index;
  }

  return result;
};
```
