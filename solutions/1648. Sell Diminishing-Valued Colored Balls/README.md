# [1648. Sell Diminishing-Valued Colored Balls](https://leetcode.com/problems/sell-diminishing-valued-colored-balls)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You have an <code>inventory</code> of different colored balls, and there is a customer that wants <code>orders</code> balls of <strong>any</strong> color.</p>

<p>The customer weirdly values the colored balls. Each colored ball's value is the number of balls <strong>of that color&nbsp;</strong>you currently have in your <code>inventory</code>. For example, if you own <code>6</code> yellow balls, the customer would pay <code>6</code> for the first yellow ball. After the transaction, there are only <code>5</code> yellow balls left, so the next yellow ball is then valued at <code>5</code> (i.e., the value of the balls decreases as you sell more to the customer).</p>

<p>You are given an integer array, <code>inventory</code>, where <code>inventory[i]</code> represents the number of balls of the <code>i<sup>th</sup></code> color that you initially own. You are also given an integer <code>orders</code>, which represents the total number of balls that the customer wants. You can sell the balls <strong>in any order</strong>.</p>

<p>Return <em>the <strong>maximum</strong> total value that you can attain after selling </em><code>orders</code><em> colored balls</em>. As the answer may be too large, return it <strong>modulo </strong><code>10<sup>9 </sup>+ 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/jj.gif" style="width: 480px; height: 270px;">
<pre><strong>Input:</strong> inventory = [2,5], orders = 4
<strong>Output:</strong> 14
<strong>Explanation:</strong> Sell the 1st color 1 time (2) and the 2nd color 3 times (5 + 4 + 3).
The maximum total value is 2 + 5 + 4 + 3 = 14.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> inventory = [3,5], orders = 6
<strong>Output:</strong> 19
<strong>Explanation: </strong>Sell the 1st color 2 times (3 + 2) and the 2nd color 4 times (5 + 4 + 3 + 2).
The maximum total value is 3 + 2 + 5 + 4 + 3 + 2 = 19.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= inventory.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= inventory[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= orders &lt;= min(sum(inventory[i]), 10<sup>9</sup>)</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} inventory
 * @param {number} orders
 * @return {number}
 */
const maxProfit = function (inventory, orders) {
  const MODULO = BigInt(10 ** 9 + 7);
  const size = inventory.length;
  let result = BigInt(0);
  let index = 0;

  inventory.sort((a, b) => b - a);
  let current = inventory[0];

  while (orders > 0) {
    while (index < size && inventory[index] === current) index += 1;
    const next = index === size ? 0 : inventory[index];
    let times = current - next;
    let remain = 0;
    const count = index * times;

    if (orders < count) {
      times = Math.floor(orders / index);
      remain = orders % index;
    }
    const endValue = current - times;
    const sell = ((BigInt(current + endValue + 1) * BigInt(times * index)) / 2n) % MODULO;

    result = (result + sell + BigInt(endValue * remain)) % MODULO;
    orders -= count;
    current = next;
  }
  return result;
};
```
