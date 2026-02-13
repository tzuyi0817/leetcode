# [3714. Longest Balanced Substring II](https://leetcode.com/problems/longest-balanced-substring-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting only of the characters <code>'a'</code>, <code>'b'</code>, and <code>'c'</code>.</p>

<p>A <strong><span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1k:" data-state="closed" class="">substring</button></span></strong> of <code>s</code> is called <strong>balanced</strong> if all <strong>distinct</strong> characters in the <strong>substring</strong> appear the <strong>same</strong> number of times.</p>

<p>Return the <strong>length of the longest balanced substring</strong> of <code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abbac"</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The longest balanced substring is <code>"abba"</code> because both distinct characters <code>'a'</code> and <code>'b'</code> each appear exactly 2 times.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aabcc"</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The longest balanced substring is <code>"abc"</code> because all distinct characters <code>'a'</code>, <code>'b'</code> and <code>'c'</code> each appear exactly 1 time.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aba"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>One of the longest balanced substrings is <code>"ab"</code> because both distinct characters <code>'a'</code> and <code>'b'</code> each appear exactly 1 time. Another longest balanced substring is <code>"ba"</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> contains only the characters <code>'a'</code>, <code>'b'</code>, and <code>'c'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table + Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const longestBalanced = function (s) {
  const n = s.length;

  const maxSingle = target => {
    let count = 0;
    let result = 0;

    for (const char of s) {
      count = char === target ? count + 1 : 0;
      result = Math.max(result, count);
    }

    return result;
  };

  const maxPair = (u, v) => {
    const prevMap = new Map();
    let diff = 0;
    let result = 0;

    prevMap.set(0, -1);

    for (let index = 0; index < n; index++) {
      const char = s[index];

      if (char === u) {
        diff += 1;
      } else if (char === v) {
        diff -= 1;
      } else {
        diff = 0;
        prevMap.clear();
        prevMap.set(0, index);
        continue;
      }

      if (prevMap.has(diff)) {
        const len = index - prevMap.get(diff);

        result = Math.max(len, result);
      } else {
        prevMap.set(diff, index);
      }
    }

    return result;
  };

  const single = Math.max(maxSingle('a'), maxSingle('b'), maxSingle('c'));
  const pair = Math.max(maxPair('a', 'b'), maxPair('b', 'c'), maxPair('a', 'c'));
  const balanceMap = new Map();
  let a = 0;
  let b = 0;
  let c = 0;
  let result = Math.max(single, pair);

  balanceMap.set('0-0', -1);

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === 'a') {
      a += 1;
    } else if (char === 'b') {
      b += 1;
    } else {
      c += 1;
    }

    const key = `${a - b}-${b - c}`;

    if (balanceMap.has(key)) {
      const len = index - balanceMap.get(key);

      result = Math.max(len, result);
    } else {
      balanceMap.set(key, index);
    }
  }

  return result;
};
```
