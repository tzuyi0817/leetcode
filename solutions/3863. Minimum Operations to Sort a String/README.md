# [3863. Minimum Operations to Sort a String](https://leetcode.com/problems/minimum-operations-to-sort-a-string)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p data-end="244" data-start="156">You are given a string <code>s</code> consisting of lowercase English letters.</p>

<p>In one operation, you can select any <strong><span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">substring</button></span></strong> of <code>s</code> that is <strong>not</strong> the entire string and <strong>sort</strong> it in <strong>non-descending alphabetical</strong> order.</p>

<p>Return the <strong>minimum</strong> number of operations required to make <code>s</code> sorted in <strong>non-descending</strong> order. If it is not possible, return -1.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "dog"</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong>​​​​​​​</p>

<ul>
	<li>Sort substring <code>"og"</code> to <code>"go"</code>.</li>
	<li>Now, <code>s = "dgo"</code>, which is sorted in ascending order. Thus, the answer is 1.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "card"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Sort substring <code>"car"</code> to <code>"acr"</code>, so <code>s = "acrd"</code>.</li>
	<li>Sort substring <code>"rd"</code> to <code>"dr"</code>, making <code>s = "acdr"</code>, which is sorted in ascending order. Thus, the answer is 2.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "gf"</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>It is impossible to sort <code>s</code> under the given constraints. Thus, the answer is -1.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const minOperations = function (s) {
  const n = s.length;
  const isValidOrder = [...s].every((char, index) => {
    const prev = s[index - 1] ?? char;

    return prev <= char;
  });

  if (isValidOrder) return 0;

  if (n === 2) return -1;

  const countMap = new Map();
  let minChar = s[0];
  let maxChar = s[0];

  countMap.set(s[0], 1);

  for (let index = 1; index < n; index++) {
    const char = s[index];
    const count = countMap.get(char) ?? 0;

    countMap.set(char, count + 1);

    if (char < minChar) {
      minChar = char;
    }

    if (char > maxChar) {
      maxChar = char;
    }
  }

  const minCharCount = countMap.get(minChar);
  const maxCharCount = countMap.get(maxChar);

  if (minCharCount === 1 && maxCharCount === 1 && minChar === s[n - 1] && maxChar === s[0]) return 3;

  if (minChar === s[0] || maxChar === s[n - 1]) return 1;

  return 2;
};
```
