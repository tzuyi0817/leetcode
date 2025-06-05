# [1061. Lexicographically Smallest Equivalent String](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two strings of the same length <code>s1</code> and <code>s2</code> and a string <code>baseStr</code>.</p>

<p>We say <code>s1[i]</code> and <code>s2[i]</code> are equivalent characters.</p>

<ul>
	<li>For example, if <code>s1 = "abc"</code> and <code>s2 = "cde"</code>, then we have <code>'a' == 'c'</code>, <code>'b' == 'd'</code>, and <code>'c' == 'e'</code>.</li>
</ul>

<p>Equivalent characters follow the usual rules of any equivalence relation:</p>

<ul>
	<li><strong>Reflexivity:</strong> <code>'a' == 'a'</code>.</li>
	<li><strong>Symmetry:</strong> <code>'a' == 'b'</code> implies <code>'b' == 'a'</code>.</li>
	<li><strong>Transitivity:</strong> <code>'a' == 'b'</code> and <code>'b' == 'c'</code> implies <code>'a' == 'c'</code>.</li>
</ul>

<p>For example, given the equivalency information from <code>s1 = "abc"</code> and <code>s2 = "cde"</code>, <code>"acd"</code> and <code>"aab"</code> are equivalent strings of <code>baseStr = "eed"</code>, and <code>"aab"</code> is the lexicographically smallest equivalent string of <code>baseStr</code>.</p>

<p>Return <em>the lexicographically smallest equivalent string of </em><code>baseStr</code><em> by using the equivalency information from </em><code>s1</code><em> and </em><code>s2</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s1 = "parker", s2 = "morris", baseStr = "parser"
<strong>Output:</strong> "makkek"
<strong>Explanation:</strong> Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
The characters in each group are equivalent and sorted in lexicographical order.
So the answer is "makkek".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s1 = "hello", s2 = "world", baseStr = "hold"
<strong>Output:</strong> "hdld"
<strong>Explanation: </strong>Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
<strong>Output:</strong> "aauaaaaada"
<strong>Explanation:</strong> We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s1.length, s2.length, baseStr &lt;= 1000</code></li>
	<li><code>s1.length == s2.length</code></li>
	<li><code>s1</code>, <code>s2</code>, and <code>baseStr</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**

- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(26+m -> m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
const smallestEquivalentString = function (s1, s2, baseStr) {
  const n = s1.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const uf = new UnionFind();
  const result = [];

  for (let index = 0; index < n; index++) {
    const codeA = s1[index].charCodeAt(0) - BASE_CODE;
    const codeB = s2[index].charCodeAt(0) - BASE_CODE;

    uf.union(codeA, codeB);
  }

  for (const letter of baseStr) {
    const code = letter.charCodeAt(0) - BASE_CODE;
    const smallestLetter = String.fromCharCode(uf.find(code) + BASE_CODE);

    result.push(smallestLetter);
  }

  return result.join('');
};

class UnionFind {
  constructor() {
    this.groups = Array.from({ length: 26 }, (_, index) => index);
  }

  find(node) {
    if (this.groups[node] === node) return node;

    this.groups[node] = this.find(this.groups[node]);

    return this.groups[node];
  }

  union(a, b) {
    const groupA = this.find(a);
    const groupB = this.find(b);

    if (groupA === groupB) return;
    if (groupA > groupB) {
      this.groups[groupA] = groupB;
    } else {
      this.groups[groupB] = groupA;
    }
  }
}
```
