# [3841. Palindromic Path Queries in a Tree](https://leetcode.com/problems/palindromic-path-queries-in-a-tree)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an undirected tree with <code>n</code> nodes labeled 0 to <code>n - 1</code>. This is represented by a 2D array <code>edges</code> of length <code>n - 1</code>, where <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> indicates an undirected edge between nodes <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code>.</p>

<p>You are also given a string <code>s</code> of length <code>n</code> consisting of lowercase English letters, where <code>s[i]</code> represents the character assigned to node <code>i</code>.</p>

<p>You are also given a string array <code>queries</code>, where each <code>queries[i]</code> is either:</p>

<ul>
	<li><code>"update u<sub>i</sub> c"</code>: Change the character at node <code>u<sub>i</sub></code> to <code>c</code>. Formally, update <code>s[u<sub>i</sub>] = c</code>.</li>
	<li><code>"query u<sub>i</sub> v<sub>i</sub>"</code>: Determine whether the string formed by the characters on the <strong>unique</strong> path from <code>u<sub>i</sub></code> to <code>v<sub>i</sub></code> (inclusive) can be <strong>rearranged</strong> into a <strong><span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">palindrome</button></span></strong>.</li>
</ul>

<p>Return a boolean array <code>answer</code>, where <code>answer[j]</code> is <code>true</code> if the <code>j<sup>th</sup></code> query of type <code>"query u<sub>i</sub> v<sub>i</sub>"​​​​​​​</code> can be rearranged into a <strong>palindrome</strong>, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 3, edges = [[0,1],[1,2]], s = "aac", queries = ["query 0 2","update 1 b","query 0 2"]</span></p>

<p><strong>Output:</strong> <span class="example-io">[true,false]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>"query 0 2"</code>: Path <code>0 → 1 → 2</code> gives <code>"aac"</code>, which can be rearranged to form <code>"aca"</code>, a palindrome. Thus, <code>answer[0] = true</code>.</li>
	<li><code>"update 1 b"</code>: Update node 1 to <code>'b'</code>, now <code>s = "abc"</code>.</li>
	<li><code>"query 0 2"</code>: Path characters are <code>"abc"</code>, which cannot be rearranged to form a palindrome. Thus, <code>answer[1] = false</code>.</li>
</ul>

<p>Thus, <code>answer = [true, false]</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 4, edges = [[0,1],[0,2],[0,3]], s = "abca", queries = ["query 1 2","update 0 b","query 2 3","update 3 a","query 1 3"]</span></p>

<p><strong>Output:</strong> <span class="example-io">[false,false,true]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>"query 1 2"</code>: Path <code>1 → 0 → 2</code> gives <code>"bac"</code>, which cannot be rearranged to form a palindrome. Thus, <code>answer[0] = false</code>.</li>
	<li><code>"update 0 b"</code>: Update node 0 to <code>'b'</code>, now <code>s = "bbca"</code>.</li>
	<li><code>"query 2 3"</code>: Path <code>2 → 0 → 3</code> gives <code>"cba"</code>, which cannot be rearranged to form a palindrome. Thus, <code>answer[1] = false</code>.</li>
	<li><code>"update 3 a"</code>: Update node 3 to <code>'a'</code>, <code>s = "bbca"</code>.</li>
	<li><code>"query 1 3"</code>: Path <code>1 → 0 → 3</code> gives <code>"bba"</code>, which can be rearranged to form <code>"bab"</code>, a palindrome. Thus, <code>answer[2] = true</code>.</li>
</ul>

<p>Thus, <code>answer = [false, false, true]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == s.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code></li>
	<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
	<li>The input is generated such that <code>edges</code> represents a valid tree.</li>
	<li><code>1 &lt;= queries.length &lt;= 5 * 10<sup>4</sup></code>​​​​​​​
	<ul>
		<li><code>queries[i] = "update u<sub>i</sub> c"</code> or</li>
		<li><code>queries[i] = "query u<sub>i</sub> v<sub>i</sub>"</code></li>
		<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
		<li><code>c</code> is a lowercase English letter.</li>
	</ul>
	</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Binary Indexed Tree`**

- Time complexity: <em>O(nlogn+qlogn)</em>
- Space complexity: <em>O(nlogn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
const palindromePath = function (n, edges, s, queries) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const graph = Array.from({ length: n }, () => []);
  const bit = new BIT(n);
  const starts = Array.from({ length: n }, () => 0);
  const ends = Array.from({ length: n }, () => 0);
  const depths = Array.from({ length: n }, () => 0);
  const chars = [...s];
  const MAX_LOG = 32 - Math.clz32(n);
  const ancestors = Array.from({ length: n }, () => new Array(MAX_LOG).fill(0));
  const result = [];
  let timer = 0;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dfs = (node, prev) => {
    timer += 1;
    starts[node] = timer;
    ancestors[node][0] = prev;

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      depths[neighbor] = depths[node] + 1;
      dfs(neighbor, node);
    }

    ends[node] = timer;
  };

  dfs(0, 0);

  for (let node = 0; node < n; node++) {
    const code = s[node].charCodeAt(0) - BASE_CODE;

    bit.updateRange(starts[node], ends[node], 1 << code);
  }

  for (let log = 1; log < MAX_LOG; log++) {
    for (let node = 0; node < n; node++) {
      const ancestor = ancestors[node][log - 1];

      ancestors[node][log] = ancestors[ancestor][log - 1];
    }
  }

  const lca = (u, v) => {
    if (depths[u] < depths[v]) {
      [u, v] = [v, u];
    }

    const diff = depths[u] - depths[v];

    for (let log = 0; log < MAX_LOG; log++) {
      if ((diff >> log) & 1) {
        u = ancestors[u][log];
      }
    }

    if (u === v) return u;

    for (let log = MAX_LOG - 1; log >= 0; log--) {
      if (ancestors[u][log] !== ancestors[v][log]) {
        u = ancestors[u][log];
        v = ancestors[v][log];
      }
    }

    return ancestors[u][0];
  };

  for (const query of queries) {
    const [type, u, v] = query.split(' ');

    if (type === 'update') {
      const prevCode = chars[u].charCodeAt(0) - BASE_CODE;
      const code = v.charCodeAt(0) - BASE_CODE;
      const delta = (1 << prevCode) ^ (1 << code);

      bit.updateRange(starts[u], ends[u], delta);
      chars[u] = v;
    } else {
      const ancestor = lca(Number(u), Number(v));
      const code = chars[ancestor].charCodeAt(0) - BASE_CODE;
      const maskU = bit.query(starts[u]);
      const maskV = bit.query(starts[v]);
      const mask = maskU ^ maskV ^ (1 << code);
      const isValid = popcount(mask) <= 1;

      result.push(isValid);
    }
  }

  return result;
};

class BIT {
  constructor(n) {
    this.n = n + 1;
    this.tree = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    while (index < this.n) {
      this.tree[index] ^= delta;
      index += index & -index;
    }
  }

  query(index) {
    let result = 0;

    while (index > 0) {
      result ^= this.tree[index];
      index -= index & -index;
    }

    return result;
  }

  updateRange(l, r, delta) {
    this.update(l, delta);
    this.update(r + 1, delta);
  }
}

function popcount(x) {
  let result = 0;

  while (x) {
    x &= x - 1;
    result += 1;
  }

  return result;
}
```
