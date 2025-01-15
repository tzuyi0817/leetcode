# [1359. Count All Valid Pickup and Delivery Options](https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given <code>n</code> orders, each order consists of a pickup and a delivery service.</p>

<p>Count all valid pickup/delivery possible sequences such that delivery(i) is always after of&nbsp;pickup(i).&nbsp;</p>

<p>Since the answer&nbsp;may be too large,&nbsp;return it modulo&nbsp;10^9 + 7.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 1
<strong>Explanation:</strong> Unique order (P1, D1), Delivery 1 always is after of Pickup 1.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 6
<strong>Explanation:</strong> All possible orders: 
(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).
This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 3
<strong>Output:</strong> 90
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 500</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countOrders = function (n) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  const releaseOrder = (pickup, delivery) => {
    if (pickup === n && delivery === n) return 1;
    if (dp[pickup][delivery]) return dp[pickup][delivery];

    let result = 0;

    if (pickup < n) {
      const count = releaseOrder(pickup + 1, delivery);

      result = (result + count * (n - pickup)) % MODULO;
    }
    if (pickup > delivery) {
      const count = releaseOrder(pickup, delivery + 1);

      result = (result + count * (pickup - delivery)) % MODULO;
    }
    dp[pickup][delivery] = result;

    return result;
  };

  return releaseOrder(0, 0);
};
```
