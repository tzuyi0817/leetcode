# [3389. Minimum Operations to Make Character Frequencies Equal](https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal)

## Description

<div class="xg0bVG_html" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a string <code>s</code>.</p>

<p>A string <code>t</code> is called <strong>good</strong> if all characters of <code>t</code> occur the same number of times.</p>

<p>You can perform the following operations <strong>any number of times</strong>:</p>

<ul>
	<li>Delete a character from <code>s</code>.</li>
	<li>Insert a character in <code>s</code>.</li>
	<li>Change a character in <code>s</code> to its next letter in the alphabet.</li>
</ul>

<p><strong>Note</strong> that you cannot change <code>'z'</code> to <code>'a'</code> using the third operation.</p>

<p>Return<em> </em>the <strong>minimum</strong> number of operations required to make <code>s</code> <strong>good</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "acab"</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>We can make <code>s</code> good by deleting one occurrence of character <code>'a'</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "wddw"</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>We do not need to perform any operations since <code>s</code> is initially good.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aaabc"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>We can make <code>s</code> good by applying these operations:</p>

<ul>
	<li>Change one occurrence of <code>'a'</code> to <code>'b'</code></li>
	<li>Insert one occurrence of <code>'c'</code> into <code>s</code></li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 2&nbsp;* 10<sup>4</sup></code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(26n+26 -> n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const makeStringGood = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const counts = Array.from({ length: 26 }, () => 0);

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  const maxCount = Math.max(...counts);
  let result = Number.MAX_SAFE_INTEGER;

  for (let target = 1; target <= maxCount; target++) {
    const operations = getMinOperations(counts, target);

    result = Math.min(operations, result);
  }

  return result;
};

function getMinOperations(counts, target) {
  const dp = new Array(26).fill(-1);

  const dfs = code => {
    if (code >= 26) return 0;

    if (dp[code] !== -1) return dp[code];

    const count = counts[code];
    const diff = Math.abs(target - count);
    let result = Math.min(diff, count) + dfs(code + 1);

    if (code <= 24 && counts[code + 1] < target) {
      const nextCount = counts[code + 1];
      const currentOperations = count <= target ? count : count - target;
      const nextOperations = target - nextCount;
      const operations = Math.max(currentOperations, nextOperations) + dfs(code + 2);

      result = Math.min(operations, result);
    }

    dp[code] = result;

    return result;
  };

  return dfs(0);
}
```
