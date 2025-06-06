# [2182. Construct String With Repeat Limit](https://leetcode.com/problems/construct-string-with-repeat-limit)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an integer <code>repeatLimit</code>. Construct a new string <code>repeatLimitedString</code> using the characters of <code>s</code> such that no letter appears <strong>more than</strong> <code>repeatLimit</code> times <strong>in a row</strong>. You do <strong>not</strong> have to use all characters from <code>s</code>.</p>

<p>Return <em>the <strong>lexicographically largest</strong> </em><code>repeatLimitedString</code> <em>possible</em>.</p>

<p>A string <code>a</code> is <strong>lexicographically larger</strong> than a string <code>b</code> if in the first position where <code>a</code> and <code>b</code> differ, string <code>a</code> has a letter that appears later in the alphabet than the corresponding letter in <code>b</code>. If the first <code>min(a.length, b.length)</code> characters do not differ, then the longer string is the lexicographically larger one.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "cczazcc", repeatLimit = 3
<strong>Output:</strong> "zzcccac"
<strong>Explanation:</strong> We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aababab", repeatLimit = 2
<strong>Output:</strong> "bbabaa"
<strong>Explanation:</strong> We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= repeatLimit &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(26n -> n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
const repeatLimitedString = function (s, repeatLimit) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const letters = Array.from({ length: 26 }, () => 0);
  const result = [];
  let repeat = 1;

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;
  const getLargestCode = previousCode => {
    for (let code = 25; code >= 0; code--) {
      const count = letters[code];

      if (!count) continue;
      repeat = code === previousCode ? repeat + 1 : 1;

      if (repeat > repeatLimit) continue;
      return code;
    }
    return -1;
  };

  for (const letter of s) {
    letters[getCode(letter)] += 1;
  }

  for (let index = 0; index < n; index++) {
    const code = getLargestCode(result[index - 1]);

    if (code < 0) break;
    letters[code] -= 1;
    result.push(code);
  }

  return result.reduce((word, code) => {
    return `${word}${String.fromCharCode(code + BASE_CODE)}`;
  }, '');
};
```
