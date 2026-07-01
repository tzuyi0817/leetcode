# [2983. Palindrome Rearrangement Queries](https://leetcode.com/problems/palindrome-rearrangement-queries)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> string <code>s</code> having an <strong>even</strong> length <code>n</code>.</p>

<p>You are also given a <strong>0-indexed</strong> 2D integer array, <code>queries</code>, where <code>queries[i] = [a<sub>i</sub>, b<sub>i</sub>, c<sub>i</sub>, d<sub>i</sub>]</code>.</p>

<p>For each query <code>i</code>, you are allowed to perform the following operations:</p>

<ul>
	<li>Rearrange the characters within the <strong>substring</strong> <code>s[a<sub>i</sub>:b<sub>i</sub>]</code>, where <code>0 &lt;= a<sub>i</sub> &lt;= b<sub>i</sub> &lt; n / 2</code>.</li>
	<li>Rearrange the characters within the <strong>substring</strong> <code>s[c<sub>i</sub>:d<sub>i</sub>]</code>, where <code>n / 2 &lt;= c<sub>i</sub> &lt;= d<sub>i</sub> &lt; n</code>.</li>
</ul>

<p>For each query, your task is to determine whether it is possible to make <code>s</code> a <strong>palindrome</strong> by performing the operations.</p>

<p>Each query is answered <strong>independently</strong> of the others.</p>

<p>Return <em>a <strong>0-indexed</strong> array </em><code>answer</code><em>, where </em><code>answer[i] == true</code><em> if it is possible to make </em><code>s</code><em> a palindrome by performing operations specified by the </em><code>i<sup>th</sup></code><em> query, and </em><code>false</code><em> otherwise.</em></p>

<ul>
	<li>A <strong>substring</strong> is a contiguous sequence of characters within a string.</li>
	<li><code>s[x:y]</code> represents the substring consisting of characters from the index <code>x</code> to index <code>y</code> in <code>s</code>, <strong>both inclusive</strong>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abcabc", queries = [[1,1,3,5],[0,2,5,5]]
<strong>Output:</strong> [true,true]
<strong>Explanation:</strong> In this example, there are two queries:
In the first query:
- a<sub>0</sub> = 1, b<sub>0</sub> = 1, c<sub>0</sub> = 3, d<sub>0</sub> = 5.
- So, you are allowed to rearrange s[1:1] =&gt; a<u>b</u>cabc and s[3:5] =&gt; abc<u>abc</u>.
- To make s a palindrome, s[3:5] can be rearranged to become =&gt; abc<u>cba</u>.
- Now, s is a palindrome. So, answer[0] = true.
In the second query:
- a<sub>1</sub> = 0, b<sub>1</sub> = 2, c<sub>1</sub> = 5, d<sub>1</sub> = 5.
- So, you are allowed to rearrange s[0:2] =&gt; <u>abc</u>abc and s[5:5] =&gt; abcab<u>c</u>.
- To make s a palindrome, s[0:2] can be rearranged to become =&gt; <u>cba</u>abc.
- Now, s is a palindrome. So, answer[1] = true.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abbcdecbba", queries = [[0,2,7,9]]
<strong>Output:</strong> [false]
<strong>Explanation:</strong> In this example, there is only one query.
a<sub>0</sub> = 0, b<sub>0</sub> = 2, c<sub>0</sub> = 7, d<sub>0</sub> = 9.
So, you are allowed to rearrange s[0:2] =&gt; <u>abb</u>cdecbba and s[7:9] =&gt; abbcdec<u>bba</u>.
It is not possible to make s a palindrome by rearranging these substrings because s[3:6] is not a palindrome.
So, answer[0] = false.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "acbcab", queries = [[1,2,4,5]]
<strong>Output:</strong> [true]
<strong>Explanation: </strong>In this example, there is only one query.
a<sub>0</sub> = 1, b<sub>0</sub> = 2, c<sub>0</sub> = 4, d<sub>0</sub> = 5.
So, you are allowed to rearrange s[1:2] =&gt; a<u>cb</u>cab and s[4:5] =&gt; acbc<u>ab</u>.
To make s a palindrome s[1:2] can be rearranged to become a<u>bc</u>cab.
Then, s[4:5] can be rearranged to become abcc<u>ba</u>.
Now, s is a palindrome. So, answer[0] = true.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i].length == 4</code></li>
	<li><code>a<sub>i</sub> == queries[i][0], b<sub>i</sub> == queries[i][1]</code></li>
	<li><code>c<sub>i</sub> == queries[i][2], d<sub>i</sub> == queries[i][3]</code></li>
	<li><code>0 &lt;= a<sub>i</sub> &lt;= b<sub>i</sub> &lt; n / 2</code></li>
	<li><code>n / 2 &lt;= c<sub>i</sub> &lt;= d<sub>i</sub> &lt; n </code></li>
	<li><code>n</code> is even.</li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const canMakePalindromeQueries = function (s, queries) {
  const n = s.length;
  const m = n / 2;
  const leftStr = s.slice(0, Math.max(0, m));
  const rightRevStr = s.slice(Math.max(0, m)).split('').toReversed().join('');
  const pre1 = Array.from({ length: m + 1 }, () => new Array(26).fill(0));
  const pre2 = Array.from({ length: m + 1 }, () => new Array(26).fill(0));
  const diff = new Array(m + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 0; j < 26; j++) {
      pre1[i][j] = pre1[i - 1][j];
      pre2[i][j] = pre2[i - 1][j];
    }
    pre1[i][leftStr.charCodeAt(i - 1) - 97]++;
    pre2[i][rightRevStr.charCodeAt(i - 1) - 97]++;
    diff[i] = diff[i - 1] + (leftStr[i - 1] === rightRevStr[i - 1] ? 0 : 1);
  }

  function check(a, b, c, d) {
    if (diff[a] > 0 || diff[m] - diff[Math.max(b, d) + 1] > 0) {
      return false;
    }

    if (d <= b) {
      const cnt1 = count(pre1, a, b);
      const cnt2 = count(pre2, a, b);
      return cnt1.every((val, i) => val === cnt2[i]);
    }

    if (b < c) {
      if (diff[c] - diff[b + 1] > 0) return false;

      const cnt1_ab = count(pre1, a, b);
      const cnt2_ab = count(pre2, a, b);
      const cnt1_cd = count(pre1, c, d);
      const cnt2_cd = count(pre2, c, d);

      return cnt1_ab.every((val, i) => val === cnt2_ab[i]) && cnt1_cd.every((val, i) => val === cnt2_cd[i]);
    }

    if (c <= b && b < d) {
      const cnt1 = sub(count(pre1, a, b), count(pre2, a, c - 1));
      const cnt2 = sub(count(pre2, c, d), count(pre1, b + 1, d));

      return cnt1.every((val, i) => val >= 0 && cnt2[i] >= 0 && val === cnt2[i]);
    }

    return false;
  }

  return queries.map(([a, b, c, d]) => {
    const c2 = n - 1 - d;
    const d2 = n - 1 - c;

    if (a <= c2) {
      return check(a, b, c2, d2);
    } else {
      return check(c2, d2, a, b);
    }
  });
};

function count(pre, l, r) {
  const res = new Array(26).fill(0);

  if (l > r) return res;
  for (let i = 0; i < 26; i++) {
    res[i] = pre[r + 1][i] - pre[l][i];
  }
  return res;
}

function sub(a, b) {
  const res = new Array(26).fill(0);

  for (let i = 0; i < 26; i++) {
    res[i] = a[i] - b[i];
  }
  return res;
}
```
