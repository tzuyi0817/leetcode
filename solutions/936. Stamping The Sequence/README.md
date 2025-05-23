# [936. Stamping The Sequence](https://leetcode.com/problems/stamping-the-sequence)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two strings <code>stamp</code> and <code>target</code>. Initially, there is a string <code>s</code> of length <code>target.length</code> with all <code>s[i] == '?'</code>.</p>

<p>In one turn, you can place <code>stamp</code> over <code>s</code> and replace every letter in the <code>s</code> with the corresponding letter from <code>stamp</code>.</p>

<ul>
	<li>For example, if <code>stamp = "abc"</code> and <code>target = "abcba"</code>, then <code>s</code> is <code>"?????"</code> initially. In one turn you can:
	<ul>
		<li>place <code>stamp</code> at index <code>0</code> of <code>s</code> to obtain <code>"abc??"</code>,</li>
		<li>place <code>stamp</code> at index <code>1</code> of <code>s</code> to obtain <code>"?abc?"</code>, or</li>
		<li>place <code>stamp</code> at index <code>2</code> of <code>s</code> to obtain <code>"??abc"</code>.</li>
	</ul>
	Note that <code>stamp</code> must be fully contained in the boundaries of <code>s</code> in order to stamp (i.e., you cannot place <code>stamp</code> at index <code>3</code> of <code>s</code>).</li>
</ul>

<p>We want to convert <code>s</code> to <code>target</code> using <strong>at most</strong> <code>10 * target.length</code> turns.</p>

<p>Return <em>an array of the index of the left-most letter being stamped at each turn</em>. If we cannot obtain <code>target</code> from <code>s</code> within <code>10 * target.length</code> turns, return an empty array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> stamp = "abc", target = "ababc"
<strong>Output:</strong> [0,2]
<strong>Explanation:</strong> Initially s = "?????".
- Place stamp at index 0 to get "abc??".
- Place stamp at index 2 to get "ababc".
[1,0,2] would also be accepted as an answer, as well as some other answers.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> stamp = "abca", target = "aabcaca"
<strong>Output:</strong> [3,0,1]
<strong>Explanation:</strong> Initially s = "???????".
- Place stamp at index 3 to get "???abca".
- Place stamp at index 0 to get "abcabca".
- Place stamp at index 1 to get "aabcaca".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= stamp.length &lt;= target.length &lt;= 1000</code></li>
	<li><code>stamp</code> and <code>target</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O((n - stamp.length)<sup>2</sup> \* stamp.length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
const movesToStamp = function (stamp, target) {
  const n = target.length;
  const result = [];
  const current = target.split('');
  const visited = new Array(n).fill(false);
  let masks = 0;

  const isCanReplace = start => {
    for (const [index, element] of stamp.entries()) {
      const value = current[index + start];

      if (value === element || value === '?') continue;
      return false;
    }
    return true;
  };

  const replaceToMask = start => {
    let count = 0;

    for (let index = 0; index < stamp.length; index++) {
      if (current[index + start] === '?') continue;
      current[index + start] = '?';
      count += 1;
    }
    return count;
  };

  while (masks < n) {
    let isStamped = false;

    for (let index = 0; index <= n - stamp.length; index++) {
      if (visited[index] || !isCanReplace(index)) continue;
      masks += replaceToMask(index);
      result.push(index);
      visited[index] = true;
      isStamped = true;
    }
    if (!isStamped) return [];
  }
  return masks === n ? result.reverse() : [];
};
```
