# [1397. Find All Good Strings](https://leetcode.com/problems/find-all-good-strings)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given the strings <code>s1</code> and <code>s2</code> of size <code>n</code> and the string <code>evil</code>, return <em>the number of <strong>good</strong> strings</em>.</p>

<p>A <strong>good</strong> string has size <code>n</code>, it is alphabetically greater than or equal to <code>s1</code>, it is alphabetically smaller than or equal to <code>s2</code>, and it does not contain the string <code>evil</code> as a substring. Since the answer can be a huge number, return this <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2, s1 = "aa", s2 = "da", evil = "b"
<strong>Output:</strong> 51 
<strong>Explanation:</strong> There are 25 good strings starting with 'a': "aa","ac","ad",...,"az". Then there are 25 good strings starting with 'c': "ca","cc","cd",...,"cz" and finally there is one good string starting with 'd': "da".&nbsp;
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 8, s1 = "leetcode", s2 = "leetgoes", evil = "leet"
<strong>Output:</strong> 0 
<strong>Explanation:</strong> All strings greater than or equal to s1 and smaller than or equal to s2 start with the prefix "leet", therefore, there is not any good string.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 2, s1 = "gx", s2 = "gz", evil = "x"
<strong>Output:</strong> 2
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>s1.length == n</code></li>
	<li><code>s2.length == n</code></li>
	<li><code>s1 &lt;= s2</code></li>
	<li><code>1 &lt;= n &lt;= 500</code></li>
	<li><code>1 &lt;= evil.length &lt;= 50</code></li>
	<li>All strings consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + KMP`**

- Time complexity: <em>O(mn\*26 -> mn)</em>
- Space complexity: <em>O(mn\*2<sup>2</sup>+26m -> mn)</em>
- `m` is `evil.length`

<p>&nbsp;</p>

### **JavaScript**

```js
const findGoodStrings = function (n, s1, s2, evil) {
  const MODULO = 10 ** 9 + 7;
  const BASE_CODE = 'a'.charCodeAt(0);
  const evilLPS = getLPS(evil);
  const nextMatchedCount = Array.from({ length: evil.length }, () => new Array(26).fill(-1));
  const dp = Array.from({ length: n }, () => {
    return Array.from({ length: evil.length }, () => [
      [-1, -1],
      [-1, -1],
    ]);
  });

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  const getNextMatchedEvilCount = (code, matchCount) => {
    if (nextMatchedCount[matchCount][code] !== -1) {
      return nextMatchedCount[matchCount][code];
    }
    const letter = String.fromCharCode(code + BASE_CODE);

    while (matchCount && evil[matchCount] !== letter) {
      matchCount = evilLPS[matchCount - 1];
    }
    nextMatchedCount[matchCount][code] = evil[matchCount] === letter ? matchCount + 1 : matchCount;

    return nextMatchedCount[matchCount][code];
  };

  const findGoodCount = (index, matchedEvilCount, isPrefix1, isPrefix2) => {
    if (matchedEvilCount === evil.length) return 0;
    if (index === n) return 1;
    if (dp[index][matchedEvilCount][+isPrefix1][+isPrefix2] !== -1) {
      return dp[index][matchedEvilCount][+isPrefix1][+isPrefix2];
    }
    const code1 = getCode(s1[index]);
    const code2 = getCode(s2[index]);
    const minCode = isPrefix1 ? code1 : 0;
    const maxCode = isPrefix2 ? code2 : 25;
    let result = 0;

    for (let code = minCode; code <= maxCode; code++) {
      const nextMatchedEvilCount = getNextMatchedEvilCount(code, matchedEvilCount);
      const nextIsPrefix1 = isPrefix1 && code === code1;
      const nextIsPrefix2 = isPrefix2 && code === code2;

      result += findGoodCount(index + 1, nextMatchedEvilCount, nextIsPrefix1, nextIsPrefix2);
      result %= MODULO;
    }
    dp[index][matchedEvilCount][+isPrefix1][+isPrefix2] = result;

    return result;
  };

  return findGoodCount(0, 0, true, true);
};

function getLPS(pattern) {
  const n = pattern.length;
  const lps = Array.from({ length: n }, () => 0);
  let length = 0;

  for (let index = 1; index < n; index++) {
    while (length && pattern[index] !== pattern[length]) {
      length = lps[length - 1];
    }
    if (pattern[index] === pattern[length]) {
      length += 1;
    }
    lps[index] = length;
  }
  return lps;
}
```
