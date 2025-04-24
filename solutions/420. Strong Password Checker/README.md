# [420. Strong Password Checker](https://leetcode.com/problems/strong-password-checker)

## Description

<div class="elfjS" data-track-load="description_content"><p>A password is considered strong if the below conditions are all met:</p>

<ul>
	<li>It has at least <code>6</code> characters and at most <code>20</code> characters.</li>
	<li>It contains at least <strong>one lowercase</strong> letter, at least <strong>one uppercase</strong> letter, and at least <strong>one digit</strong>.</li>
	<li>It does not contain three repeating characters in a row (i.e., <code>"B<u><strong>aaa</strong></u>bb0"</code> is weak, but <code>"B<strong><u>aa</u></strong>b<u><strong>a</strong></u>0"</code> is strong).</li>
</ul>

<p>Given a string <code>password</code>, return <em>the minimum number of steps required to make <code>password</code> strong. if <code>password</code> is already strong, return <code>0</code>.</em></p>

<p>In one step, you can:</p>

<ul>
	<li>Insert one character to <code>password</code>,</li>
	<li>Delete one character from <code>password</code>, or</li>
	<li>Replace one character of <code>password</code> with another character.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> password = "a"
<strong>Output:</strong> 5
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> password = "aA1"
<strong>Output:</strong> 3
</pre><p><strong class="example">Example 3:</strong></p>
<pre><strong>Input:</strong> password = "1337C0d3"
<strong>Output:</strong> 0
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= password.length &lt;= 50</code></li>
	<li><code>password</code> consists of letters, digits, dot&nbsp;<code>'.'</code> or exclamation mark <code>'!'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} password
 * @return {number}
 */
const strongPasswordChecker = function (password) {
  const n = password.length;
  let lowercase = 1;
  let uppercase = 1;
  let digit = 1;
  let replaces = 0;
  let remainZero = 0;
  let remainOne = 0;

  for (let index = 0; index < n; index++) {
    const char = password[index];
    let repeat = 1;

    if (/\d/.test(char)) digit = 0;
    else if (/[a-z]/.test(char)) lowercase = 0;
    else if (/[A-Z]/.test(char)) uppercase = 0;

    while (index < n && password[index] === password[index + repeat]) {
      repeat += 1;
    }
    index += repeat - 1;
    if (repeat < 3) continue;
    const remain = repeat % 3;

    replaces += Math.floor(repeat / 3);
    if (remain === 0) remainZero += 1;
    if (remain === 1) remainOne += 1;
  }
  const missing = lowercase + uppercase + digit;

  if (n < 6) return Math.max(6 - n, missing);
  if (n <= 20) return Math.max(replaces, missing);
  const deletes = n - 20;

  // aaa => aa, 1 delete step replace 1 replace step
  replaces -= Math.min(deletes, remainZero);
  // aaaa => aa, 2 delete step replace 1 replace step
  replaces -= Math.floor(Math.min(Math.max(deletes - remainZero, 0), remainOne * 2) / 2);
  // aaaaa => aa, 3 delete step replace 1 replace step
  replaces -= Math.floor(Math.max(deletes - remainZero - remainOne * 2, 0) / 3);
  return deletes + Math.max(replaces, missing);
};
```
