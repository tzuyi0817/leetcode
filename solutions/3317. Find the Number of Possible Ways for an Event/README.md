# [3317. Find the Number of Possible Ways for an Event](https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event)

## Description

<div class="xg0bVG_html" data-qd-rendered-description="" data-track-load="description_content"><p>You are given three integers <code>n</code>, <code>x</code>, and <code>y</code>.</p>

<p>An event is being held for <code>n</code> performers. When a performer arrives, they are <strong>assigned</strong> to one of the <code>x</code> stages. All performers assigned to the <strong>same</strong> stage will perform together as a band, though some stages <em>might</em> remain <strong>empty</strong>.</p>

<p>After all performances are completed, the jury will <strong>award</strong> each band a score in the range <code>[1, y]</code>.</p>

<p>Return the <strong>total</strong> number of possible ways the event can take place.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p><strong>Note</strong> that two events are considered to have been held <strong>differently</strong> if <strong>either</strong> of the following conditions is satisfied:</p>

<ul>
	<li><strong>Any</strong> performer is <em>assigned</em> a different stage.</li>
	<li><strong>Any</strong> band is <em>awarded</em> a different score.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 1, x = 2, y = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>There are 2 ways to assign a stage to the performer.</li>
	<li>The jury can award a score of either 1, 2, or 3 to the only band.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 5, x = 2, y = 1</span></p>

<p><strong>Output:</strong> 32</p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Each performer will be assigned either stage 1 or stage 2.</li>
	<li>All bands will be awarded a score of 1.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 3, x = 3, y = 4</span></p>

<p><strong>Output:</strong> 684</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n, x, y &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Combinatorics`**

- Time complexity: <em>O(n\*Max(n,x))</em>
- Space complexity: <em>O(n\*Max(n,x))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const numberOfWays = function (n, x, y) {
  const MODULO = BigInt(10 ** 9 + 7);
  const maxStages = Math.min(n, x);
  const { fact, invFact } = getFactAndInvFact(Math.max(n, x), MODULO);
  const stirling = getStirling(n, maxStages, MODULO);
  let result = 0n;

  for (let stages = 1; stages <= maxStages; stages++) {
    let events = nCk(x, stages, fact, invFact, MODULO);

    events = (events * stirling[n][stages]) % MODULO;
    events = (events * fact[stages]) % MODULO;
    events = (events * modPow(BigInt(y), BigInt(stages), MODULO)) % MODULO;
    result = (result + events) % MODULO;
  }

  return Number(result);
};

function getFactAndInvFact(n, mod) {
  const fact = Array.from({ length: n + 1 }, () => 0n);
  const inv = Array.from({ length: n + 1 }, () => 0n);
  const invFact = Array.from({ length: n + 1 }, () => 0n);

  fact[0] = 1n;
  inv[0] = 1n;
  inv[1] = 1n;
  invFact[0] = 1n;

  for (let index = 1; index <= n; index++) {
    const bigIndex = BigInt(index);

    if (index >= 2) {
      const mult = mod / bigIndex;
      const remainder = Number(mod % bigIndex);

      inv[index] = mod - ((mult * inv[remainder]) % mod);
    }

    fact[index] = (fact[index - 1] * bigIndex) % mod;
    invFact[index] = (invFact[index - 1] * inv[index]) % mod;
  }

  return { fact, invFact };
}

function getStirling(n, k, mod) {
  const stirling = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0n));

  stirling[0][0] = 1n;

  for (let a = 1; a <= n; a++) {
    stirling[a][1] = 1n;

    for (let b = 2; b <= Math.min(a, k); b++) {
      stirling[a][b] = (stirling[a - 1][b] * BigInt(b)) % mod;
      stirling[a][b] = (stirling[a][b] + stirling[a - 1][b - 1]) % mod;
    }
  }

  return stirling;
}

function nCk(n, k, fact, invFact, mod) {
  return (((fact[n] * invFact[k]) % mod) * invFact[n - k]) % mod;
}

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
```
