# [3008. Find Beautiful Indices in the Given Array II](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> string <code>s</code>, a string <code>a</code>, a string <code>b</code>, and an integer <code>k</code>.</p>

<p>An index <code>i</code> is <strong>beautiful</strong> if:</p>

<ul>
	<li><code>0 &lt;= i &lt;= s.length - a.length</code></li>
	<li><code>s[i..(i + a.length - 1)] == a</code></li>
	<li>There exists an index <code>j</code> such that:
	<ul>
		<li><code>0 &lt;= j &lt;= s.length - b.length</code></li>
		<li><code>s[j..(j + b.length - 1)] == b</code></li>
		<li><code>|j - i| &lt;= k</code></li>
	</ul>
	</li>
</ul>

<p>Return <em>the array that contains beautiful indices in <strong>sorted order from smallest to largest</strong></em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
<strong>Output:</strong> [16,33]
<strong>Explanation:</strong> There are 2 beautiful indices: [16,33].
- The index 16 is beautiful as s[16..17] == "my" and there exists an index 4 with s[4..11] == "squirrel" and |16 - 4| &lt;= 15.
- The index 33 is beautiful as s[33..34] == "my" and there exists an index 18 with s[18..25] == "squirrel" and |33 - 18| &lt;= 15.
Thus we return [16,33] as the result.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abcd", a = "a", b = "a", k = 4
<strong>Output:</strong> [0]
<strong>Explanation:</strong> There is 1 beautiful index: [0].
- The index 0 is beautiful as s[0..0] == "a" and there exists an index 0 with s[0..0] == "a" and |0 - 0| &lt;= 4.
Thus we return [0] as the result.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>
	<li><code>1 &lt;= a.length, b.length &lt;= 5 * 10<sup>5</sup></code></li>
	<li><code>s</code>, <code>a</code>, and <code>b</code> contain only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */
const beautifulIndices = function (s, a, b, k) {
  const beautifulA = createKMP(s, a);
  const beautifulB = createKMP(s, b);
  const m = beautifulB.length;
  const result = [];
  let left = 0;

  for (const index of beautifulA) {
    while (left < m && beautifulB[left] - index < -k) {
      left += 1;
    }

    if (beautifulB[left] - index <= k) {
      result.push(index);
    }
  }

  return result;
};

function createKMP(s, target) {
  const n = s.length;
  const m = target.length;
  const lps = getLPS(target);
  const result = [];
  let a = 0;
  let b = 0;

  while (a < n) {
    if (s[a] === target[b]) {
      a += 1;
      b += 1;

      if (b === m) {
        result.push(a - m);
        b = lps[b - 1];
      }
    } else if (b > 0) {
      b = lps[b - 1];
    } else {
      a += 1;
    }
  }

  return result;
}

function getLPS(pattern) {
  const n = pattern.length;
  const lps = Array.from({ length: n }, () => 0);
  let left = 0;

  for (let index = 1; index < n; index++) {
    while (left && pattern[index] !== pattern[left]) {
      left = lps[left - 1];
    }

    if (pattern[index] === pattern[left]) {
      lps[index] = left + 1;
      left += 1;
    }
  }

  return lps;
}
```
