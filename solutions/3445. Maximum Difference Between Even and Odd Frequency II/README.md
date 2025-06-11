# [3442. Maximum Difference Between Even and Odd Frequency II](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an integer <code>k</code>. Your task is to find the <strong>maximum</strong> difference between the frequency of <strong>two</strong> characters, <code>freq[a] - freq[b]</code>, in a <span data-keyword="substring" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rj:" data-state="closed" class="">substring</button></span> <code>subs</code> of <code>s</code>, such that:</p>

<ul>
	<li><code>subs</code> has a size of <strong>at least</strong> <code>k</code>.</li>
	<li>Character <code>a</code> has an <em>odd frequency</em> in <code>subs</code>.</li>
	<li>Character <code>b</code> has an <em>even frequency</em> in <code>subs</code>.</li>
</ul>

<p>Return the <strong>maximum</strong> difference.</p>

<p><strong>Note</strong> that <code>subs</code> can contain more than 2 <strong>distinct</strong> characters.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "12233", k = 4</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>

<p><strong>Explanation:</strong></p>

<p>For the substring <code>"12233"</code>, the frequency of <code>'1'</code> is 1 and the frequency of <code>'3'</code> is 2. The difference is <code>1 - 2 = -1</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "1122211", k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>For the substring <code>"11222"</code>, the frequency of <code>'2'</code> is 3 and the frequency of <code>'1'</code> is 2. The difference is <code>3 - 2 = 1</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "110", k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>s</code> consists only of digits <code>'0'</code> to <code>'4'</code>.</li>
	<li>The input is generated that at least one substring has a character with an even frequency and a character with an odd frequency.</li>
	<li><code>1 &lt;= k &lt;= s.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Sliding Window`**

- Time complexity: <em>O(20n -> n)</em>
- Space complexity: <em>O(n+20)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxDifference = function (s, k) {
  const n = s.length;
  const permutations = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      if (a === b) continue;

      permutations.push([a, b]);
    }
  }

  for (const [a, b] of permutations) {
    const prefixA = [0];
    const prefixB = [0];
    const minDiff = [
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    ];
    let left = 0;

    for (let index = 0; index < n; index++) {
      const num = Number(s[index]);
      const countA = prefixA.at(-1) + (num === a ? 1 : 0);
      const countB = prefixB.at(-1) + (num === b ? 1 : 0);

      prefixA.push(countA);
      prefixB.push(countB);

      while (index - left + 1 >= k && countA > prefixA[left] && countB > prefixB[left]) {
        const modA = prefixA[left] % 2;
        const modB = prefixB[left] % 2;

        minDiff[modA][modB] = Math.min(prefixA[left] - prefixB[left], minDiff[modA][modB]);
        left += 1;
      }
      const modA = prefixA.at(-1) % 2;
      const modB = prefixB.at(-1) % 2;
      const diff = prefixA.at(-1) - prefixB.at(-1) - minDiff[1 - modA][modB];

      result = Math.max(diff, result);
    }
  }

  return result;
};
```
