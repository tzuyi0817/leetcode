# [753. Cracking the Safe](https://leetcode.com/problems/cracking-the-safe)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a safe protected by a password. The password is a sequence of <code>n</code> digits where each digit can be in the range <code>[0, k - 1]</code>.</p>

<p>The safe has a peculiar way of checking the password. When you enter in a sequence, it checks the <strong>most recent </strong><code>n</code><strong> digits</strong> that were entered each time you type a digit.</p>

<ul>
	<li>For example, the correct password is <code>"345"</code> and you enter in <code>"012345"</code>:
	<ul>
		<li>After typing <code>0</code>, the most recent <code>3</code> digits is <code>"0"</code>, which is incorrect.</li>
		<li>After typing <code>1</code>, the most recent <code>3</code> digits is <code>"01"</code>, which is incorrect.</li>
		<li>After typing <code>2</code>, the most recent <code>3</code> digits is <code>"012"</code>, which is incorrect.</li>
		<li>After typing <code>3</code>, the most recent <code>3</code> digits is <code>"123"</code>, which is incorrect.</li>
		<li>After typing <code>4</code>, the most recent <code>3</code> digits is <code>"234"</code>, which is incorrect.</li>
		<li>After typing <code>5</code>, the most recent <code>3</code> digits is <code>"345"</code>, which is correct and the safe unlocks.</li>
	</ul>
	</li>
</ul>

<p>Return <em>any string of <strong>minimum length</strong> that will unlock the safe <strong>at some point</strong> of entering it</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1, k = 2
<strong>Output:</strong> "10"
<strong>Explanation:</strong> The password is a single digit, so enter each digit. "01" would also unlock the safe.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2, k = 2
<strong>Output:</strong> "01100"
<strong>Explanation:</strong> For each possible password:
- "00" is typed in starting from the 4<sup>th</sup> digit.
- "01" is typed in starting from the 1<sup>st</sup> digit.
- "10" is typed in starting from the 3<sup>rd</sup> digit.
- "11" is typed in starting from the 2<sup>nd</sup> digit.
Thus "01100" will unlock the safe. "10011", and "11001" would also unlock the safe.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 4</code></li>
	<li><code>1 &lt;= k &lt;= 10</code></li>
	<li><code>1 &lt;= k<sup>n</sup> &lt;= 4096</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(k<sup>n</sup>)</em>
- Space complexity: <em>O(k<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const crackSafe = function (n, k) {
  const visited = new Set();
  const totalPassword = k ** n;
  let result = '0'.repeat(n);

  visited.add(result);

  const crackPassword = prefix => {
    if (visited.size === totalPassword) return;

    for (let integer = k - 1; integer >= 0; integer--) {
      const password = `${prefix}${integer}`;

      if (visited.has(password)) continue;
      result += integer;
      visited.add(password);
      crackPassword(password.slice(1));
      break;
    }
  };

  crackPassword(result.slice(1));

  return result;
};
```
