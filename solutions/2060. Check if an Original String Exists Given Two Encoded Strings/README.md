# [2060. Check if an Original String Exists Given Two Encoded Strings](https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings)

## Description

<div class="elfjS" data-track-load="description_content"><p>An original string, consisting of lowercase English letters, can be encoded by the following steps:</p>

<ul>
	<li>Arbitrarily <strong>split</strong> it into a <strong>sequence</strong> of some number of <strong>non-empty</strong> substrings.</li>
	<li>Arbitrarily choose some elements (possibly none) of the sequence, and <strong>replace</strong> each with <strong>its length</strong> (as a numeric string).</li>
	<li><strong>Concatenate</strong> the sequence as the encoded string.</li>
</ul>

<p>For example, <strong>one way</strong> to encode an original string <code>"abcdefghijklmnop"</code> might be:</p>

<ul>
	<li>Split it as a sequence: <code>["ab", "cdefghijklmn", "o", "p"]</code>.</li>
	<li>Choose the second and third elements to be replaced by their lengths, respectively. The sequence becomes <code>["ab", "12", "1", "p"]</code>.</li>
	<li>Concatenate the elements of the sequence to get the encoded string: <code>"ab121p"</code>.</li>
</ul>

<p>Given two encoded strings <code>s1</code> and <code>s2</code>, consisting of lowercase English letters and digits <code>1-9</code> (inclusive), return <code>true</code><em> if there exists an original string that could be encoded as <strong>both</strong> </em><code>s1</code><em> and </em><code>s2</code><em>. Otherwise, return </em><code>false</code>.</p>

<p><strong>Note</strong>: The test cases are generated such that the number of consecutive digits in <code>s1</code> and <code>s2</code> does not exceed <code>3</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s1 = "internationalization", s2 = "i18n"
<strong>Output:</strong> true
<strong>Explanation:</strong> It is possible that "internationalization" was the original string.
- "internationalization" 
  -&gt; Split:       ["internationalization"]
  -&gt; Do not replace any element
  -&gt; Concatenate:  "internationalization", which is s1.
- "internationalization"
  -&gt; Split:       ["i", "nternationalizatio", "n"]
  -&gt; Replace:     ["i", "18",                 "n"]
  -&gt; Concatenate:  "i18n", which is s2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s1 = "l123e", s2 = "44"
<strong>Output:</strong> true
<strong>Explanation:</strong> It is possible that "leetcode" was the original string.
- "leetcode" 
  -&gt; Split:      ["l", "e", "et", "cod", "e"]
  -&gt; Replace:    ["l", "1", "2",  "3",   "e"]
  -&gt; Concatenate: "l123e", which is s1.
- "leetcode" 
  -&gt; Split:      ["leet", "code"]
  -&gt; Replace:    ["4",    "4"]
  -&gt; Concatenate: "44", which is s2.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s1 = "a5b", s2 = "c5b"
<strong>Output:</strong> false
<strong>Explanation:</strong> It is impossible.
- The original string encoded as s1 must start with the letter 'a'.
- The original string encoded as s2 must start with the letter 'c'.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s1.length, s2.length &lt;= 40</code></li>
	<li><code>s1</code> and <code>s2</code> consist of digits <code>1-9</code> (inclusive), and lowercase English letters only.</li>
	<li>The number of consecutive digits in <code>s1</code> and <code>s2</code> does not exceed <code>3</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n1\*n2\*1000)</em>
- Space complexity: <em>O(n1\*n2\*1000)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const possiblyEquals = function (s1, s2) {
  const n1 = s1.length;
  const n2 = s2.length;
  const dp = Array.from({ length: n1 + 1 }, () => {
    return new Array(n2 + 1)
      .fill('')
      .map(() => new Map());
  });

  const isNumber = char => Number.isInteger(Number(char));

  const findNextLetter = (s, index) => {
    while (index < s.length && isNumber(s[index])) {
      index += 1;
    }

    return index;
  };

  const getPaddings = num => {
    const n = num.length;
    const nums = [Number(num)];

    if (n === 2) {
      const [a, b] = num;

      nums.push(Number(a) + Number(b));
    }

    if (n === 3) {
      const [a, b, c] = num;
      const num1 = Number(a) + Number(b) + Number(c);
      const num2 = Number(a) + Number(`${b}${c}`);
      const num3 = Number(`${a}${b}`) + Number(c);

      nums.push(num1, num2, num3);
    }

    return nums;
  };

  const isPossiblyEncode = (a, b, padding) => {
    if (a === n1 && b === n2) return padding === 0;
    if (dp[a][b].has(padding)) return dp[a][b].get(padding);

    if (a < n1 && isNumber(s1[a])) {
      const index = findNextLetter(s1, a);
      const nums = getPaddings(s1.slice(a, index));

      for (const num of nums) {
        if (isPossiblyEncode(index, b, padding + num)) {
          dp[a][b].set(padding, true);

          return true;
        }
      }
    } else if (b < n2 && isNumber(s2[b])) {
      const index = findNextLetter(s2, b);
      const nums = getPaddings(s2.slice(b, index));

      for (const num of nums) {
        if (isPossiblyEncode(a, index, padding - num)) {
          dp[a][b].set(padding, true);

          return true;
        }
      }
    } else if (padding < 0) {
      if (a < n1 && isPossiblyEncode(a + 1, b, padding + 1)) {
        dp[a][b].set(padding, true);

        return true;
      }
    } else if (padding > 0) {
      if (b < n2 && isPossiblyEncode(a, b + 1, padding - 1)) {
        dp[a][b].set(padding, true);

        return true;
      }
    } else if (a < n1 && b < n2 && s1[a] === s2[b] && isPossiblyEncode(a + 1, b + 1, 0)) {
        dp[a][b].set(padding, true);

        return true;
      }

    dp[a][b].set(padding, false);

    return false;
  };

  return isPossiblyEncode(0, 0, 0);
};
```
