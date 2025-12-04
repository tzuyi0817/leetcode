# [2286. Booking Concert Tickets in Groups](https://leetcode.com/problems/booking-concert-tickets-in-groups)

## Description

<div class="elfjS" data-track-load="description_content"><p>A concert hall has <code>n</code> rows numbered from <code>0</code> to <code>n - 1</code>, each with <code>m</code> seats, numbered from <code>0</code> to <code>m - 1</code>. You need to design a ticketing system that can allocate seats in the following cases:</p>

<ul>
	<li>If a group of <code>k</code> spectators can sit <strong>together</strong> in a row.</li>
	<li>If <strong>every</strong> member of a group of <code>k</code> spectators can get a seat. They may or <strong>may not</strong> sit together.</li>
</ul>

<p>Note that the spectators are very picky. Hence:</p>

<ul>
	<li>They will book seats only if each member of their group can get a seat with row number <strong>less than or equal</strong> to <code>maxRow</code>. <code>maxRow</code> can <strong>vary</strong> from group to group.</li>
	<li>In case there are multiple rows to choose from, the row with the <strong>smallest</strong> number is chosen. If there are multiple seats to choose in the same row, the seat with the <strong>smallest</strong> number is chosen.</li>
</ul>

<p>Implement the <code>BookMyShow</code> class:</p>

<ul>
	<li><code>BookMyShow(int n, int m)</code> Initializes the object with <code>n</code> as number of rows and <code>m</code> as number of seats per row.</li>
	<li><code>int[] gather(int k, int maxRow)</code> Returns an array of length <code>2</code> denoting the row and seat number (respectively) of the <strong>first seat</strong> being allocated to the <code>k</code> members of the group, who must sit <strong>together</strong>. In other words, it returns the smallest possible <code>r</code> and <code>c</code> such that all <code>[c, c + k - 1]</code> seats are valid and empty in row <code>r</code>, and <code>r &lt;= maxRow</code>. Returns <code>[]</code> in case it is <strong>not possible</strong> to allocate seats to the group.</li>
	<li><code>boolean scatter(int k, int maxRow)</code> Returns <code>true</code> if all <code>k</code> members of the group can be allocated seats in rows <code>0</code> to <code>maxRow</code>, who may or <strong>may not</strong> sit together. If the seats can be allocated, it allocates <code>k</code> seats to the group with the <strong>smallest</strong> row numbers, and the smallest possible seat numbers in each row. Otherwise, returns <code>false</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["BookMyShow", "gather", "gather", "scatter", "scatter"]
[[2, 5], [4, 0], [2, 0], [5, 1], [5, 1]]
<strong>Output</strong>
[null, [0, 0], [], true, false]

<strong>Explanation</strong>
BookMyShow bms = new BookMyShow(2, 5); // There are 2 rows with 5 seats each 
bms.gather(4, 0); // return [0, 0]
                  // The group books seats [0, 3] of row 0. 
bms.gather(2, 0); // return []
                  // There is only 1 seat left in row 0,
                  // so it is not possible to book 2 consecutive seats. 
bms.scatter(5, 1); // return True
                   // The group books seat 4 of row 0 and seats [0, 3] of row 1. 
bms.scatter(5, 1); // return False
                   // There is only one seat left in the hall.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= m, k &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= maxRow &lt;= n - 1</code></li>
	<li>At most <code>5 * 10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>gather</code> and <code>scatter</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
class Node {
  constructor(low, high, left, right, seat, sum) {
    this.low = low;
    this.high = high;
    this.left = left;
    this.right = right;
    this.maxSeats = seat;
    this.sum = sum;
  }
}

class SegmentTree {
  constructor(n, m) {
    this.m = m;
    this.root = this.build(0, n - 1);
  }

  build(low, high) {
    if (low === high) {
      return new Node(low, high, null, null, this.m, this.m);
    }

    const mid = Math.floor((low + high) / 2);
    const left = this.build(low, mid);
    const right = this.build(mid + 1, high);
    const maxSeats = Math.max(left.maxSeats, right.maxSeats);
    const sum = left.sum + right.sum;

    return new Node(low, high, left, right, maxSeats, sum);
  }

  minRow(row, k) {
    return this.#minRow(this.root, row, k);
  }

  #minRow(node, row, k) {
    if (node.low === node.high) {
      if (node.sum < k || node.low > row) return null;

      return [node.low, this.m - node.sum];
    }

    if (node.left.maxSeats >= k) {
      return this.#minRow(node.left, row, k);
    } else {
      return this.#minRow(node.right, row, k);
    }
  }

  sumSeats(row) {
    return this.#sumSeats(this.root, 0, row);
  }

  #sumSeats(node, minRow, maxRow) {
    if (node.low === minRow && node.high === maxRow) {
      return node.sum;
    }

    const mid = Math.floor((node.low + node.high) / 2);

    if (minRow > mid) {
      return this.#sumSeats(node.right, minRow, maxRow);
    }

    if (maxRow <= mid) {
      return this.#sumSeats(node.left, minRow, maxRow);
    }

    return this.#sumSeats(node.left, minRow, mid) + this.#sumSeats(node.right, mid + 1, maxRow);
  }

  subtract(row, k) {
    this.#subtract(this.root, row, k);
  }

  #subtract(node, row, k) {
    if (!node) return;
    if (node.low === node.high) {
      node.maxSeats -= k;
      node.sum -= k;
      return;
    }

    const mid = Math.floor((node.low + node.high) / 2);

    if (row > mid) {
      this.#subtract(node.right, row, k);
    } else {
      this.#subtract(node.left, row, k);
    }

    node.maxSeats = Math.max(node.left.maxSeats, node.right.maxSeats);
    node.sum = node.left.sum + node.right.sum;
  }
}

/**
 * @param {number} n
 * @param {number} m
 */
const BookMyShow = function (n, m) {
  this.tree = new SegmentTree(n, m);
  this.seats = Array.from({ length: n }, () => m);
  this.row = 0;
};

/**
 * @param {number} k
 * @param {number} maxRow
 * @return {number[]}
 */
BookMyShow.prototype.gather = function (k, maxRow) {
  const result = this.tree.minRow(maxRow, k);

  if (!result) return [];

  const row = result[0];

  this.tree.subtract(row, k);
  this.seats[row] -= k;

  return result;
};

/**
 * @param {number} k
 * @param {number} maxRow
 * @return {boolean}
 */
BookMyShow.prototype.scatter = function (k, maxRow) {
  if (this.tree.sumSeats(maxRow) < k) return false;

  while (k) {
    if (this.seats[this.row] >= k) {
      this.tree.subtract(this.row, k);
      this.seats[this.row] -= k;
      k = 0;
    } else {
      const remainSeats = this.seats[this.row];

      this.tree.subtract(this.row, remainSeats);
      this.seats[this.row] -= remainSeats;
      k -= remainSeats;
      this.row += 1;
    }
  }

  return true;
};

/**
 * Your BookMyShow object will be instantiated and called as such:
 * var obj = new BookMyShow(n, m)
 * var param_1 = obj.gather(k,maxRow)
 * var param_2 = obj.scatter(k,maxRow)
 */
```
