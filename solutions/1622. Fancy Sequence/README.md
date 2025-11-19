# [1622. Fancy Sequence](https://leetcode.com/problems/fancy-sequence)

## Description

<div class="elfjS" data-track-load="description_content"><p>Write an API that generates fancy sequences using the <code>append</code>, <code>addAll</code>, and <code>multAll</code> operations.</p>

<p>Implement the <code>Fancy</code> class:</p>

<ul>
	<li><code>Fancy()</code> Initializes the object with an empty sequence.</li>
	<li><code>void append(val)</code> Appends an integer <code>val</code> to the end of the sequence.</li>
	<li><code>void addAll(inc)</code> Increments all existing values in the sequence by an integer <code>inc</code>.</li>
	<li><code>void multAll(m)</code> Multiplies all existing values in the sequence by an integer <code>m</code>.</li>
	<li><code>int getIndex(idx)</code> Gets the current value at index <code>idx</code> (0-indexed) of the sequence <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>. If the index is greater or equal than the length of the sequence, return <code>-1</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
[[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
<strong>Output</strong>
[null, null, null, null, null, 10, null, null, null, 26, 34, 20]

<strong>Explanation</strong>
Fancy fancy = new Fancy();
fancy.append(2);   // fancy sequence: [2]
fancy.addAll(3);   // fancy sequence: [2+3] -&gt; [5]
fancy.append(7);   // fancy sequence: [5, 7]
fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -&gt; [10, 14]
fancy.getIndex(0); // return 10
fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -&gt; [13, 17]
fancy.append(10);  // fancy sequence: [13, 17, 10]
fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -&gt; [26, 34, 20]
fancy.getIndex(0); // return 26
fancy.getIndex(1); // return 34
fancy.getIndex(2); // return 20
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= val, inc, m &lt;= 100</code></li>
	<li><code>0 &lt;= idx &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>10<sup>5</sup></code> calls total will be made to <code>append</code>, <code>addAll</code>, <code>multAll</code>, and <code>getIndex</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
const Fancy = function () {
  this.mod = BigInt(10 ** 9 + 7);
  this.sequences = [];
  this.mult = 1n;
  this.add = 0n;
};

/**
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function (val) {
  this.sequences.push({ val: BigInt(val), mult: this.mult, add: this.add });
};

/**
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function (inc) {
  this.add = (this.add + BigInt(inc)) % this.mod;
};

/**
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function (m) {
  this.mult = (this.mult * BigInt(m)) % this.mod;
  this.add = (this.add * BigInt(m)) % this.mod;
};

/**
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function (idx) {
  const sequence = this.sequences[idx];

  if (!sequence) return -1;
  const { val, add, mult } = sequence;
  const modMult = modInverse(mult, this.mod);
  const totalMult = (this.mult * modMult) % this.mod;
  const totalAdd = (this.add - ((add * totalMult) % this.mod) + this.mod) % this.mod;

  return Number((val * totalMult + totalAdd) % this.mod);
};

function modInverse(value, mod) {
  return powMod(value, mod - 2n, mod);
}

function powMod(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp = exp / 2n;
  }

  return result;
}

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */
```
